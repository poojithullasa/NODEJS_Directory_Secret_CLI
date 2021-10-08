const chalk = require("chalk");
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
        tableFormat(response.value);
      } else if (format == "csv") {
        csvFormat(response.value);
      } else {
        console.log(
          chalk.bold.cyanBright(JSON.stringify(response.value, null, 2))
        );
      }
    }
  }
}

function tableFormat(data) {
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
  data.map((datum) => {
    table.push([datum.username, datum.password]);
  });
  console.log(chalk.bold.blueBright(table.toString()));
}

function csvFormat(data) {
  const { Parser } = require("json2csv");
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);
  console.log(chalk.bold.yellowBright(csv));
}
