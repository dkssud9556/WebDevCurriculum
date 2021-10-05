"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_fastify_1 = require("apollo-server-fastify");
exports.default = (0, apollo_server_fastify_1.gql) `
  type User {
    username: String!
    files: [File!]!
    tabs: [Tab!]!
  }

  union UserResult = UserSuccess | Unauthenticated

  type UserSuccess implements Success {
    message: String!
    user: User
  }

  union LoginResult = LoginSuccess | InvalidLoginInfo

  type LoginSuccess implements Success {
    message: String!
  }

  type InvalidLoginInfo implements BusinessError {
    message: String!
    statusCode: Int!
  }

  union RegisterResult = RegisterSuccess | UsernameDuplication

  type RegisterSuccess implements Success {
    message: String!
  }

  type UsernameDuplication implements BusinessError {
    message: String!
    statusCode: Int!
  }

  union LogoutResult = LogoutSuccess

  type LogoutSuccess implements Success {
    message: String!
  }
`;
//# sourceMappingURL=type.js.map