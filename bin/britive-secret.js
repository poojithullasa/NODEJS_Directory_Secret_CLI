const { Command, Option } = require("commander");
const program = new Command();

program
  .command("list")
  .description(
    "This command list all one level items under the specified path, and their type (Node or Secret)"
  )
  .argument("<vault>", "Name of the vault")
  .argument("<path>", "Path of the Secret/Node")
  .action((vault, path) => {
    console.log("Secret List", vault, path);
  });

program
  .command("view")
  .description("The Command is used to view the contents of the secrets")
  .argument("<vault>", "Name of the vault")
  .argument("<path>", "Path of the Secret/Node")
  .action((vault, path) => {
    console.log("Secret View", vault, path);
  });

program.addOption(
  new Option(
    "-f, --format <type>",
    "Select output format as per requirement",
    "JSON"
  ).choices(["json", "csv", "table"])
);

program.parse(process.argv);

const options = program.opts();
