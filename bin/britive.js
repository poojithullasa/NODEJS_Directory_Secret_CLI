#!/usr/bin/env node
import { Command } from "commander";
const program = new Command();

program
  .version("1.0.0")
  .command("secret", "This commands helps us to view and list secrets")
  .parse(process.argv);
