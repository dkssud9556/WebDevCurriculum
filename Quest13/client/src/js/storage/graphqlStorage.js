class GraphqlStorage {
  static #url = "http://localhost:8000/graphql";
  static #request(query) {
    return fetch(this.#url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ query }),
    });
  }

  async login({ username, password }) {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (result.data.login.__typename !== "LoginSuccess") {
      throw result;
    }
  }

  async getFileContentByName(fileName) {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (result.data.file.__typename !== "FileSuccess") {
      throw result;
    }
    return result.data.file.file.content;
  }

  async getFileNames() {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (result.data.files.__typename !== "FilesSuccess") {
      throw result;
    }
    return result.data.files.files.map((file) => file.fileName);
  }

  async isExistsFileName(fileName) {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (result.data.file.__typename !== "FileSuccess") {
      throw result;
    }
    return !!result.data.file.file;
  }

  async logout() {
    const response = await GraphqlStorage.#request(
      `
        mutation {
          logout {
            __typename
            ... on LogoutSuccess {
              message
            }
          }
        }
      `
    );
    const result = await response.json();
    if (result.data.logout.__typename !== "LogoutSuccess") {
      throw result;
    }
  }

  async saveNewFile(tabInfo) {
    const response = await GraphqlStorage.#request(
      `
        mutation {
          saveFile(fileName: "${tabInfo.fileName}", content: "${tabInfo.content}") {
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
      `
    );
    const result = await response.json();
    if (result.data.saveFile.__typename !== "SaveFileSuccess") {
      throw result;
    }
  }

  async save({ fileName, content }) {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (
      result.data.updateFileContent.__typename !== "UpdateFileContentSuccess"
    ) {
      throw result;
    }
  }

  async deleteFile(fileName) {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (result.data.deleteFile.__typename !== "DeleteFileSuccess") {
      throw result;
    }
  }

  async updateFileName({ fileName, newFileName }) {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (result.data.renameFile.__typename !== "RenameFileSuccess") {
      throw result;
    }
  }

  async getTabs() {
    const response = await GraphqlStorage.#request(
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
      `
    );
    const result = await response.json();
    if (result.data.tabs.__typename !== "TabsSuccess") {
      throw result;
    }
    return result.data.tabs.tabs;
  }

  async updateTabStatus({ openTabs, selectedTab }) {
    const response = await GraphqlStorage.#request(
      `
        mutation {
          updateTabs(openTabs: ${JSON.stringify(
            openTabs
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
      `
    );
    const result = await response.json();
    if (result.data.updateTabs.__typename !== "UpdateTabsSuccess") {
      throw result;
    }
  }
}
