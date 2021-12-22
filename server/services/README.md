<div align="center">
<pre>
  ________       .__                 __           ________                    .__     
 /  _____/_____  |  | _____    _____/  |______   /  _____/___________  ______ |  |__  
/   \  ___\__  \ |  | \__  \ _/ ___\   __\__  \ /   \  __\_  __ \__  \ \____ \|  |  \ 
\    \_\  \/ __ \|  |__/ __ \\  \___|  |  / __ \\    \_\  \  | \// __ \|  |_> >   Y  \
 \______  (____  /____(____  /\___  >__| (____  /\______  /__|  (____  /   __/|___|  /
        \/     \/          \/     \/          \/        \/           \/|__|        \/ 
</pre>

# Welcome to the GalactaGraph How-To Documentation!

Here you can find some cool examples on how to navigate around the GraphQL Apollo Federation environment.

##### Created by Emanuele Moricci with ❤️ and 🍕

</div>

<br />

## Index

---

<h3>

- [Welcome to the GalactaGraph How-To Documentation!](#welcome-to-the-galactagraph-how-to-documentation)
        - [Created by Emanuele Moricci with ❤️ and 🍕](#created-by-emanuele-moricci-with-️-and-)
  - [Index](#index)
  - [How to Create a Service with a Model](#how-to-create-a-service-with-a-model)
  - [How to Create a Query or Mutation](#how-to-create-a-query-or-mutation)
    - [QUERY GENERATOR](#query-generator)
    - [MUTATION GENERATOR](#mutation-generator)
  - [How to link two models in the same subgraph](#how-to-link-two-models-in-the-same-subgraph)
  - [How to link two models from different subgraphs](#how-to-link-two-models-from-different-subgraphs)
  - [Some drawbacks of the Federation structure](#some-drawbacks-of-the-federation-structure)
  - [Do's and Don'ts](#dos-and-donts)

</h3>

<br />

## How to Create a Service with a Model

---

This boilerplate contains a CLI project that is set-up to remove the burden of repetition when creating models and services. Let's see how to use it for the most common case: creating a Service with a Model 🚀

1. First thing first, we have to open up our terminal of choice and go to the gateway root with `cd server/`
2. Now it's time to fire up our CLI with `galactagraph-generator` (the main guide tells you how to install this package)
3. A handy and sparkly interface will show up asking you what you want to generate. Choose the `service` generator
4. Go through the guided wizard to create your tailored service and wait for the generation to complete ♻️
5. Now that we have our shiny new service, it's time to add some things:
   1. Open up your postgres instance and create two new databases. One for development and one for testing
   2. Clone the `.env.example` file and create 3 new envs, filling them with data: `.env`, `.env.test` and `.env.docker.test`
   3. Fetch the node_modules using `yarn` or `npm install`
6. Our micro-service is now ready 🏁. Now it's time to generate our first Model
7. Go to the root of the service in the terminal using `cd services/<SERVICE_NAME>/` and fire up the generator once again
8. This time, choose the `model` generator and follow the guided wizard once more. This will take some time to complete as the model is simultaneously generating, migrating and seeding the Prisma model.
9. We now have our Model, hurray 💃! Here are some last things we've got to do.
   1. Go back to the root of the gateway and fire up the command `yarn federation:dev`
   2. If everything goes according to plan, you can open up another terminal on the same root and fire up the command `yarn federation:publish` (could fail the first time, just re-run it if needed)
10. Done ✨

You can see that the `prisma/schema.prisma` file is now updated with the new model, containing the id and audit fields.

```graphql

...

model User {
  userId         Int      @id @default(autoincrement())

  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt
  deleted        Boolean  @default(false)
}

```

In the `schema/Models` you'll find the new folder with the configured Model schema, a resolver file and a reference file. The files will change depending on what you choose in the generator wizard. You can choose to have a pre-made 'getAll' query, 'create' mutation and unit&integration tests to cover your changes.
<br /> This is an example of the reference file. It contains the resolver that links the newly generated model with the whole Graph.

```typescript

...

const reference = {
  ...
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
  },
  ...
};

export default reference;


```

<br />

## How to Create a Query or Mutation

---

The project uses `graphql-tools` to merge schemas and resolvers together automatically, so adding a new Mutation or Query with the CLI is a breeze 🌬️

1. First thing first, we have to open up our terminal of choice and go to the micro-service root with `cd server/services/<MICRO_SERVICE_NAME>`
2. Now we can fire up our CLI with `galactagraph-generator` and choose either the Query or Mutation generators.
3. Follow the GUI to create your operation of choice, then fire up the entire federation at the gateway root with the `yarn federation:dev` command and in another terminal fire up the `yarn federation:publish` command to generate the Typescript code and push your edits to the Federated Supergraph

### QUERY GENERATOR

The query generator will create a .graphql and a resolver.ts file under `schema/Query/<QUERY_NAME>` or `schema/Models/<MODEL_NAME>/queries/<QUERY_NAME>`, depending if you want a model or non-model query.
It is now up to you now to fill the resolver logic and change the query output!

```graphql

extend type Query {
  """
  function to get all values
  """
  getAllValues: String """ SUBSTITUTE THIS WITH THE CORRECT RETURN TYPE """
}


```

```typescript
const resolver = {
  Query: {
    getAllValues: async (_source, _args, _context, _info): Promise<string> => {
      // CHANGE THE RETURN TYPE AND ADD THE LOGIC!
      return 'WIP';
    },
  },
};

export default resolver;
```

### MUTATION GENERATOR

The mutation generator will create a .graphql and a resolver.ts file under `schema/Mutation/<MUTATION_NAME>` or `schema/Models/<MODEL_NAME>/mutations/<MUTATION_NAME>`, depending if you want a model or non-model mutation.
It is now up to you now to fill the resolver logic and change the mutation input and payload properties!

```graphql

extend type Mutation {
  """
  Creates a Value
  """
  createValue(input: createValueInput): createValuePayload
}

"""
createValue input
"""
input createValueInput {
  """
  Fill the mutation object input
  """
}

"""
createValue payload
"""
type createValuePayload {
  """
  Fill the mutation return payload
  """
}


```

```typescript
const resolver = {
  Mutation: {
    createValue: {
      resolve: async (_, { input }): Promise<any> => {
        // CHANGE THE RETURN TYPE AND ADD THE LOGIC!
        return 'WIP';
      },
    },
  },
};

export default resolver;
```

<br />

## How to link two models in the same subgraph

---

In GraphQL, the models can connect between eachother with relationships like in a relational database (1:1, 1:N, N:N), so let's explore how to create this link in GalactaGraph:

1. [OPTIONAL] Create a new model following our handy [guide](#how-to-create-a-service-with-a-model)
2. In the `schema.prisma` file, connect the two models as you see fit (Example in 1:1)

```graphql

model User {
  userId         Int      @id @default(autoincrement())

  ...

  profile       Profile

  ...
}

model Profile {
  profileId     Int      @id @default(autoincrement())

  ...

  user          User

  ...
}

```

3. Generate, migrate and seed accordingly
4. Update your `<MODEL_NAME>.graphql` files to reflect the change
5. Your `resolver.ts` files will have to resolve the newly added field, let's see an example:

```typescript
...
User: {
    ...
    profile: async ({ userId }: IUserRef): Promise<Profile | null> => {
      return getProfileByUserId(parseInt(userId));
    },
  },
...

```

5. Create your functions in the `<MODEL_NAME>Service.ts` files (or anywhere you want really) and return the correct data!
6. Fire up the entire federation at the gateway root with the `yarn federation:dev` command and in another terminal fire up the `yarn federation:publish` command to generate the Typescript code and push your edits to the Federated Supergraph

<br />

## How to link two models from different subgraphs

---

One of the best features of a Federated API is that you can communicate between subgraphs with ease, and with GalactaGraph the process has been streamlined even more! You can find a clear example at the [federation-project repo](https://github.com/emanuele-moricci/federation-project), but if you want a clear-cut bullet list, here it is:

1. [OPTIONAL] Create a new model following our handy [guide](#how-to-create-a-service-with-a-model)
2. In the `schema.prisma` file, connect the two models as you see fit. In the case of the 1:1 or 1:N example you can use the <MODEL_NAME>Id like this:

```graphql
model User {
  userId         Int      @id @default(autoincrement())

  ...

  languageId     Int

  ...
}
```

3. Now update your `<MODEL_NAME>.graphql` file adding the actual model with the chosen relationship, like so:

```graphql

type User ... {
  ...

  """
  user language
  """
  language: Language

  ...
}

```

4. Go to the Gateway Root in the command line and fire up the `federation-generator` command. Choose the `Extension` generator and follow the prompt to link the two models.
5. Now open the generated files, namely the `*.resolver.ts` and `*.graphql` files created under the `Externals/<MODEL_NAME>` folder.
6. As you can see, we resolve the Model1->Model2 and Model2->Model1 fields in the first model subgraph and leave the Federation to merge them all together. Now to finish the procedure, add your own Resolver+Service code!
7. Create your functions in the `<MODEL_NAME>Service.ts` files (or anywhere you want really) and return the correct data!
8. Fire up the entire federation at the gateway root with the `yarn federation:dev` command and in another terminal fire up the `yarn federation:publish` command to generate the Typescript code and push your edits to the Federated Supergraph

<br />

## Some drawbacks of the Federation structure

---

Unfortunately the Federation structure is still new and, even if it was adopted by big players like Netflix, there still are some drawbacks that we have to be aware of:

1. The Federation structure handles Queries perfectly, making them easy to do and maintain. The same thing cannot be said for mutations though, since we cannot merge migrations from different subgraphs, adding complexity to the client source that is calling the API. For example, if we want to create a User and a Profile we cannot do it in a single Mutation, but we need to call first the `CreateUserMutation` and then the `CreateProfileWithUserIdMutation`.
2. The third operation, Subscriptions is not supported as of now, although somebody managed to create custom solutions to circle around the problem.
3. Code re-usability is a major issue, since every subgraph will undoubtedly share some types, utility functions or just general code. GalactaGraph solves this using a private package to share code, but it's more of a work-around than a solution.
4. Starting the entire federation when it has 5+ services can become a chore manually, so custom starting scripts (like GalactaGraph has) are a MUST.
5. Linking models depending on the scope is a way of thinking and it's not easy to resolve on-the-fly. The Apollo Team has a great [article](https://www.apollographql.com/docs/federation/enterprise-guide/federated-schema-design/) about this very problem.
6. Custom Directives just don't work with the system as of now, which is a shame, since they're a very powerful GraphQL feature.

<br />

## Do's and Don'ts

---

The GalactaGraph boilerplate has a strict folder structure with rules that assure the correct function of the CLI, scripts and Schema&Resolvers mergers. Let's look at the rules that NEED to be followed to ensure that nothing breaks:

- You may see several comments that ask you not to be removed, like `[IMPORT NEW VALUE] // <- DO NOT REMOVE - ...`; this lines are used by the CLI to find the right spot to generate queries/migrations/models ecc... Please do not touch them! 🚯
- The schema generated with Codegen is handled by the [@graphql-tools](https://www.graphql-tools.com/docs/introduction) library to remove redundant code. To ensure this, the files that are used to generate the usable/publishable code are `*.graphql`, `*.resolver.ts` and `*.reference.ts`. Please use these extensions when you want to add a type, resolver or reference to your micro-service
- To ensure that starting, building, testing and dockerizing the entire federation is as easy as pushing a button, GalactaGraph created a handful of `.bash` scripts that need to remain untouched unless you know what you're doing
