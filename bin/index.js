#! /usr/bin/env node
const { Command, Option } = require("commander");
const program = new Command();

program.version("1.0.0");

program
  //   .command("secret")
  .command("list")
  .description(
    "This command list all one level items under the specified path, and their type (Node or Secret)"
  )
  .action(() => {
    console.log("Secret List");
  });

program
  //   .command("secret")
  .command("view")
  .description("The Command is used to view the contents of the secrets")
  .action(() => {
    console.log("Secret View");
  });

program.requiredOption("-v, --vault <vault>", "Name of the vault");
program.requiredOption("-p, --path <path>", "Path of the Secret/Node");

program.addOption(
  new Option(
    "-f, --format <type>",
    "Select output format as per requirement",
    "JSON"
  ).choices(["json", "csv", "table"])
);

program.parse();

const options = program.opts();
