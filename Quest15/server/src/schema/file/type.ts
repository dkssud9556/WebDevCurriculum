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

  union SaveFileResult = SaveFileSuccess | Unauthenticated | FileNameConflict

  type SaveFileSuccess implements Success {
    message: String!
  }

  type FileNameConflict implements BusinessError {
    message: String!
    statusCode: Int!
  }

  union UpdateFileContentResult =
      UpdateFileContentSuccess
    | Unauthenticated
    | FileNotFound

  type UpdateFileContentSuccess implements Success {
    message: String!
  }

  union DeleteFileResult = DeleteFileSuccess | Unauthenticated | FileNotFound

  type DeleteFileSuccess implements Success {
    message: String!
  }

  union RenameFileResult =
      RenameFileSuccess
    | Unauthenticated
    | FileNotFound
    | FileNameConflict

  type RenameFileSuccess implements Success {
    message: String!
  }
`;
