import { gql } from "apollo-server-fastify";

export default gql`
  type Tab {
    fileName: String!
    isSelected: Boolean!
    user: User!
  }

  union TabsResult = TabsSuccess | Unauthenticated

  type TabsSuccess implements Success {
    message: String!
    tabs: [Tab!]!
  }

  union UpdateTabsResult = UpdateTabsSuccess | Unauthenticated

  type UpdateTabsSuccess implements Success {
    message: String!
  }
`;
