const path = require("path");
const { firstLower, capital } = require("../../Utils/formatUtils");

module.exports = {
  description: "Add a new Micro-Service",
  prompts: [
    {
      type: "input",
      name: "ServiceName",
      message: "What should your service be called?",
      default: "federation-test",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }

        return "The name is required";
      },
    },
    {
      type: "input",
      name: "ServicePort",
      message: "On which port will it be served?",
      default: "4200",
      validate: (value) => {
        if (/^\d+$/.test(value)) {
          return true;
        }

        return "The port is required and has to be a number";
      },
    },
    {
      type: "input",
      name: "ServiceDescription",
      message: "Write a small description",
      default:
        "GQL microservice project structure with prisma, codegen, apolloserver and typescript",
    },
  ],
  actions: (data) => {
    const cwd = process.cwd();

    // Getting the Federation Graph configuration
    const fs = require("fs");
    let apollo_graph = "example_graph@current";
    try {
      const data = fs.readFileSync(`${path.join(cwd, "/.env")}`, "utf8");
      const apollo_graph_line = data.match(/.*APOLLO_GRAPH_REF.*/gi);
      apollo_graph = apollo_graph_line[0].split("=")[1];
    } catch (err) {
      console.error(err);
      return null;
    }

    const serviceName = (
      data.ServiceName.startsWith("federation-")
        ? data.ServiceName
        : `federation-${data.ServiceName}`
    ).toLowerCase();

    const rootPath = `${path.join(cwd, "/services")}`;
    const servicePath = `${rootPath}/${serviceName}`;
    const srcPath = `${servicePath}/src`;
    const configPath = `${servicePath}/src/config`;
    const schemaPath = `${servicePath}/src/graphql/schema`;
    const binPath = `${path.join(cwd, "/bin")}`;

    const actions = [
      // Adds the Prisma schema
      {
        type: "add",
        path: `${servicePath}/prisma/schema.prisma`,
        templateFile: `${__dirname}/prisma/Service.schema.prisma.hbs`,
        abortOnFail: true,
      },
      // Adds the Prisma DB Seeder
      {
        type: "add",
        path: `${servicePath}/prisma/db/seeder.ts`,
        templateFile: `${__dirname}/prisma/Service.seeder.ts.hbs`,
        abortOnFail: true,
      },
      // Adds a default Typescript configuration file
      {
        type: "add",
        path: `${servicePath}/tsconfig.json`,
        templateFile: `${__dirname}/main/Service.tsconfig.json.hbs`,
        abortOnFail: true,
      },
      // Adds a default Package configuration file
      {
        type: "add",
        path: `${servicePath}/package.json`,
        templateFile: `${__dirname}/main/Service.package.json.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
          federationGraph: apollo_graph,
        },
      },
      // Adds a default Nodemon configuration file
      {
        type: "add",
        path: `${servicePath}/nodemon.json`,
        templateFile: `${__dirname}/main/Service.nodemon.json.hbs`,
        abortOnFail: true,
      },
      // Adds a default Jest configuration file
      {
        type: "add",
        path: `${servicePath}/jest.config.js`,
        templateFile: `${__dirname}/main/Service.jest.config.js.hbs`,
        abortOnFail: true,
      },
      // Adds a default Env Example configuration file
      {
        type: "add",
        path: `${servicePath}/.env.example`,
        templateFile: `${__dirname}/main/Service.env.example.hbs`,
        abortOnFail: true,
      },
      // Adds a default Codegen configuration file
      {
        type: "add",
        path: `${servicePath}/codegen.yml`,
        templateFile: `${__dirname}/main/Service.codegen.yml.hbs`,
        abortOnFail: true,
      },
      // Adds the main micro-service index file
      {
        type: "add",
        path: `${srcPath}/index.ts`,
        templateFile: `${__dirname}/src/Service.index.ts.hbs`,
        abortOnFail: true,
      },
      // Adds the jest database mocker file
      {
        type: "add",
        path: `${srcPath}/__tests__/__mocks__/prismaMock.ts`,
        templateFile: `${__dirname}/src/tests/Service.prismaMock.ts.hbs`,
        abortOnFail: true,
      },
      // Adds the apollo&prisma config files
      {
        type: "add",
        path: `${configPath}/apolloConfig.ts`,
        templateFile: `${__dirname}/src/config/Service.apolloConfig.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${configPath}/prismaConfig.ts`,
        templateFile: `${__dirname}/src/config/Service.prismaConfig.ts.hbs`,
        abortOnFail: true,
      },
      // Adds the graphql schema&resolver files
      {
        type: "add",
        path: `${schemaPath}/schema.ts`,
        templateFile: `${__dirname}/src/graphql/Service.schema.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${schemaPath}/Query/query.resolver.ts`,
        templateFile: `${__dirname}/src/graphql/Service.query.resolver.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${schemaPath}/Mutation/mutation.resolver.ts`,
        templateFile: `${__dirname}/src/graphql/Service.mutation.resolver.ts.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${schemaPath}/Models/entry.graphql`,
        templateFile: `${__dirname}/src/graphql/Service.entry.graphql.hbs`,
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${schemaPath}/Utils/refs.ts`,
        templateFile: `${__dirname}/src/graphql/Service.refs.ts.hbs`,
        abortOnFail: true,
      },
      // Adds the federation preparation&starting commands to the gateway bash
      {
        type: "modify",
        path: `${binPath}/start-federation-dev.sh`,
        pattern: /\#.*\[ADD NEW GENERATE COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/bin/Service.generate.sh.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      {
        type: "modify",
        path: `${binPath}/start-federation-dev.sh`,
        pattern: /\#.*\[ADD NEW START COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/bin/Service.start.sh.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      {
        type: "modify",
        path: `${binPath}/start-federation-docker.sh`,
        pattern: /\#.*\[ADD NEW GENERATE COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/bin/Service.generate.sh.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      {
        type: "modify",
        path: `${binPath}/start-federation-docker.sh`,
        pattern: /\#.*\[ADD NEW START COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/bin/Service.start.sh.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      {
        type: "modify",
        path: `${binPath}/start-federation-test.sh`,
        pattern: /\#.*\[ADD NEW TEST COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/bin/Service.test.sh.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      {
        type: "modify",
        path: `${binPath}/publish-federation.sh`,
        pattern: /\#.*\[ADD NEW APOLLO COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/bin/Service.publish.sh.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      {
        type: "modify",
        path: `${binPath}/update-federation-utils.sh`,
        pattern: /\#.*\[ADD NEW UTILS ADD COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/bin/Service.update.sh.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
      {
        type: "modify",
        path: `${cwd}/Dockerfile`,
        pattern: /\#.*\[ADD NEW ENV CLONE COMMANDS ABOVE\].*/gi,
        templateFile: `${__dirname}/main/Service.dockerfile.hbs`,
        abortOnFail: true,
        data: {
          parsedServiceName: serviceName,
        },
      },
    ];

    actions.push({
      type: "prettify",
      data: { path: `${servicePath}/**` },
    });

    actions.push({
      type: "signalSuccess",
      data: {
        callToAction: `Your micro-service was created! Remember to:
          - Create the .env, .env.test and .env.docker.test files;
          - Generate the yarn packages;
          - Generate the Prisma Context;
          - Migrate + Seed the Database;
          - Add a new Model with the 'Model Generator';
          - Fire it on standalone mode and Publish the new apollo federation config;
          - Start the whole federated engine to check if everything works;`,
      },
    });

    return actions;
  },
};
