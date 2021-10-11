import chalk from "chalk";
import inquirer from "inquirer";
import { apiCall } from "../constants/apiCall";

exports.secretList = async (vault, path) => {
  const response = await apiCall("/secret/list", path, vault);
  outputList(response, vault, path);
};

function outputList(response, vault, path) {
  if (typeof response == "string") {
    console.log(chalk.bold.redBright(response));
  } else if (typeof response == "number") {
    console.log(chalk.bold.redBright(`Error COde: ${response}`));
  } else {
    if (response.result == undefined) {
      if (response.nodes.errno == "-20" || response.secrets.errno == "-20") {
        secretError();
      } else {
        console.log(chalk.bold.redBright(response));
      }
    } else {
      interactiveList(response, vault, path);
    }
  }
}

const interactiveList = (response, vault, path) => {
  const options = [];
  response.result.forEach((element) => {
    options.push(`${element.name}     ${element.entityType}`);
  });
  if (path != "/") {
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
        secretError();
      } else if (answers.path == "back") {
        const array = path.split("/");
        const location = array.slice(0, array.length - 2);
        const newLocation = location.length <= 1 ? "/" : location.join("/");
        secretList(vault, newLocation);
      } else {
        const location = answers.path.split("     ");
        path = path[path.length - 1] == "/" ? path : path + "/";
        const newLocation = path + location[0] + "/";
        secretList(vault, newLocation);
      }
    });
};

function secretError() {
  console.log(
    chalk.bold.redBright("Secret can be viewed using secret view command")
  );
}
