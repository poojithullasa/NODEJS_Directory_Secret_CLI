import chalk from "chalk";
import inquirer from "inquirer";
import { getApiCall } from "../constants/apiCall.js";
import { spinner } from "../constants/ora.js";
const animation = spinner();

export const secretList = async (vault, path, type) => {
  const response = await getApiCall(vault, path, type);
  interactiveList(response, vault, path, type);
};

const interactiveList = (response, vault, path, type) => {
  if (response.result == undefined) {
    animation.text = chalk.bold.redBright(response);
    animation.fail();
  } else if (response.result.length === 0) {
    animation.text = chalk.bold.yellowBright(`No data is present`);
    animation.warn();
  } else {
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
          secretList(vault, newLocation, type);
        } else {
          if (path == undefined) path = "/";
          const location = answers.path.split("  ");
          path = path[path.length - 1] == "/" ? path : path + "/";
          const newLocation = path + location[0];
          secretList(vault, newLocation, type);
        }
      });
  }
};
