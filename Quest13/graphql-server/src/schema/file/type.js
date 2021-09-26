import { gql } from "apollo-server-fastify";

export default gql`
  type File {
    fileName: String!
    content: String!
    user: User!
  }

  union FilesResult = FilesSuccess | Unauthenticated

  type FilesSuccess implements Success {
    message: String!
    files: [File!]!
  }

  union FileResult = FileSuccess | Unauthenticated

  type FileSuccess implements Success {
    message: String!
    file: File
  }

  type FileNotFound implements BusinessError {
    message: String!
    statusCode: Int!
  }
`;
