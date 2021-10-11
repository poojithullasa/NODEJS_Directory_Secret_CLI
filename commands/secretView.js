import chalk from "chalk";
import inquirer from "inquirer";
import { apiCall } from "../constants/apiCall.js";
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
import { Parser } from "json2csv";
import { spinner } from "../constants/ora.js";
const animation = spinner();

export const secretView = async (vault, path, format) => {
  const response = await apiCall("/secret/view", path, vault);
  outputView(response, format);
};

function outputView(response, format) {
  if (typeof response == "string") {
    animation.text = chalk.bold.redBright(response);
    animation.fail();
  } else if (typeof response == "number") {
    animation.text = chalk.bold.redBright(`Error COde: ${response}`);
    animation.fail();
  } else {
    const position = 0;
    if (response.value == undefined) {
      if (
        Object.keys(response.secret).length === 0 &&
        response.secret.constructor === Object
      ) {
        animation.text = chalk.bold.greenBright("No Data is present in secret");
        animation.warn();
      } else if (response.secret.errno == "-21") {
        animation.text = chalk.bold.redBright(
          "Path does not point to lead level secret. Please provide correct path to secret"
        );
        animation.fail();
      } else {
        animation.text = chalk.bold.redBright(response);
        animation.fail();
      }
    } else {
      if (format == "table") {
        tableFormat(response.value, position, format);
      } else if (format == "csv") {
        csvFormat(response.value, position, format);
      } else {
        jsonFormat(response.value, position, format);
      }
    }
  }
}

function tableFormat(data, position, format) {
  table.push(["User Name", "Password"]);
  const end = position + 2 < data.length ? position + 2 : data.length;
  for (let i = position; i < end; i++) {
    table.push([data[i].username, data[i].password]);
  }
  animation.text = chalk.bold.blueBright(table.toString());
  animation.succeed();
  interactiveView(data, position, format);
}

function csvFormat(data, position, format) {
  const json2csvParser = new Parser();
  const end = position + 2 < data.length ? position + 2 : data.length;
  const csv = json2csvParser.parse(data.slice(position, end));
  animation.text = chalk.bold.yellowBright(csv);
  animation.succeed();
  interactiveView(data, position, format);
}

function jsonFormat(data, position, format) {
  const end = position + 2 < data.length ? position + 2 : data.length;
  animation.text = chalk.bold.cyanBright(
    JSON.stringify(data.slice(position, end), null, 2)
  );
  animation.succeed();
  interactiveView(data, position, format);
}

function interactiveView(data, position, format) {
  const choice = [];
  if (position > 0) choice.push("previous");
  if (position + 2 < data.length) choice.push("next");
  choice.push("exit");
  inquirer
    .prompt([
      {
        name: "option",
        message: "Select option as follows",
        type: "list",
        choices: choice,
      },
    ])
    .then((answers) => {
      if (answers.option == "exit") process.exit(0);
      else if (answers.option == "previous") position = position - 2;
      else position = position + 2;
      if (format == "table") {
        tableFormat(data, position, format);
      } else if (format == "csv") {
        csvFormat(data, position, format);
      } else {
        jsonFormat(data, position, format);
      }
    });
}
