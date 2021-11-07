#!/usr/bin/env node

const path = require("path");
const args = process.argv.slice(2);
const { Plop, run } = require("plop");
const argv = require("minimist")(args);
const chalk = require("chalk");
const { font } = require("ascii-art");

font("FEDERATION | GENERATOR", "doom", (_, rendered) => {
  console.log(
    chalk.cyan(rendered) +
      chalk.grey(
        "❗️ For this command to work you HAVE to be on the root of a federation project, under /services/*. If your path is incorrect please abort now. \n"
      )
  );
  Plop.launch(
    {
      cwd: argv.cwd,
      configPath: path.join(__dirname, "/src/plopfile.js"),
      require: argv.require,
      completion: argv.completion,
    },
    run
  );
});
