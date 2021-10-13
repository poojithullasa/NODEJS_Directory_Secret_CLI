import chalk from "chalk";
import inquirer from "inquirer";
import { Parser } from "json2csv";
import Table from "cli-table";
const table = new Table({
  chars: {
    top: "═",
    "top-mid": "╤",
    "top-left": "╔",
    "top-right": "╗",
    bottom: "═",
    "bottom-mid": "╧",
    "bottom-left": "╚",
    "bottom-right": "╝",
    left: "║",
    "left-mid": "╟",
    mid: "─",
    "mid-mid": "┼",
    right: "║",
    "right-mid": "╢",
    middle: "│",
  },
});
import { getApiCall } from "../constants/apiCall.js";
import { spinner } from "../constants/ora.js";
const animation = spinner();

export const secretList = async (vault, path, type, format) => {
  const response = await getApiCall(vault, path, type);
  interactiveList(response, vault, path, type, format);
};

function interactiveList(response, vault, path, type, format) {
  if (response.result == undefined) {
    animation.text = chalk.bold.redBright(response);
    animation.fail();
  } else if (response.result.length === 0) {
    animation.text = chalk.bold.yellowBright(`No data is present`);
    animation.warn();
  } else {
    if (format == "table") {
      tableFormat(response.result, path);
    } else if (format == "csv") {
      csvFormat(response.result, path);
    } else interactiveMode(response, vault, path, type, format);
  }
}

function interactiveMode(response, vault, path, type, format) {
  const options = [];
  response.result.forEach((element) => {
    options.push(`${element.name}  ${element.entityType}`);
  });
  if (path != "/" && path != undefined) {
    options.push("back");
  }
  options.push("exit");
  inquirer
    .prompt([
      {
        name: "path",
        message: "Select the options",
        type: "list",
        choices: options,
      },
    ])
    .then((answers) => {
      if (answers.path == "exit") {
        process.exit(0);
      } else if (answers.path.includes("secret")) {
        animation.text = chalk.bold.redBright(
          `Secret can be viewed using secret view command`
        );
        animation.fail();
      } else if (answers.path == "back") {
        const array = path.split("/");
        const location = array.slice(0, array.length - 1);
        const newLocation = location.length <= 1 ? "/" : location.join("/");
        secretList(vault, newLocation, type, format);
      } else {
        if (path == undefined) path = "/";
        const location = answers.path.split("  ");
        path = path[path.length - 1] == "/" ? path : path + "/";
        const newLocation = path + location[0];
        secretList(vault, newLocation, type, format);
      }
    });
}

function tableFormat(data, path) {
  table.push(["Name", "Type", "Path"]);
  if (path == undefined) path = "";
  data.map((datum) => {
    table.push([datum.name, datum.entityType, path + "/" + datum.name]);
  });
  animation.succeed();
  console.log(chalk.bold.greenBright(table.toString()));
}

function csvFormat(data, path) {
  if (path == undefined) path = "";
  data.forEach((datum) => {
    datum.path = path + "/" + datum.name;
  });
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);
  animation.succeed();
  console.log(chalk.bold.yellowBright(csv));
}
