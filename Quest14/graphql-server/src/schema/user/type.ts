import { gql } from "apollo-server-fastify";

export default gql`
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
