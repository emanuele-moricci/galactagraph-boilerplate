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

1. [How to Create a Service with a Model](#how-to-create-a-service-with-a-model)
2. [How to Create a non-model Query or Mutation](#how-to-create-a-non-model-query-or-mutation)
3. [How to Create a model Query or Mutation](#how-to-create-a-model-query-or-mutation)
4. [How to link two models in the same subgraph](#how-to-link-two-models-in-the-same-subgraph)
5. [How to link two models from different subgraphs](#how-to-link-two-models-from-different-subgraphs)
6. [N:N Relationships bewteen different subgraphs](#nn-relationships-bewteen-different-subgraphs)
7. [Some drawbacks of the Federation structure](#some-drawbacks-of-the-federation-structure)
8. [Do's and Don'ts](#dos-and-donts)

</h3>

<br />

## How to Create a Service with a Model

---

This boilerplate contains a CLI project that is set-up to remove the burden of repetition when creating models and services. Let's see how to use it for the most common case: creating a Service with a Model 🚀

1. First thing first, we have to open up our terminal of choice and go to the gateway root with `cd server/`
2. Now it's time to fire up our CLI with `federation-generator` (the main guide tells you how to install this package)
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

In the `schema/Models` you'll find the new folder with the configured Model schema and resolver functions.
```typescript

...

const resolver = {
  Query: {
    User: async (_source, args, _context, _info): Promise<User[]> => {
      return await getAllUsers(args);
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return await getUserById(parseInt(userId));
    },
  },
};

export default resolver;


```

<h2></h2>

<br />

## How to Create a non-model Query or Mutation

---

Not every query or mutation is going to be directly tied to a Model, like  a login mutation for example.
Fortunately, the project uses `graphql-tools` to merge schemas and resolvers together automatically, so adding a new Mutation or Query is a breeze 🌬️

1. First thing first, we have to open up our terminal of choice and go to the micro-service root with `cd server/services/<MICRO_SERVICE_NAME>`
2. Now we can fire up our CLI with `federation-generator` and choose either the Query or Mutation generators.
3. Follow the GUI to create your operation of choice, then fire up the entire federation at the gateway root with the `yarn federation:dev` command and in another terminal fire up the `yarn federation:publish` command to generate the Typescript code and push your edits to the Federated Supergraph

### QUERY GENERATOR
The query generator will create a .graphql and a resolver.ts file under `schema/Query/<QUERY_NAME>`, it is now up to you to fill the resolver logic and change the query output!

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
      return "WIP"
    },
  },
};

export default resolver;


```

### MUTATION GENERATOR
The mutation generator will create a .graphql and a resolver.ts file under `schema/Mutation/<MUTATION_NAME>`, it is now up to you to fill the resolver logic and change the mutation input and payload properties!

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
        return "WIP"
      },
    },
  },
};

export default resolver;


```

<br />

## How to Create a model Query or Mutation

---

If you need to create a query or a mutation for a specific Model, you've come to the right place ✔️
Fortunately, the project uses `graphql-tools` to merge schemas and resolvers together automatically, but unfortunately our CLI does not support yet the Model specific Query/Mutation, so we'll have to do it ourselves. Still it is very easy to do:
1. Go to the folder of your model in your micro-service, under `schema/Models/<MODEL_NAME>`
2. Add a `queries` or `mutations` folder and add a sub-folder with your query or mutation name
3. Add two files inside; one called `<OP_NAME>.graphql` and the other one called `<OP_NAME>.resolver.ts` (the `.resolver` is important, don't omit it!)
4. In the graphql file you have to extend the query/mutation type to include your operation, meanwhile the resolver has to be a function that can catch the operation and resolve it! Here's an example:
```graphql
extend type Query {
  """
  Get me query
  """
  me: User
}

```

```typescript
import { User } from '@prisma/client';

import { getUserById } from '@src/services/userService';

const resolver = {
  Query: {
    me: async (_, __, context): Promise<User | null> => {
      return getUserById(context?.userData?.userId ?? -1);
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
3. Update your `<MODEL_NAME>.graphql` files to reflect the change
4. Your `resolver.ts` files will have to resolve the newly added field, let's see an example:

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

3. Now update your `<MODEL_NAME>.graphql` file adding the actual model, like so:

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

4. The remote model needs to be extended in the first one. To do this we can use the `Entry.graphql` file:

```graphql

...

extend type Language @key(fields: "languageId") {
  # the language id
  languageId: ID! @external

  # every user with a given language
  users: [User]
}

```

5. Now, since the scope of the relation in this example is to add the ability to see every user for a language, we'll resolve everything in the micro-service that hosts the User Model. In your `<MODEL_NAME>.resolver.ts` there's some code to add:

```typescript

...

const resolver = {
  Query: {
    User: async (_source, args): Promise<User[]> => {
      return getAllUsers(args);
    },
  },
  User: {
    __resolveReference: async ({ userId }: IUserRef): Promise<User | null> => {
      return getUserById(parseInt(userId));
    },
    
    ...
    
    language: ({ languageId }: IUserRef): Language => ({
      __typename: 'Language',
      languageId: languageId,
    }),
    
    ...
  },
  // EXTENSIONS
  Language: {
    users: async ({ languageId }: ILanguageRef): Promise<User[]> => {
      return getUsersByLanguageId(parseInt(languageId));
    },
  },
  
  ...
};

export default resolver;

```

6. As you can see, we resolver the User->language and Language->users fields for the subgraph and leave the Federation to merge them all together. To resolve a Model from a different Subgraph as per example we need to buonce back an object like this: 
`{ __typename: '<MODEL_NAME>' <MODEL_NAME>Id: <MODEL_NAME>Id }`
> Of course you need to create your service functions to add the logic!
7. Create your functions in the `<MODEL_NAME>Service.ts` files (or anywhere you want really) and return the correct data!
8. Fire up the entire federation at the gateway root with the `yarn federation:dev` command and in another terminal fire up the `yarn federation:publish` command to generate the Typescript code and push your edits to the Federated Supergraph

<br />

## N:N Relationships bewteen different subgraphs

---

This is a bit tricky but not impossible, essentially you need to follow the previous guide to link two Models from different subgraphs, with only one major difference.
When it's time to resolve the Query, you need to pass an array of `{ __typename, id }`, like so:

```typescript

const resolver = {
  Query: {},
  Profile: {
    
    ...
    
    groups: ({ groups }: IProfileRef): Group[] =>
      groups.map(id => ({
        __typename: 'Group',
        groupId: id,
      })),
  },
  // EXTENSIONS
  Group: {
    members: async ({ groupId }: IGroupRef): Promise<Profile[]> => {
      return getMembersOfGroup(parseInt(groupId));
    },
  },
  
  ...
};

```

<br />

## Some drawbacks of the Federation structure

---

Unfortunately the Federation structure is still new and, even if it was adopted by big players like Netflix, there still are some drawbacks that we have to be aware of:
1. The Federation structure handles Queries perfectly, making them easy to do and maintain. The same thing cannot be said for mutations though, since we cannot merge migrations from different subgraphs, adding complexity to the client source that is calling the API. For example, if we want to create a User and a Profile we cannot do it in a single Mutation, but we need to call first the `CreateUserMutation` and then the `CreateProfileWithUserIdMutation`.
2. The third operation, Subscriptions is not supported as of now, although somebody managed to create custom solutions to circle around the problem.
3. Code re-usability is a major issue, since every subgraph will undoubtedly share some types, utility functions or just general code. GalactaGraph solves this using a private package to share code, but it's more a work-around than a solution.
4. Starting the entire federation when it has 5+ services can become a chore manually, so custom starting scripts (like GalactaGraph has) are a MUST.
5. Linking models depending on the scope is a way of thinking and it's not easy to resolve on-the-fly. The Apollo Team has a great [article](https://www.apollographql.com/docs/federation/enterprise-guide/federated-schema-design/) about this very problem.

<br />

## Do's and Don'ts

---

The GalactaGraph boilerplate has a kinda strict folder structure with rules that assure the correct function of the CLI, scripts and Schema&Resolvers mergers. Let's look at the rules that NEED to be followed to ensure that nothing breaks:
- You may see several comments that ask you not to be removed, like `[IMPORT NEW VALUE] // <- DO NOT REMOVE - ...`; this lines are used by the CLI to find the right spot to generate queries/migrations/models ecc... Please do not touch them! 🚯
- The schema generated with Codegen is handled by the [@graphql-tools](https://www.graphql-tools.com/docs/introduction) library to remove redundant code. To ensure this, the files that are used to generate the usable/publishable code are `*.graphql` and `*.resolver.ts`. Please use these extensions when you want to add a type or resolver to your micro-service
- To ensure that starting, building, testing and dockerizing the entire federation is as easy as pushing a button, GalactaGraph created a handful of `.bash` scripts that need to remain untouched unless you know what you're doing

