"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const apollo_server_fastify_1 = require("apollo-server-fastify");
const user_1 = require("./user");
const tab_1 = require("./tab");
const file_1 = require("./file");
const rootTypeDef = (0, apollo_server_fastify_1.gql) `
  interface BusinessError {
    statusCode: Int!
    message: String!
  }

  interface Success {
    message: String!
  }

  type Query {
    files: FilesResult
    file(fileName: String!): FileResult
    tabs: TabsResult
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult
    register(username: String!, password: String!): RegisterResult
    logout: LogoutResult
    saveFile(fileName: String!, content: String!): SaveFileResult
    updateFileContent(
      fileName: String!
      content: String!
    ): UpdateFileContentResult
    deleteFile(fileName: String!): DeleteFileResult
    renameFile(fileName: String!, newFileName: String!): RenameFileResult
    updateTabs(openTabs: [String!]!, selectedTab: String!): UpdateTabsResult
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
exports.default = (0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: [rootTypeDef, user_1.userTypeDef, tab_1.tabTypeDef, file_1.fileTypeDef],
    resolvers: [user_1.userResolver, file_1.fileResolver, tab_1.tabResolver],
});
//# sourceMappingURL=index.js.map