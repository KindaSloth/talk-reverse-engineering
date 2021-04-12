const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const mock = require('./mock');

// Schema first <====
// Code first

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Post {
    id: String!
    title: String!
    description: String!
    time: String
  }

  type User {
    id: String!
    name: String!
    image: String
    userPosts: [Post!]!
  }

  input CreateUserInput {
    name: String!
    image: String
  }
  type CreateUserPayload {
    user: User!
  }

  input UpdateUserInput {
    id: String!
    name: String!
    image: String
  }
  type UpdateUserPayload {
    user: User!
  }

  input DeleteUserInput {
    id: String!
  }
  type DeleteUserPayload {
    user: User!
  }

  input CreateUserPostInput {
    userID: String!
    title: String!
    description: String!
    time: String
  }
  type CreateUserPostPayload {
    user: User!
    post: Post!
  }

  input UpdateUserPostInput {
    userID: String!
    postID: String!
    title: String!
    description: String!
    time: String
  }
  type UpdateUserPostPayload {
    user: User!
    post: Post!
  }

  input DeleteUserPostInput {
    userID: String!
    postID: String!
  }
  type DeleteUserPostPayload {
    user: User!
    post: Post!
  }

  input PostsInput {
    userID: String!
  }

  type Query {
    users: [User!]!
    posts(input: PostsInput!): [Post!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload!
    updateUser(input: UpdateUserInput!): UpdateUserPayload!
    deleteUser(input: DeleteUserInput!): DeleteUserPayload!

    createPost(input: CreateUserPostInput!): CreateUserPostPayload!
    updatePost(input: UpdateUserPostInput!): UpdateUserPostPayload!
    deletePost(input: DeleteUserPostInput!): DeleteUserPostPayload!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  users: () => mock.users,
  posts: ({ input }) => {
    const user = mock.users.find(user => user.id === input.userID);
    if (!user) return [];
    return user.userPosts;
  },

  createUser: ({ input }) => {
    return mock.createUser(input.name, input.image);
  },
  updateUser: ({ input }) => {
    return mock.updateUser(input.id, input.name, input.image);
  },
  deleteUser: ({ input }) => {
    return mock.deleteUser(input.id);
  },
  createPost: ({ input }) => {
    return mock.createUserPost(input.userID, input.title, input.description, input.time);
  },
  updatePost: ({ input }) => {
    return mock.updateUserPost(input.userID, input.postID, input.title, input.description, input.time);
  },
  deletePost: ({ input }) => {
    return mock.deleteUserPost(input.userID, input.postID);
  },
};

// Frontend => Middleware Graphql (graphqlHTTP) (String => AST) => Resolvers (Funções)

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');