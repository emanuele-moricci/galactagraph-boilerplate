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
<br /> This is an example of the `User Model Class` file. It contains the resolver that links the newly generated model with the whole Graph and a handy function to get the list of every user in the database.

```typescript
...

@ModelResolver('User')
class UserResolver implements ResolverClass<User, IUserRef> {
  reference = ({ userId }: IUserRef) => {
    return getUserById(parseInt(userId));
  };

  get = (_source, args, _context, _info) => {
    return getAllUsers(args);
  };

  set = (_source, args, _context, _info) => {
    return createUser(args);
  };
}

export default new UserResolver();
```

<br />

## How to Create a Query or Mutation

---

The project uses `graphql-tools` to merge schemas and resolvers together automatically, so adding a new Mutation or Query with the CLI is a breeze 🌬️

1. First thing first, we have to open up our terminal of choice and go to the micro-service root with `cd server/services/<MICRO_SERVICE_NAME>`
2. Now we can fire up our CLI with `galactagraph-generator` and choose either the Query or Mutation generators.
3. Follow the GUI to create your operation of choice, then fire up the entire federation at the gateway root with the `yarn federation:dev` command and in another terminal fire up the `yarn federation:publish` command to generate the Typescript code and push your edits to the Federated Supergraph

<br />

### QUERY GENERATOR

The query generator will create a .graphql and a resolver.ts file under `schema/Query/<QUERY_NAME>` or `schema/Models/<MODEL_NAME>/queries/<QUERY_NAME>`, depending if you want a model or non-model query.
It is now up to you now to fill the resolver logic and change the query output!

```graphql

extend type Query {
  """
  function to get all values
  """
  getAllValues: Value[]
}


```

```typescript
...

@QueryResolver('getAllValues')
class GetAllValuesQuery implements OperationClass<Value[]> {
  resolve = (_source, _args, _context, _info) => {
    return getAllValues();
  };
}

export default new GetAllValuesQuery();
```

<br />

### MUTATION GENERATOR

The mutation generator will create a .graphql and a resolver.ts file under `schema/Mutation/<MUTATION_NAME>` or `schema/Models/<MODEL_NAME>/mutations/<MUTATION_NAME>`, depending if you want a model or non-model mutation.
It is now up to you now to fill the resolver logic and change the mutation input and payload properties!

```graphql

extend type Mutation {
  """
  Creates a Value
  """
  createValue(input: CreateValueInput): CreateValuePayload
}

"""
CreateValue input
"""
input CreateValueInput {
  """
  Fill the mutation object input
  """
}

"""
CreateValue payload
"""
type CreateValuePayload {
  """
  Fill the mutation return payload
  """
}


```

```typescript
...

@MutationResolver('createValue')
class CreateValueMutation implements OperationClass<CreateValuePayload> {
  resolve = async (
    _source, { input }: { input: CreateValueInput }, _context, _info
  ): Promise<CreateValuePayload | null> => {
    try {
      const value = await createValue(input);

      return { value };
    } catch (error) {
      console.error(error);
      return { value: null };
    }
  };
}

export default new CreateValueMutation();
```

<br />

## How to link two models in the same or different subgraphs

---

In GraphQL, the models can connect between eachother with relationships like in a relational database (1:1, 1:N, N:N), so let's explore how to create this link in GalactaGraph:

1. [OPTIONAL] Create a new model following our handy [guide](#how-to-create-a-service-with-a-model)
2. In the `schema.prisma` file, connect the two models as you see fit (Example in 1:1 for different subgraphs)

```graphql

"""
First SubGraph
"""
model User {
  userId         Int      @id @default(autoincrement())

  ...

  profileId      Int

  """
  1:1 in the same subgraph would be
  profile        Profile
  """

  """
  1:N in the same subgraph would be
  profileIds     Int[]
  """

  ...
}

"""
Second SubGraph (in this case, no edits are needed)
"""
model Profile {
  profileId     Int      @id @default(autoincrement())

  """
  1:1 in the same subgraph would be
  user        User
  """
  ...
}

```

3. Generate, migrate and seed accordingly
4. Use the `galactagraph-generator` to link the two models together.
   In this case, the result output (in the `Extensions` folder of one of the two/both micro-services) will be this:

```typescript
...

@ExtensionResolver('Profile', 'User')
class ProfileUserExtension
  implements ExtensionClass<Profile, IProfileRef, User, IUserRef>
{
  @ResolveRelationship('profile')
  resolve = ({ profileId }: IUserRef): Profile => ({
    __typename: 'Profile',
    profileId,
  });

  @ConnectRelationship('users')
  connect = ({ profileId }: IProfileRef): Promise<User[]> => {
    // ADD YOUR RESOLVER LOGIC HERE
  };
}

export default new ProfileUserExtension();

```

5. Create your functions in the `<MODEL_NAME>Service.ts` files (or anywhere you want really) and return the correct data!
6. Fire up the entire federation at the gateway root with the `yarn federation:dev` command and in another terminal fire up the `yarn federation:publish` command to generate the Typescript code and push your edits to the Federated Supergraph

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
- The schema generated with Codegen is handled by the [@graphql-tools](https://www.graphql-tools.com/docs/introduction) library to remove redundant code. To ensure this, the files that are used to generate the usable/publishable code are `*.graphql`, `*.model.ts`, `*.query.ts`, `*.mutation.ts` and `*.extension.ts`. Please use these extensions when you want to add a type, resolver or reference to your micro-service
- To ensure that starting, building, testing and dockerising the entire federation is as easy as pushing a button, GalactaGraph created a handful of `.bash` scripts that need to remain untouched unless you know what you're doing
