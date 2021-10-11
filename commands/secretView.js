const chalk = require("chalk");
const inquirer = require("inquirer");
const { apiCall } = require("../constants/apiCall");

exports.secretView = async (vault, path, format) => {
  const response = await apiCall("/secret/view", path, vault);
  outputView(response, format);
};

function outputView(response, format) {
  if (typeof response == "string") {
    console.log(chalk.bold.redBright(response));
  } else if (typeof response == "number") {
    console.log(chalk.bold.redBright(`Error COde: ${response}`));
  } else {
    const position = 0;
    if (response.value == undefined) {
      if (
        Object.keys(response.secret).length === 0 &&
        response.secret.constructor === Object
      ) {
        console.log(chalk.bold.greenBright("No Data is present in secret"));
      } else if (response.secret.errno == "-21") {
        console.log(
          chalk.bold.redBright(
            "Path does not point to lead level secret. Please provide correct path to secret"
          )
        );
      } else {
        console.log(chalk.bold.redBright(response));
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
  const Table = require("cli-table");
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
  table.push(["User Name", "Password"]);
  const end = position + 2 < data.length ? position + 2 : data.length;
  for (let i = position; i < end; i++) {
    table.push([data[i].username, data[i].password]);
  }
  console.log(chalk.bold.blueBright(table.toString()));
  interactiveView(data, position, format);
}

function csvFormat(data, position, format) {
  const { Parser } = require("json2csv");
  const json2csvParser = new Parser();
  const end = position + 2 < data.length ? position + 2 : data.length;
  const csv = json2csvParser.parse(data.slice(position, end));
  console.log(chalk.bold.yellowBright(csv));
  interactiveView(data, position, format);
}

function jsonFormat(data, position, format) {
  const end = position + 2 < data.length ? position + 2 : data.length;
  console.log(
    chalk.bold.cyanBright(JSON.stringify(data.slice(position, end), null, 2))
  );
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
