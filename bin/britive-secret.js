import { Command, Option } from "commander";
const program = new Command();
import { secretList } from "../commands/secretList.js";
import { secretView } from "../commands/secretView.js";

program
  .command("list")
  .description(
    "This command list all one level items under the specified path, and their type (Node or Secret)"
  )
  .argument("<vault>", "Name of the vault")
  .argument("<path>", "Path of the Secret/Node")
  .action((vault, path) => secretList(vault, path));

program
  .command("view")
  .description("The Command is used to view the contents of the secrets")
  .argument("<vault>", "Name of the vault")
  .argument("<path>", "Path of the Secret/Node")
  .addOption(
    new Option(
      "-f, --format <type>",
      "Select output format as per requirement",
      "JSON"
    ).choices(["json", "csv", "table"])
  )
  .action((vault, path, options) => secretView(vault, path, options.format));

program.parse(process.argv);

const options = program.opts();
