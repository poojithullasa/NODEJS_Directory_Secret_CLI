import chalk from "chalk";
import inquirer from "inquirer";
import { postApiCall } from "../constants/apiCall.js";
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
  const response = await postApiCall(path, vault);
  if (response.value == undefined) {
    animation.text = chalk.bold.redBright(`Secret doesn't exists at ${path}`);
    animation.fail();
  } else outputView(response.value, format);
};

function outputView(response, format) {
  if (format == "table") {
    tableFormat(response, format);
  } else if (format == "csv") {
    csvFormat(response, format);
  } else {
    jsonFormat(response, format);
  }
}

function tableFormat(data) {
  table.push(["User Name", "URL", "Password"]);
  table.push([data.username, data.url, data.password]);
  animation.succeed();
  console.log(chalk.bold.blueBright(table.toString()));
}

function csvFormat(data) {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);
  animation.succeed();
  console.log(chalk.bold.yellowBright(csv));
}

function jsonFormat(data) {
  animation.text = chalk.bold.cyanBright(JSON.stringify(data, null, 2));
  animation.succeed();
}

function interactiveView(data, format) {
  if (format == "table") {
    tableFormat(data);
  } else if (format == "csv") {
    csvFormat(data);
  } else {
    jsonFormat(data);
  }
}
