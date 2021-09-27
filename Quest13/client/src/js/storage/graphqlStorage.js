class GraphqlStorage {
  static #url = "http://localhost:8000/graphql";
  static async #request(queryName, query) {
    const response = await fetch(this.#url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    if (
      !data.data[queryName].__typename ||
      !data.data[queryName].__typename.endsWith("Success")
    ) {
      if (data.data[queryName].__typename) {
        throw new BusinessError(
          data.data[queryName].message,
          data.data[queryName].statusCode
        );
      }
      throw new InternalServerError();
    }
    return data;
  }

  async login({ username, password }) {
    await GraphqlStorage.#request(
      "login",
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
  }

  async getFileContentByName(fileName) {
    const data = await GraphqlStorage.#request(
      "file",
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
    return data.data.file.file.content;
  }

  async getFileNames() {
    const data = await GraphqlStorage.#request(
      "files",
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
    return data.data.files.files.map((file) => file.fileName);
  }

  async isExistsFileName(fileName) {
    const data = await GraphqlStorage.#request(
      "file",
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
    return !!data.data.file.file;
  }

  async logout() {
    await GraphqlStorage.#request(
      "logout",
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
  }

  async saveNewFile(tabInfo) {
    await GraphqlStorage.#request(
      "saveFile",
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
  }

  async save({ fileName, content }) {
    await GraphqlStorage.#request(
      "updateFileContent",
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
  }

  async deleteFile(fileName) {
    await GraphqlStorage.#request(
      "deleteFile",
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
  }

  async updateFileName({ fileName, newFileName }) {
    await GraphqlStorage.#request(
      "renameFile",
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
  }

  async getTabs() {
    const data = await GraphqlStorage.#request(
      "tabs",
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
    return data.data.tabs.tabs;
  }

  async updateTabStatus({ openTabs, selectedTab }) {
    await GraphqlStorage.#request(
      "updateTabs",
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
  }
}
