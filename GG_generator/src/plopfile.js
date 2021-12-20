module.exports = function (plop) {
  // GENERATORS
  let serviceGenerator = require("./Service/index.js");
  let modelGenerator = require("./Model/index.js");
  let extensionGenerator = require("./Extension/index.js");
  let queryGenerator = require("./Query/index.js");
  let mutationGenerator = require("./Mutation/index.js");

  plop.setGenerator("service", serviceGenerator);
  plop.setGenerator("model", modelGenerator);
  plop.setGenerator("extension", extensionGenerator);
  plop.setGenerator("query", queryGenerator);
  plop.setGenerator("mutation", mutationGenerator);

  // HELPERS
  plop.setHelper("capital", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });

  plop.setHelper("firstLower", function (text) {
    return text.charAt(0).toLowerCase() + text.slice(1);
  });

  plop.setHelper("allCaps", function (text) {
    return text.toUpperCase();
  });

  plop.setHelper("capitalPlural", function (text) {
    const pluralize = require("pluralize");
    const pluarlized = pluralize(text);
    return pluarlized.charAt(0).toUpperCase() + pluarlized.slice(1);
  });

  plop.setHelper("firstLowerPlural", function (text) {
    const pluralize = require("pluralize");
    const pluarlized = pluralize(text);
    return pluarlized.charAt(0).toLowerCase() + pluarlized.slice(1);
  });

  plop.setHelper("allCapsPlural", function (text) {
    const pluralize = require("pluralize");
    const pluarlized = pluralize(text);
    return pluarlized.toUpperCase();
  });

  plop.setHelper("eq", function (arg1, arg2) {
    return arg1 == arg2;
  });
  plop.setHelper("or", function () {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  });
  plop.setHelper("and", function () {
    return Array.prototype.every.call(arguments, Boolean);
  });

  // CUSTOM ACTIONS
  plop.setActionType("prettify", (_, config) => {
    const shell = require("shelljs");
    const data = config.data;

    shell.exec(`yarn run prettify -- "${data.path}"`, { silent: true });
    return "";
  });

  plop.setActionType("execCommand", async function (_, { data: { command } }) {
    const chalk = require("chalk");
    const { exec } = require("child_process");

    await exec(command, (error, _, stderr) => {
      if (error) throw new Error(`error: ${error.message}`);
      if (stderr) throw new Error(`stderr: ${stderr}`);

      return;
    });

    console.log(chalk.green(`🔧 "${command}" executed.`));
    return "";
  });

  plop.setActionType("signalSuccess", (_, config) => {
    const chalk = require("chalk");
    const data = config.data.callToAction;

    console.log(chalk.cyanBright(" -------------------------- "));
    console.log(chalk.green("✅ Operation completed!"));
    console.log(chalk.yellow(data));
    return "";
  });
};
