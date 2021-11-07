const path = require("path");
const { firstLower } = require("../../Utils/formatUtils");

module.exports = {
  description: "Add a non-model Mutation",
  prompts: [
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

    const rootPath = `${path.join(cwd, "/src/graphql/schema/Mutation")}`;
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
        callToAction: "Now you can write the actual resolver logic! Hurray!",
      },
    });

    return actions;
  },
};
