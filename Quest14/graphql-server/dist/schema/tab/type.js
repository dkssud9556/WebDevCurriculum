"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_fastify_1 = require("apollo-server-fastify");
exports.default = (0, apollo_server_fastify_1.gql) `
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
//# sourceMappingURL=type.js.map