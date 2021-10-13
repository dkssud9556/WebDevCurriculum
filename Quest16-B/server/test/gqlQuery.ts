import {gql} from "apollo-server-fastify";

export const filesQuery = gql`
    query {
        files {
            __typename
            ... on FilesSuccess {
                files {
                    fileName
                    content
                }
            }
            ... on BusinessError {
                statusCode
                message
            }
        }
    }
`;

export const fileQuery = (fileName: string) => gql`
    query {
        file(fileName: "${fileName}") {
            __typename
            ... on FileSuccess {
                message
                file {
                    fileName
                    content
                }
            }
            ... on BusinessError {
                message
                statusCode
            }
        }
    }   
`;

export const saveFileMutation = (fileInfo: { fileName: string, content: string }) => gql`
    mutation {
        saveFile(fileName: "${fileInfo.fileName}", content: "${fileInfo.content}") {
            __typename
            ... on SaveFileSuccess {
                message
            }
            ... on BusinessError {
                message
                statusCode
            }
        }
    }
`;

export const updateFileContentMutation = (fileInfo: { fileName: string, content: string }) => gql`
    mutation {
        updateFileContent(fileName: "${fileInfo.fileName}", content: "${fileInfo.content}") {
            __typename
            ... on UpdateFileContentSuccess {
                message
            }
            ... on BusinessError {
                message
                statusCode
            }
        }
    }
`;

export const deleteFileMutation = (fileName: string) => gql`
    mutation {
        deleteFile(fileName: "${fileName}") {
            __typename
            ... on DeleteFileSuccess {
                message
            }
            ... on BusinessError {
                message
                statusCode
            }
        }
    }
`;

export const renameFileMutation = (fileInfo: { fileName: string, newFileName: string }) => gql`
    mutation {
        renameFile(fileName: "${fileInfo.fileName}", newFileName: "${fileInfo.newFileName}") {
            __typename
            ... on RenameFileSuccess {
                message
            }
            ... on BusinessError {
                message
                statusCode
            }
        }
    }
`;