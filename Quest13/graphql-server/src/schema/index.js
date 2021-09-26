import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server-fastify";

import { userResolver, userTypeDef } from "./user/index.js";
import { tabTypeDef } from "./tab/index.js";
import { fileTypeDef, fileResolver } from "./file/index.js";

const rootTypeDef = gql`
  interface BusinessError {
    statusCode: Int!
    message: String!
  }

  interface Success {
    message: String!
  }

  type Query {
    user: UserResult
    files: FilesResult
    file(fileName: String!): FileResult
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult
    register(username: String!, password: String!): RegisterResult
    logout: LogoutResult
  }

  type InvalidParameter implements BusinessError {
    message: String!
    statusCode: Int!
  }

  type Unauthenticated implements BusinessError {
    message: String!
    statusCode: Int!
  }
`;

export default makeExecutableSchema({
  typeDefs: [rootTypeDef, userTypeDef, tabTypeDef, fileTypeDef],
  resolvers: [userResolver, fileResolver],
});
