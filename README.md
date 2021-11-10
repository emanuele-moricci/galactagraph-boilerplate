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
    - [v.2.0.0](#v200)
    - [v.3.0.0](#v300)
11. [License](#license)

</h3>
<br />

## What is GalactaGraph?

---

GalactaGraph is an Apollo Federation boilerplate that aims to reduce the countless hours spent setting up and bootstrapping a NodeJS+GraphQL application with a Federated Schema.

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
As of now, you need to start the micro-service in question and fire up the codegen command on another terminal to generate the typescript files.
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
|
├─── prisma/    # The prisma config+seeders goes here!
|    ├─── db/
|    |    ├─── seeders/...
|    |    └─── seeder.ts
|    └─── schema.prisma
├─── src/       # Main starting-point for the micro-service
|    ├─── __tests__/...
|    ├─── config/...
|    ├─── graphql/       # The service main structure
|    |    ├─── generated/...
|    |    └─── schema/   # Collection of Models/Resolvers
|    |         ├─── Models/
|    |         |    ├─── ExampleModel/
|    |         |    |    ├─── ExampleModel.graphql
|    |         |    |    └─── ExampleModel.resolver.ts
|    |         |    └─── Entry.graphql
|    |         ├─── Mutation/...
|    |         ├─── Query/...
|    |         ├─── Utils/...
|    |         └─── schema.ts
|    └─── services/...   # Business Logic and Data-Access
└─── configuration files...
```

<br />

### 🐳 **_Ready-to-use Dockerfile with docker-compose.yml_**

<p style=margin-left:20px>
Docker is a great tool to run your applications in a containerized environment, solving several problems and allowing you to share the container world-wide without any additional OS-specific configuration.
</p>
<p style=margin-left:20px>
GalactaGraph takes care of the Dockerfile and docker-compose.yml files, so you can start your micro-service in a containerized environment in just a few seconds.
When generating a new service with the CLI tool, the necessary lines of code are scaffolded for you on the fly!
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

<p style=margin-left:20px>
Now, this is nowhere near enough, but it's a great starting point to build your own security policies on top of it.
</p>

<br />

### 🤝 **_Built-in Authentication_**

<p style=margin-left:20px>
The boilerplate comes pre-configured with a federation-auth microservice and the necessary logic on the gateway to share a JWT token between gateway and every part of the subgraph.
</p>
<p style=margin-left:20px>

> This code, under the `federation-auth` folder, is set-up to give you a simple `User` model with email, password and audit data, and with the `login` and `register` mutations ready-to-go. Learn more about JWT authentication [here](https://jwt.io/)

</p>

<br />

### 🛂 **_Built-in Authorization_** [V. 2.0.0]

<p style=margin-left:20px>

The boilerplate also has a handy `@auth` directive already configured and injected in every service that let's you easily add authorization to your GraphQL API on a per-field basis! The directive is already set-up to respond to the token in the header, so that you can immediately start to use it on your model fields that need protection!

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

  - **[ONLY FOR THE FIRST TIME]** Go to the `federation-auth` service, fire up the command `yarn dev`, then open up another terminal and fire up the command `yarn apollo:update`
  - **[FOR EVERY OTHER TIME]** In the gateway `package.json` there are several commands powered by bash files that can help you with the setup. Fire up the `yarn federation:dev` command and the `yarn federation:publish` command on another terminal to start and update the entire supergraph on Apollo Studio.

<br />

## How to GENERATE

---

This project comes with a handy micro-generator tool under `/GG_generator`. This tool helps generate some redundant and repetitive code to improve your DevX and shorten the development time.

The following steps are needed to install the utility:

- open the terminal and go to `cd GG_generator`
- Install [Plop](https://plopjs.com/) using `yarn global add plop`
- Install the tool using `npm i -g`

After succesfully installing the utility, go to the **root** of your federation micro-service or gateway and fire up the command `federation-generator`. Follow the GUI to choose your code generator of choice.

These are the currently available generators

| Name     |           Description            | Root          |
| -------- | :------------------------------: | ------------- |
| Model    | Adds a Prisma model w/ resolvers | Micro-service |
| Mutation | Adds a Prisma query w/ resolver  | Micro-service |
| Query    |  Adds a Prisma mutation w/ res.  | Micro-service |
| Service  |  Adds a new configured service   | Gateway       |

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

This project has a local package called `federation-utils`, under `GG_utilities`. Shared code can be added there, and a new tarball can be created and updated on every project with the following procedure:

- Edit your **utils** project
- Fire up the command `yarn patch:local` or `yarn minor:local` or yarn `major:local`

<br />

## How to START

---

### Without Docker

- Go to the root of the gateway and start the federation ecosystem with `yarn federation:dev`

### With Docker

- Go to the root of the project and start the dockerized ecosystem with `yarn docker:up` (for the docker version, check the `POSTGRESQL_DATABASES` url in your `.env` files and make sure that every database you need is correctly written there)

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

- Go into the `env.test` and `env.docker.test` file and change the `DATABASE_URL` connection string. Add the database name to the `POSTGRESQL_DATABASES` key in the `.env.docker.test` file in the gateway
- Create your test under the micro-service folder `__tests__/(integration or unit)` with the pattern `*.test.ts or *.unit.test.ts`
- Go to the root of the project and fire the testing command: `yarn federation:test` or `yarn federation:docker:test`

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
- You can safely copy and paste over the gateway, generator and utilities package. Remember to check for errors and re-install, pack and start the three projects.
- Take every service you created and change their `/config` folders (+ relative dependencies) to the new streamlined structure
- You can also copy and paste the federation-auth service or do a DIFF to check what changed (namely the new `@auth` directive)
- Re-install the `federation-utils` package in every micro-service

You should be done now ✨

### v3.0.0
The migration from `v2.0.0` to `v3.0.0` majorly pertains the `federation-utils` project:
- You can safely copy and paste over the generator and utilities package. 
- Before using the new publishing system, find the `update-federation-utils.sh` file and add every micro-service to stay up-to-date. 
- Now align your version of the package and create a new patch/minor/major with the new commands
- Update your `user.resolver` and `userService` if you feel that the password blanking logics should be in the resolver
- Blank your `entry.graphql` files, they now reside in the `federation-utils` package
- Align your `schema.ts` files with the new versions

You should be done now ✨

<br />

## License

---

This project is licensed under the MIT license, Copyright (c) 2021 Emanuele Moricci. For more information see the `LICENSE` file.
