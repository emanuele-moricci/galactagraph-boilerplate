const path = require("path");
const { firstLower } = require("../Utils/formatUtils");

module.exports = {
  description: "Add a Model OR Generic Query",
  prompts: [
    {
      type: "input",
      name: "QueryModel",
      message:
        "Write the name of the Model that uses this Query, leave empty if it's a general Query",
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

    const schemaPath = `${path.join(cwd, "/src/graphql/schema/")}`;
    const rootPath = data.QueryModel
      ? `${path.join(schemaPath, `/Models/${data.QueryModel}/queries`)}`
      : `${path.join(schemaPath, "/Query")}`;
    const queryPath = `${rootPath}/${firstLowerQueryName}`;

    /**
     * Adds the main Query Class, under 'graphql/schema/Query/<MODEL_NAME>/<MODEL_NAME>.graphql' and 'graphql/schema/Query/<MODEL_NAME>/<MODEL_NAME>.query.ts'
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
        path: `${queryPath}/${firstLowerQueryName}.query.ts`,
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
        callToAction: "🎉 Now you can write the actual resolver logic! Hurray!",
      },
    });

    return actions;
  },
};
