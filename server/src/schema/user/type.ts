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

  union LogoutResult = LogoutSuccess

  type LogoutSuccess implements Success {
    message: String!
  }
`;
