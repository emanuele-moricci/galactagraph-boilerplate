<div align="center">
<pre>
  ________       .__                 __           ________                    .__     
 /  _____/_____  |  | _____    _____/  |______   /  _____/___________  ______ |  |__  
/   \  ___\__  \ |  | \__  \ _/ ___\   __\__  \ /   \  __\_  __ \__  \ \____ \|  |  \ 
\    \_\  \/ __ \|  |__/ __ \\  \___|  |  / __ \\    \_\  \  | \// __ \|  |_> >   Y  \
 \______  (____  /____(____  /\___  >__| (____  /\______  /__|  (____  /   __/|___|  /
        \/     \/          \/     \/          \/        \/           \/|__|        \/ 
</pre>

# Welcome to the GalactaGraph boilerplate!

This boilerplate is designed to get you up-and-running with GraphQL+Apollo Federation in minutes!

<br />

![Apollo Badge](https://img.shields.io/badge/-Apollo-%23311C87?logo=apollo-graphql&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-GraphQL-%23E10098?logo=graphql&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Node.js-%23339933?logo=node.js&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Typescript-%233178C6?logo=typescript&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Jest-%23C21325?logo=jest&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Docker-%232496ED?logo=docker&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Prisma-%232D3748?logo=prisma&logoColor=white&style=flat-square)
![GraphQL Badge](https://img.shields.io/badge/-Postgres-%234169E1?logo=postgresql&logoColor=white&style=flat-square)

<br />

##### Created by Emanuele Moricci with ❤️ and 🍕

</div>

<br />
<br />

> Looking for contributors, PRs and issues welcome! Come join the development! &nbsp; 🚀

## Index

---

<h3>

1. [What is GalactaGraph](#what-is-galactagraph)
2. [Features](#features)
3. [Quick start](#quick-start)
4. [How to Generate](#how-to-generate)
5. [How to Create a Service](#how-to-create-a-service)
6. [How to Re-Use code](#how-to-re-use-code)
7. [How to Start](#how-to-start)
8. [How to Test](#how-to-test)
9. [How-To Guides](#how-to-guides)
10. [Migrating versions](#migrating-versions)
    - [v 2.0.0](#v200)
    - [v 3.0.0](#v300)
    - [v 3.0.5](#v305)
    - [v 4.0.0](#v400)
    - [v 5.0.0](#v500)
    - [v 6.0.0](#v600)
    - [v 7.0.0](#v700)
11. [License](#license)

</h3>
<br />

## What is GalactaGraph?

---

GalactaGraph is an Apollo Federation boilerplate that aims to reduce the countless hours spent setting up and bootstrapping a `NodeJS + GraphQL` application with a Federated Schema.

It is designed to be used with the [Prisma](https://www.prisma.io) ORM and a Postgres database, and offers typescript generation at runtime using [GraphQL Codegen](https://www.graphql-code-generator.com/).

<br />

## Features

---

### 🤖 **_Configurable GalactaGraph CLI_**

<p style=margin-left:20px>
This boilerplate comes with a very handy CLI that allows you to easily generate a new micro-service and publish it to the federation supergraph in just a few minutes.
</p>
<p style=margin-left:20px>
The CLI can also create new Models, Mutation and Query types, along with their Prisma definition, GraphQL schema&resolvers and also seeders and Jest unit&integration tests. All of this with the click of a button!
</p>
<p style=margin-left:20px>

> You can find the appropriate section [here](#how-to-generate) for a more in-depth explanation on how to use the CLI. The code is stored under the `GG_generator` folder.

</p>
<br />

### ⚡️ **_Runtime Typescript compilation_**

<p style=margin-left:20px>
Every created service runs with the GraphQL Codegen Engine, allowing to generate typescript code at runtime from the .graphl files used to define the subgraph schemas.
</p>
<p style=margin-left:20px>
As of now, you need to start the micro-service in question and fire up the codegen command on another terminal to generate the typescript types.
</p>

<br />

### ♻️ **_Private utility package for code re-usability_**

<p style=margin-left:20px>
One of the hassles of setting up a federated GraphQL application is the need to re-use the same code for different services. This is where the boilerplate comes in ✨
</p>
<p style=margin-left:20px>
This project contains a folder with a set of utility functions, types and general code that can be shared between every part of the application and updated at will with incredible ease.
</p>
<p style=margin-left:20px>

> You can find the appropriate section [here](#how-to-re-use-code) for a more in-depth explanation on how to re-use code. The code is stored under the `GG_utilities` folder.

</p>

<br />

### 🗂 **_Easy to use&understand folder structure_**

<p style=margin-left:20px>
Let's face it, every developer is looking for the perfect folder structure. Now, we can't say that we found it, but it is *in our opinion* very close 💅🏽
</p>
<p style=margin-left:20px>
Let's have a look at it, shall we?
</p>

```
########### GATEWAY
server/
|
├─── bin/...    # Startup bash files for dev and Docker
├─── services/  # Main starting-point for the micro-services
|    └─── micro-services...
└────|src/      # Gateway starter
     ├─── config/
     |    ├─── communication.ts
     |    └─── security.ts
     └─── gateway.ts


########### MICRO-SERVICE
federation-service/
│
├─── prisma/    # The prisma config+seeders goes here!
│    ├─── db/
│    │    ├─── seeders/...
│    │    └─── seeder.ts
│    └─── schema.prisma
├─── src/       # Main starting-point for the micro-service
│    ├─── __tests__/...
│    ├─── config/...
│    ├─── graphql/       # The service main structure
│    │    ├─── generated/...
│    │    └─── schema/   # Collection of Models/Resolvers
│    │         ├─── Extensions/ # Here you can link models from different subgraphs
│    │         ├─── Models/
│    │         │    ├─── ExampleModel/
│    │         │    │    ├─── ExampleModel.graphql
│    │         │    │    └─── ExampleModel.model.ts
│    │         │    └─── entry.graphql
│    │         ├─── Mutation/...
│    │         ├─── Query/...
│    │         ├─── Utils/...
│    │         ├─── permissions.ts
│    │         └─── schema.ts
│    └─── services/...   # Business Logic and Data-Access
└─── configuration files...
```

<br />

### 🐳 **_Ready-to-use Dockerfiles with docker-compose.yml_**

<p style=margin-left:20px>
Docker is a great tool to run your applications in a containerized environment, solving several problems and allowing you to share the container world-wide without any additional OS-specific configuration.
</p>
<p style=margin-left:20px>
GalactaGraph takes care of the Dockerfile and docker-compose.yml files, so you can start your micro-service in a containerized environment in just a few seconds.
When generating a new service with the CLI tool, the necessary lines of code are scaffolded for you on-the-fly! ✨
</p>
<p style=margin-left:20px>
This way you can start the entire eco-system instance with every service in their own container, allowing you to leverage other tools such as a Container Orchestrator to manage your application. (v5.0.0)
</p>

<br />

### 🛡 **_Enhanced Security Layer_**

<p style=margin-left:20px>
Security is a mandatory part of any GraphQL application, and GalactaGraph comes with a set of tools and middlewares that cover your API from the most common attacks:
</p>

- Query Depth Limiting
- Client Error Hiding + Deep Logging on the Server
- Request URL Encoding for XSS Attacks
- Anti-Parameter Pollution middleware
- Anti-DDos middleware
- Server Rate Limiting (v5.0.0)
- Query Complexity Evaluator using [graphql-query-complexity](https://github.com/slicknode/graphql-query-complexity) (v5.0.0)
- Helmet HTTP Headers middleware (v5.0.0)

<p style=margin-left:20px>
This is a great starting point to build your own security policies on top of our Security Layer.
</p>

<br />

### 🤝 **_Built-in Authentication_**

<p style=margin-left:20px>
The boilerplate comes pre-configured with a <code>federation-auth</code> and <code>federation-lang</code> microservice and the necessary logic on the gateway to share a JWT token between gateway and every part of the subgraph.
</p>

> This code, under the `federation-auth` folder, is set-up to give you a simple `User` model with email, password and audit data, and with the `login` and `register` mutations ready-to-go. <br>
> The code under the `federation-lang` folder is used totally optional and used to demonstrate how to divide the application logic into a linked web of micro-services. <br><br>
> Learn more about the JWT authentication logics used in the boilerplate, [here](https://jwt.io/).

<br />

### 🛂 **_Built-in Authorization_** [V. 6.0.0]

<p style=margin-left:20px>
The boilerplate has the <code>graphql-shield</code> already configured and injected in every service that let's you easily add authorization to your GraphQL API using the handy <code>permissions.ts</code> file! The logics are already set-up to recognize if a user is authenticated, giving you the immediate freedom of securing your models, queries and mutations behind a strong authorization layer.
</p>

> If you want to learn more about graphql-shield, go [here](https://www.graphql-shield.com/).

<br />

### 🔰 **_Opinionated Class-Based file structure for resolvers_** [V. 7.0.0]

<p style=margin-left:20px>
This project comes with a very opinionated file structure for the resolvers that will be parsed and used by the Apollo GraphQL library.
The trade-off is that the resolvers will need to be labeled with specific extensions (namely `.model.ts`, `.query.ts`, `.mutation.ts` and `.extension.ts`) and be written in a specific way, but this allows for a much better defined and undersandable structure, that still leaves room for customization and improvements.
</p>

<br />

### 🐶 **_Pre-Commit hooks with Prettier and ESLint_** [V. 4.0.0]

<p style=margin-left:20px>
This project comes packed with the <a herf="https://github.com/typicode/husky">Husky package</a> already configured to check and format every file on pre-commit.
This way, you'll always be able to format the codebase based on your Prettier and ESLint configurations!
</p>

<br />

## Quick Start

---

### Database

- Install PostgresQL
- Enter the environment with the command `psql`
- Create a database with the command `create database <DB_NAME>;`

### Back-End (do this for every service under **services/**)

- Install the dependencies using `yarn`
- Create the `.env`, `.env.test` and `.env.docker.test` files using the `.env.example` file and add the DB connection string to the `DATABASE_URL` key

### Gateway

- Go to the root of the `server/` in the command line
- Follow the guide to register and run your gateway with all of the services through [Apollo Studio](https://www.apollographql.com/docs/federation/quickstart/); Register the API key, the subgraphs through the rover module and create your project in Apollo Studio with the **Managed Mode**. When prompted to publish your federated schema, fill the data in the micro-service and gateway `.env` files and do one of the following steps:

  - **[ONLY FOR THE FIRST TIME]** Go to the `federation-auth` service, fire up the command `yarn dev`, then open up another terminal and fire up the command `yarn apollo:update`. Do this for the `federation-lang` service too.
  - **[FOR EVERY OTHER TIME]** In the gateway `package.json` there are several commands powered by bash files that can help you with the setup. Fire up the `yarn federation:dev` command and the `yarn federation:publish` command on another terminal to start and update the entire supergraph on Apollo Studio.

<br />

## How to GENERATE

---

This project comes with a handy micro-generator tool under `/GG_generator`. This tool helps generate some redundant and repetitive code to improve your DevX and shorten the development time.

The following steps are needed to install the utility:

- open the terminal and go to `cd GG_generator`
- Install [Plop](https://plopjs.com/) using `yarn global add plop`
- Install the tool using `npm i -g`

After succesfully installing the utility, go to the **root** of your federation micro-service or gateway and fire up the command `galactagraph-generator`. Follow the GUI to choose your code generator of choice.

These are the currently available generators

| Name                |               Description               | Root          |
| ------------------- | :-------------------------------------: | ------------- |
| Model               |    Adds a Prisma model w/ resolvers     | Micro-service |
| Extension (v.5.0.0) | Links two model from different services | Gateway       |
| Mutation            |     Adds a Prisma query w/ resolver     | Micro-service |
| Query               |     Adds a Prisma mutation w/ res.      | Micro-service |
| Service             |      Adds a new configured service      | Gateway       |

<br />

## How to CREATE A SERVICE

---

- Go to the root of the project and fire up the command `federation-generator`
- Select the `service` generator and follow the GUI to create a new service
- Move into the new folder with the terminal and fire up the `federation-generator` command to create a `model`
- Follow the [Quick start guide](#quick-start) to set-up the new service
- Go to the gateway root and fire up the command `yarn federation:dev`
- open another terminal and fire up the command `yarn federation:publish` (could fail for first-connection issues, re-run it if it does)

<br />

## How to RE-USE CODE

---

This project has a local package called `galactagraph-utils`, under `GG_utilities`. Shared code can be added there, and a new tarball can be created and updated on every project with the following procedure:

- Edit your **utils** project
- Fire up the command `yarn patch:local` or `yarn minor:local` or `yarn major:local`

<br />

## How to START

---

### With NPM/Yarn

- Go to the root of the gateway and start the federation ecosystem with `yarn federation:dev`

### With Docker

- Go to the root of the project and start the dockerized ecosystem with `yarn docker:up` (check the `POSTGRESQL_DATABASES` url in your `.env` files and make sure that every database you need is correctly written there)

### Optional Steps

- update the supergraph by running `yarn federation:publish` on another terminal while the application is running
- Check your [Apollo Studio Web Environment](https://studio.apollographql.com/)
- Fire up the command `yarn prisma:studio` to get the Prisma GUI OR use your **DBMS** of choice

<br />

## How to TEST

---

### Database

- Install PostgresQL
- Enter the env with the command `psql`
- Create a database with the command `create database <DB_NAME>_test;` (or use your personal naming convention)

### Back-End

- Create your test under the micro-service folder `__tests__/(integration or unit)` with the pattern `*.test.ts or *.unit.test.ts`
- Go to the root of the project and fire the testing command: `yarn federation:test`

<br />

## How-to GUIDES

<p style=margin-left:20px>
GalactaGraph can take care of a lot of code by itself, but it cannot be of much help if you don't know some stuff first, here are some guides to help you get started:

- [Apollo Federation](https://www.apollographql.com/docs/federation/quickstart/)
- [Express](https://expressjs.com/en/starter/installing.html)
- [GraphQL Codegen](https://www.graphql-code-generator.com/docs/getting-started/index)
- [Prisma ORM](https://www.prisma.io/docs/getting-started/quickstart)

</p>
<br />
<p style=margin-left:20px>
Aside from that, there can be moments where you need to bind two models from different subgraphs, with different relations, add new non-model mutations, create new GraphQL fields with resolvers ecc...
</p>
<p style=margin-left:20px>
For that you can find everything you need either in my personal study project, or in this README file:
</p>

- [the-federation-project](https://github.com/emanuele-moricci/federation-project)
- [README Guide](https://github.com/emanuele-moricci/galactagraph-boilerplate/blob/main/server/services/README.md)

<br />

## Migrating versions

---

### v2.0.0

The migration from `v1.0.0` to `v2.0.0` should not be that bad to undertake. Let's look at it together:

- You can safely copy and paste over the gateway, generator and utilities package. Remember to check for errors and re-install, pack and start the three projects
- Take every service you created and change their `/config` folders (+ relative dependencies) to the new streamlined structure
- You can also copy and paste the federation-auth service or do a DIFF to check what changed (namely the new `@auth` directive)
- Re-install the `federation-utils` package in every micro-service

You should be done now ✨

### v3.0.0

The migration from `v2.0.0` to `v3.0.0` majorly pertains the `federation-utils` project:

- You can safely copy and paste over the generator and utilities package
- Before using the new publishing system, find the `update-federation-utils.sh` file and add every micro-service to stay up-to-date
- Now align your version of the package and create a new patch/minor/major with the new commands
- Update your `user.resolver` and `userService` if you feel that the password blanking logics should be in the resolver
- Blank your `entry.graphql` files, they now reside in the `federation-utils` package
- Align your `schema.ts` files with the new versions

You should be done now ✨

### v3.0.5

The migration from `v3.0.0` to `v3.0.5` fixes various bugs and cleanes some code:

- You can safely copy and paste over the generator package
- Change every call for `rover` with `npx -p @apollo/rover@0.3.0 rover` in the package.json files and check those files with the new versions to add/remove dependencies
- Change the `prismaMocks.ts` files to match the new version
- Change the `codegen.yml` files to match the new version
- Change the `server/package.json` files to match the new version

You should be done now ✨

### v4.0.0

The migration from `v3.0.5` to `v4.0.0` fixes various bugs, cleanes some code and adds some new stuff:

> The new version has several small fixes, so we'd suggest you to check your codebase and the boilerplate with a DIFF tool to avoid missing some stuff

- You can safely override the new `server/bin` folder to your old one
- You can safely copy and paste over the generator and utils packages
- Check every package.json with the new versions and rebuild them
- Add the new .husky folder + gateway package.json configuration like in the boilerplate
- Check your ESLint, Prettier and TSConfig files
- Under the GG_utilities folder, fire up the command `yarn publish:local` to update the package with the new directive
- Align the `schema.ts` files to match the new version
- Align the `Dockerfile` to match the new version

You should be done now ✨

### v5.0.0

The migration from `v4.0.0` to `v5.0.0` adds new security functionalities, changes the docker flow and divides the extensions resolvers and graphql files:

> The new version has several changes, so we'd suggest you to check your codebase and the boilerplate with a DIFF tool to avoid missing some stuff

- You can safely override the new `server/bin` folder to your old one
- You can safely copy and paste over the generator package
- Check every package.json with the new versions and rebuild them (remove the @apollo/rover package and install it globally!)
- Add the Dockerfiles in every micro-service as per the new version
- Update the gateway/security file with the new version
- Re-install the `federation-utils` package in every micro-service from the new source (fire up the command `yarn publish:local` from the package)
- Check every service to find all the old links between models and updated them to the new version. Example:

```typescript
const resolver = {
  User: {
    ...

    language: ({ languageId }: IUserRef): Language => ({
      __typename: 'Language',
      languageId: languageId,
    }),

    ...
  },

  ...

  Language: {
    users: async ({ languageId }: ILanguageRef): Promise<User[]> => {
      return getUsersByLanguageId(parseInt(languageId));
    },
  },

  ...
};

// ^^^^^^^^^^^ MOVE THE LANGUAGE LINES TO A NEW 'Extensions/Language/Language.resolver.ts' FILE

```

```graphql

extend type Language @key(fields: "languageId") {
  # the language id
  languageId: ID! @external

  # every user with a given language
  users: [User]
}

// ^^^^^^^^^^^ REMOVE THIS CODE FROM 'entry.graphql' AND ADD IT TO A NEW 'Extensions/Language/Language.graphql' FILE

```

<br />

### v6.0.0

The migration from `v5.0.0` to `v6.0.0` solves tons of issues with the previous versions, like adding Authorization back, fixing performance bugs, removing faulty directives and improving the Docker set-up.
<br /> Let's see how to upgrade:

> The new version has several changes, so we'd suggest you to check your codebase and the boilerplate with a DIFF tool to avoid missing some stuff

- **[OPTIONAL]** Add the new `federation-lang` service and check the `federation-auth` diff to link the two projects.
- You can safely copy and paste over the generator package
- Check the diff to change nearly every `federation-` appendix to `galactagraph-`.
- Check the `GG_Utilities` package and rebuild it (remove directives, added graphql-shield rules) to get up to speed with the new version.
- Add the new `permissions.ts` file to every service and code your custom authorization rules.
- Extrapolate the `__resolveReference` functions to their own `.reference.ts` file (needed to make graphql-shield work correctly).
- Check your `Dockerfile`, `docker-compose.yaml` and `schema.ts` files for differences. Same thing with the package.json files. Rebuild every solution to make sure that everything is up-to-date.

<br />

### v7.0.0

The migration from `v6.0.0` to `v7.0.0` restricts the GalactaGraph boilerplate to use an opinionated Class-Based structure for its resolvers.
<br /> Let's see how to upgrade:

> The new version has several changes, so we'd suggest you to check your codebase and the boilerplate with a DIFF tool to avoid missing some stuff

- You can safely copy and paste over the generator package
- You can safely copy and paste over the utilities package
- Re-install the `federation-utils` package in every micro-service from the new source (fire up the command `yarn publish:local` from the package)
- Check every `.resolver.ts` file and:
  - Change their extension to `.model.ts`, `.query.ts`, `.mutation.ts` or `.extension.ts` depending on their function
  - Change their code to match the new `Class-Based` structure. You can look at the examples or generate an example entity with the generator to see how it's done.
  - Remove every `.reference.ts` files. We don't need'em anymore.
- Check and update every `schema.ts` file to match the new version.
- **[OPTIONAL]** Extract every generic query or mutation from the generic Query and Mutation folders into their own sub-folders, for clarity.

<br />

## License

---

This project is licensed under the MIT license, Copyright (c) 2021 Emanuele Moricci. For more information see the `LICENSE` file.
