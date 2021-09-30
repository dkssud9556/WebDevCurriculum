import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-fastify';

import { userResolver, userTypeDef } from '@schema/user';
import { tabResolver, tabTypeDef } from './tab';
import { fileTypeDef, fileResolver } from './file';

const rootTypeDef = gql`
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

export default makeExecutableSchema({
  typeDefs: [rootTypeDef, userTypeDef, tabTypeDef, fileTypeDef],
  resolvers: [userResolver, fileResolver, tabResolver],
});
