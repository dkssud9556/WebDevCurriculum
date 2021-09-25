import { gql } from "apollo-server-fastify";

export default gql`
  type User {
    username: String!
    files: [File!]!
    tabs: [Tab!]!
  }

  type Query {
    user(username: String!): UserResult
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult
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
`;
