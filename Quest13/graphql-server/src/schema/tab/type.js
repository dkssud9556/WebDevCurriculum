import { gql } from "apollo-server-fastify";

export default gql`
  type Tab {
    fileName: String!
    isSelected: Boolean!
    user: User!
  }
`;
