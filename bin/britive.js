#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

program
  .version("1.0.0")
  .command("secret", "This commands helps us to view and list secrets")
  .parse(process.argv);
