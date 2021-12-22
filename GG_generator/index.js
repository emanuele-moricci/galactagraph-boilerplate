#!/usr/bin/env node

const path = require("path");
const args = process.argv.slice(2);
const { Plop, run } = require("plop");
const argv = require("minimist")(args);
const chalk = require("chalk");
const { font } = require("ascii-art");

font("GALACTAGRAPH", "doom", (_, rendered) => {
  console.log(
    "\n\n" +
      chalk.cyan(rendered) +
      chalk.blueBright(
        "Welcome to the GalactaGraph Generator, a micro solution that can generate lots of code to scaffold generic actions (like building a service or implementing a model) to leave you to the actual development of your project! \n\n\n"
      ) +
      chalk.grey(
        "❓ Check our Generator Guide at https://github.com/emanuele-moricci/galactagraph-boilerplate#how-to-generate \n"
      ) +
      chalk.grey(
        "❗️ For this command to work you HAVE to be on the root of a GalactaGraph gateway OR micro-services (under /server/* OR server/services/*). If your path is incorrect please abort now. \n"
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
