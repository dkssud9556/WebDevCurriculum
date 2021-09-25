import { makeExecutableSchema } from "graphql-tools";
import { gql } from "apollo-server-fastify";

import { userResolver, userTypeDef } from "./user/index.js";
import { tabTypeDef } from "./tab/index.js";
import { fileTypeDef } from "./file/index.js";

const rootTypeDef = gql`
  interface BusinessError {
    statusCode: Int!
    message: String!
  }

  interface Success {
    message: String!
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
  resolvers: [userResolver],
});
