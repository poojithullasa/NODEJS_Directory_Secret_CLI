import chalk from "chalk";
import { spinner } from "../constants/ora.js";
const animation = spinner();
import fs from "fs";
import os from "os";
import path from "path";
const location = path.join(os.homedir(), ".britive.log");

export const writeLog = (logValue) => {
  try {
    const datum = fs.readFileSync(location, "utf-8");
    const data = JSON.parse(datum);
    data.push(logValue);
    fs.writeFileSync(location, data, "utf-8");
  } catch (error) {
    const data = [];
    data.push(logValue);
    fs.writeFileSync(location, data, "utf-8");
  }
};

export const readLog = () => {
  animation.start("Getting data from log file");
  try {
    const datum = fs.readFileSync(location, "utf-8");
    if (datum != undefined) {
      const data = JSON.parse(datum);
      animation.succeed("Debug Mode");
      console.log(data);
    }
  } catch (error) {
    animation.fail(chalk.redBright.bold("Log File Doesn't exists"));
    process.exit(1);
  }
};

export const errorLog = {
  time: "",
  command: "",
  response: "",
};
