const path = require("path");
const { firstLower } = require("../../Utils/formatUtils");

module.exports = {
  description: "Add a non-model Query",
  prompts: [
    {
      type: "input",
      name: "QueryName",
      message: "What should your query be called?",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: "QueryDescription",
      message: "Write a small description",
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const firstLowerQueryName = firstLower(data.QueryName);

    const rootPath = `${path.join(cwd, "/src/graphql/schema/Query")}`;
    const queryPath = `${rootPath}/${firstLowerQueryName}`;

    /**
     * Adds the main Query Class, under 'graphql/schema/Query/<MODEL_NAME>/<MODEL_NAME>.graphql' and 'graphql/schema/Query/<MODEL_NAME>/<MODEL_NAME>.resolver.ts'
     *
     */
    const actions = [
      {
        type: "add",
        path: `${queryPath}/${firstLowerQueryName}.graphql`,
        templateFile: `${__dirname}/Query.graphql.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${queryPath}/${firstLowerQueryName}.resolver.ts`,
        templateFile: `${__dirname}/Query.resolver.ts.hbs`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${queryPath}/**` },
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
