const path = require("path");
const { firstLower } = require("../Utils/formatUtils");

module.exports = {
  description: "Add a Model OR Generic Mutation",
  prompts: [
    {
      type: "input",
      name: "MutationModel",
      message:
        "Write the name of the Model that uses this Mutation, leave empty if it's a general Mutation",
      default: "",
      validate: (value) => {
        if (!value) return true;

        const fs = require("fs");
        const cwd = process.cwd();

        const models = fs
          .readdirSync(`${path.join(cwd, "/src/graphql/schema/Models")}`)
          .filter((d) => !d.includes("."))
          .map((d) => d.toLowerCase());

        return models.includes(value.toLowerCase()) ? true : "Model not found";
      },
    },
    {
      type: "input",
      name: "MutationName",
      message: "What should your mutation be called?",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: "MutationDescription",
      message: "Write a small description",
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const firstLowerMutationName = firstLower(data.MutationName);

    const schemaPath = `${path.join(cwd, "/src/graphql/schema/")}`;
    const rootPath = data.MutationModel
      ? `${path.join(schemaPath, `/Models/${data.MutationModel}/mutations`)}`
      : `${path.join(schemaPath, "/Mutation")}`;
    const mutationPath = `${rootPath}/${firstLowerMutationName}`;

    /**
     * Adds the main Mutation Class, under 'graphql/schema/Mutation/<MODEL_NAME>/<MODEL_NAME>.graphql' and 'graphql/schema/Mutation/<MODEL_NAME>/<MODEL_NAME>.resolver.ts'
     *
     */
    const actions = [
      {
        type: "add",
        path: `${mutationPath}/${firstLowerMutationName}.graphql`,
        templateFile: `${__dirname}/Mutation.graphql.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${mutationPath}/${firstLowerMutationName}.resolver.ts`,
        templateFile: `${__dirname}/Mutation.resolver.ts.hbs`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${mutationPath}/**` },
    });

    actions.push({
      type: "signalSuccess",
      data: {
        callToAction: "🎉 Now you can write the actual resolver logic! Hurray!",
      },
    });

    return actions;
  },
};
