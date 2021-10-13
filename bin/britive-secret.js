import { Command, Option } from "commander";
const program = new Command();
import { tokenArgument, tokenInput } from "../commands/token.js";
import { secretList } from "../commands/secretList.js";
import { secretView } from "../commands/secretView.js";

program
  .command("token")
  .description("Enter the token key for authentication")
  .argument("[token]", "Authentication Token")
  .action((token) => {
    if (token == undefined) {
      tokenInput();
    } else {
      tokenArgument(token);
    }
  });

program
  .command("list")
  .description(
    "This command list all one level items under the specified path, and their type (Node or Secret)"
  )
  .argument("<vault>", "Please provide vault ID")
  .argument("[path]", "Please provide path")
  .addOption(
    new Option("-t, --type [type]", "Please provide type").choices([
      "node",
      "secret",
    ])
  )
  .addOption(
    new Option(
      "-f, --format [type]",
      "Select output format as per requirement"
    ).choices(["csv", "table"])
  )
  .action((vault, path, options) =>
    secretList(vault, path, options.type, options.format)
  );

program
  .command("view")
  .description("The Command is used to view the contents of the secrets")
  .argument("<vault>", "Please provide vault ID")
  .argument("<path>", "Please provide path of secret")
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
