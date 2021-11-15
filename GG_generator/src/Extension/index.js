const path = require("path");

const {
  listEveryModel,
  splitServiceFromModel,
} = require("../Utils/commonPrompts");

module.exports = {
  description: "Add an empty Model",
  prompts: [
    {
      type: "list",
      name: "firstModel",
      message: "What is the first model you want to link?",
      loop: false,
      choices: (data) => listEveryModel(data),
    },
    {
      type: "list",
      name: "secondModel",
      message: "What is the second model you want to link?",
      loop: false,
      choices: (data) => listEveryModel(data),
    },
    {
      type: "list",
      name: "relationship",
      message: "What is their relationship?",
      loop: false,
      choices: ["One to One", "One to Many", "Many to One", "Many to Many"],
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const { service: firstService, model: firstModel } = splitServiceFromModel(
      data.firstModel
    );
    const { model: secondModel } = splitServiceFromModel(data.secondModel);
    const parsedRelationship =
      data.relationship === "One to Many"
        ? "homeMany"
        : data.relationship === "Many to One"
        ? "extMany"
        : data.relationship === "One to One"
        ? "bothOne"
        : "bothMany";

    const firstServicePath = `${path.join(
      cwd,
      `services/${firstService}/src/graphql/schema/`
    )}`;

    const actions = [
      // FIRST SERVICE - MODEL
      {
        type: "add",
        path: `${firstServicePath}/Extensions/${secondModel}/${secondModel}.graphql`,
        templateFile: `${__dirname}/Extension.graphql.hbs`,
        abortOnFail: true,
        data: {
          home: firstModel,
          external: secondModel,
          many: parsedRelationship,
        },
      },
      {
        type: "add",
        path: `${firstServicePath}/Extensions/${secondModel}/${secondModel}.resolver.ts`,
        templateFile: `${__dirname}/Extension.resolver.ts.hbs`,
        abortOnFail: true,
        data: {
          home: firstModel,
          external: secondModel,
          many: parsedRelationship,
        },
      },
      {
        type: "modify",
        path: `${firstServicePath}/Utils/refs.ts`,
        pattern: /\/\/.*\[ADD NEW REFERENCE TYPES ABOVE\].*/gi,
        transform: (str) => str,
        templateFile: `${__dirname}/Extension.refs.ts.hbs`,
        abortOnFail: true,
        data: { model: secondModel },
      },
    ];

    actions.push({
      type: "signalSuccess",
      data: {
        callToAction: `🚦 Don't forget to add a ${secondModel.toLowerCase()}Id (or ID list) to the "${firstModel}" prisma model and write the resolver logic!`,
      },
    });

    return actions;
  },
};
