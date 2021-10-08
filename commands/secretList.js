const chalk = require("chalk");
const { apiCall } = require("../constants/apiCall");

exports.secretList = async (vault, path) => {
  const response = await apiCall("/secret/list", path, vault);
  outputList(response);
};

function outputList(response) {
  if (typeof response == "string") {
    console.log(chalk.bold.redBright(response));
  } else if (typeof response == "number") {
    console.log(chalk.bold.redBright(`Error COde: ${response}`));
  } else {
    if (response.result == undefined) {
      if (response.nodes.errno == "-20" || response.secrets.errno == "-20") {
        console.log(
          chalk.bold.redBright("Secret can be viewed using secret view command")
        );
      } else {
        console.log(chalk.bold.redBright(response));
      }
    } else {
      response.result.forEach((element) => {
        console.log(
          chalk.bold.yellowBright(`${element.name}     ${element.entityType}`)
        );
      });
    }
  }
}
