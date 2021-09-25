import { gql } from "apollo-server-fastify";

export default gql`
  type File {
    fileName: String!
    content: String!
    user: User!
  }
`;
