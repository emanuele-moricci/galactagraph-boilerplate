const path = require("path");
const pluralize = require("pluralize");
const { firstLower, capital } = require("../../Utils/formatUtils");

module.exports = {
  description: "Add an empty Model",
  prompts: [
    {
      type: "input",
      name: "ModelName",
      message: "What should your model be called?",
      default: "Table",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: "ModelDescription",
      message: "Write a small description",
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    const capitalizedModelName = capital(data.ModelName);
    const firstLowerModelName = firstLower(data.ModelName);
    const pluralizedCapitalModelName = pluralize(capital(data.ModelName));

    const testPath = `${path.join(cwd, "/src/__tests__/")}`;
    const schemaPath = `${path.join(cwd, "/src/graphql/schema/")}`;
    const componentPath = `${path.join(cwd, "/src/graphql/schema/Models")}`;
    const servicePath = `${path.join(cwd, "/src/services")}`;
    const prismaPath = `${path.join(cwd, "/prisma")}`;
    const modelPath = `${componentPath}/${capitalizedModelName}`;

    /**
     * Adds the main Model Class, under 'graphql/schema/Models/<MODEL_NAME>.graphql' and 'graphql/schema/Models/<MODEL_NAME>.resolver.ts'
     * Also adds the Model Service, under 'services/<MODEL_NAME>service.ts'
     * Also adds the Prisma Model, under 'prisma/schema.prisma' and migrates it automatically
     *
     */
    const actions = [
      // GraphQL/TS resolvers&Types
      {
        type: "add",
        path: `${modelPath}/${capitalizedModelName}.graphql`,
        templateFile: `${__dirname}/components/Model.graphql.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${modelPath}/${capitalizedModelName}.resolver.ts`,
        templateFile: `${__dirname}/components/Model.resolver.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${servicePath}/${firstLowerModelName}Service.ts`,
        templateFile: `${__dirname}/components/Model.service.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${schemaPath}/Utils/refs.ts`,
        pattern: /\/\/.*\[ADD NEW REFERENCE TYPES ABOVE\].*/gi,
        transform: (str) => str,
        templateFile: `${__dirname}/utils/Model.refs.ts.hbs`,
        abortOnFail: true,
      },
      // Prisma migration&seeding
      {
        type: "modify",
        path: `${prismaPath}/schema.prisma`,
        pattern: /\/\/.*\[ADD NEW PRISMA TYPES ABOVE\].*/gi,
        transform: (str) => str,
        templateFile: `${__dirname}/database/Model.prisma.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${prismaPath}/db/seeders/${capitalizedModelName}.ts`,
        templateFile: `${__dirname}/database/Model.seederModel.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${prismaPath}/db/seeder.ts`,
        pattern: /\/\/.*\[ADD NEW SEEDER IMPORTS ABOVE\].*/gi,
        transform: (str) => str,
        templateFile: `${__dirname}/database/Model.seederImport.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "modify",
        path: `${prismaPath}/db/seeder.ts`,
        pattern: /\/\/.*\[ADD NEW SEEDERS ABOVE\].*/gi,
        transform: (str) => str,
        templateFile: `${__dirname}/database/Model.seederFunction.ts.hbs`,
        abortOnFail: true,
      },
      // JEST Testing
      {
        type: "add",
        path: `${testPath}/unit/services/${firstLowerModelName}Service.unit.test.ts`,
        templateFile: `${__dirname}/tests/Model.unit.test.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${testPath}/integration/getAll${pluralizedCapitalModelName}.test.ts`,
        templateFile: `${__dirname}/tests/Model.integration.test.ts.hbs`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${componentPath}/${capitalizedModelName}/**` },
    });

    actions.push({
      type: "execCommand",
      data: {
        command: `npx prisma migrate reset --force --skip-seed && npx prisma generate && npx prisma migrate dev --name init_${firstLowerModelName}_model && npx prisma db seed`,
      },
    });

    actions.push({
      type: "signalSuccess",
      data: {
        callToAction:
          "🚦 Wait for the command to finish, your model is being generated, migrated and seeded!",
      },
    });

    return actions;
  },
};
