import chalk from "chalk";
import inquirer from "inquirer";
import { spinner } from "../constants/ora.js";
const animation = spinner();
import fs from "fs";
import os from "os";
import path from "path";
const location = path.join(os.homedir(), ".britive");

export const tokenInput = () => {
  inquirer
    .prompt([{ message: "Enter the token key", type: "input", name: "token" }])
    .then((answers) => {
      animation.text = "Adding token, Please wait";
      animation.color = "yellow";
      animation.start();
      writeToken(answers.token);
      animation.succeed(chalk.greenBright.bold("Successfully added token"));
    });
};

export const tokenArgument = (token) => {
  animation.text = "Adding token, Please wait";
  animation.color = "yellow";
  animation.start();
  writeToken(token);
  animation.succeed(chalk.greenBright.bold("Successfully added token"));
};

export const readToken = () => {
  let output = "";
  try {
    const datum = fs.readFileSync(location, "utf-8");
    if (datum != undefined) {
      const data = JSON.parse(datum);
      output = data.token;
    }
  } catch (error) {
    animation.fail(chalk.redBright.bold("Token File Doesn't exists"));
    process.exit(1);
  }
  return output;
};

function writeToken(token) {
  const data = JSON.stringify({ token: token }, null, 2);
  fs.writeFileSync(location, data, "utf-8");
}
