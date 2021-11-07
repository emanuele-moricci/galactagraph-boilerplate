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

W.I.P.

<br />

## How to link two models in the same subgraph

---

W.I.P.

<br />

## How to link two models from different subgraphs

---

W.I.P.

<br />

## N:N Relationships bewteen different subgraphs

---

W.I.P.

<br />

## Some drawbacks of the Federation structure

---

W.I.P.

<br />

## Do's and Don'ts

---

W.I.P.
