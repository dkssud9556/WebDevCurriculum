import BusinessError from '../error/businessError';
import InternalServerError from '../error/internalServerError';
import Storage from './index';

export default class GraphqlStorage implements Storage {
  private static url = 'http://localhost:8000/graphql';

  private static async request(queryName, query) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ query }),
    });
    if (response.status === 400) {
      throw new BusinessError('Invalid parameter', 400);
    }
    const data = await response.json();
    if (
      !data.data[queryName].__typename
      || !data.data[queryName].__typename.endsWith('Success')
    ) {
      if (data.data[queryName].__typename) {
        throw new BusinessError(
          data.data[queryName].message,
          data.data[queryName].statusCode,
        );
      }
      throw new InternalServerError();
    }
    return data;
  }

  async deleteFile(fileName: string): Promise<void> {
    await GraphqlStorage.request(
      'deleteFile',
      `
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
      `,
    );
  }

  async getFileContentByName(fileName: string): Promise<string> {
    const data = await GraphqlStorage.request(
      'file',
      `
        query {
          file(fileName: "${fileName}") {
            __typename
            ... on FileSuccess {
              message
              file {
                content
              }
            }
            ... on BusinessError {
              message
              statusCode
            }
          }
        }
      `,
    );
    return data.data.file.file.content;
  }

  async getFileNames(): Promise<string[]> {
    const data = await GraphqlStorage.request(
      'files',
      `
        query {
          files {
            __typename
            ... on FilesSuccess {
              message
              files {
                fileName
              }
            }
            ... on BusinessError {
              message
              statusCode
            }
          }
        }
      `,
    );
    return data.data.files.files.map((file) => file.fileName);
  }

  async getTabs(): Promise<{ fileName: string; isSelected: boolean }[]> {
    const data = await GraphqlStorage.request(
      'tabs',
      `
        query {
          tabs {
            __typename
            ... on TabsSuccess {
              message
              tabs {
                fileName
                isSelected
              }
            }
            ... on BusinessError {
              message
              statusCode
            }
          }
        }
      `,
    );
    return data.data.tabs.tabs;
  }

  async isExistsFileName(fileName: string): Promise<boolean> {
    const data = await GraphqlStorage.request(
      'file',
      `
        query {
          file(fileName: "${fileName}") {
            __typename
            ... on FileSuccess {
              message
              file {
                content
              }
            }
            ... on BusinessError {
              message
              statusCode
            }
          }
        }
      `,
    );
    return !!data.data.file.file;
  }

  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    await GraphqlStorage.request(
      'login',
      `
        mutation {
          login(username: "${username}", password: "${password}") {
            __typename,
            ... on LoginSuccess {
              message
            }
            ... on BusinessError {
              message
              statusCode
            }
          }
        }
      `,
    );
  }

  async logout(): Promise<void> {
    await GraphqlStorage.request(
      'logout',
      `
        mutation {
          logout {
            __typename
            ... on LogoutSuccess {
              message
            }
          }
        }
      `,
    );
  }

  async save({
    fileName,
    content,
  }: {
    fileName: string;
    content: string;
  }): Promise<void> {
    await GraphqlStorage.request(
      'updateFileContent',
      `
        mutation {
          updateFileContent(fileName: "${fileName}", content: "${content}") {
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
      `,
    );
  }

  async saveNewFile(file: {
    fileName: string;
    content: string;
  }): Promise<void> {
    await GraphqlStorage.request(
      'saveFile',
      `
        mutation {
          saveFile(fileName: "${file.fileName}", content: "${file.content}") {
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
      `,
    );
  }

  async updateFileName({
    fileName,
    newFileName,
  }: {
    fileName: string;
    newFileName: string;
  }): Promise<void> {
    await GraphqlStorage.request(
      'renameFile',
      `
        mutation {
          renameFile(fileName: "${fileName}", newFileName: "${newFileName}") {
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
      `,
    );
  }

  async updateTabStatus({
    openTabs,
    selectedTab,
  }: {
    openTabs: string[];
    selectedTab: string | null;
  }): Promise<void> {
    await GraphqlStorage.request(
      'updateTabs',
      `
        mutation {
          updateTabs(openTabs: ${JSON.stringify(
    openTabs,
  )}, selectedTab: "${selectedTab}") {
            __typename
            ... on UpdateTabsSuccess {
              message
            }
            ... on BusinessError {
              message
              statusCode
            }
          }
        }
      `,
    );
  }
}
