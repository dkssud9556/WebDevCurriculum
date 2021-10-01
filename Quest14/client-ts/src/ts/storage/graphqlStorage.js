const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P((resolve) => { resolve(value); }); }
  return new (P || (P = Promise))((resolve, reject) => {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class GraphqlStorage {
  static request(queryName, query) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield fetch(this.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query }),
      });
      if (response.status === 400) {
        throw new BusinessError('Invalid parameter', 400);
      }
      const data = yield response.json();
      if (!data.data[queryName].__typename
                || !data.data[queryName].__typename.endsWith('Success')) {
        if (data.data[queryName].__typename) {
          throw new BusinessError(data.data[queryName].message, data.data[queryName].statusCode);
        }
        throw new InternalServerError();
      }
      return data;
    });
  }

  deleteFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
      yield GraphqlStorage.request('deleteFile', `
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
      `);
    });
  }

  getFileContentByName(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = yield GraphqlStorage.request('file', `
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
      `);
      return data.data.file.file.content;
    });
  }

  getFileNames() {
    return __awaiter(this, void 0, void 0, function* () {
      const data = yield GraphqlStorage.request('files', `
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
      `);
      return data.data.files.files.map((file) => file.fileName);
    });
  }

  getTabs() {
    return __awaiter(this, void 0, void 0, function* () {
      const data = yield GraphqlStorage.request('tabs', `
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
      `);
      return data.data.tabs.tabs;
    });
  }

  isExistsFileName(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = yield GraphqlStorage.request('file', `
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
      `);
      return !!data.data.file.file;
    });
  }

  login({ username, password }) {
    return __awaiter(this, void 0, void 0, function* () {
      yield GraphqlStorage.request('login', `
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
      `);
    });
  }

  logout() {
    return __awaiter(this, void 0, void 0, function* () {
      yield GraphqlStorage.request('logout', `
        mutation {
          logout {
            __typename
            ... on LogoutSuccess {
              message
            }
          }
        }
      `);
    });
  }

  save({ fileName, content }) {
    return __awaiter(this, void 0, void 0, function* () {
      yield GraphqlStorage.request('updateFileContent', `
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
      `);
    });
  }

  saveNewFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
      yield GraphqlStorage.request('saveFile', `
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
      `);
    });
  }

  updateFileName({ fileName, newFileName }) {
    return __awaiter(this, void 0, void 0, function* () {
      yield GraphqlStorage.request('renameFile', `
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
      `);
    });
  }

  updateTabStatus({ openTabs, selectedTab }) {
    return __awaiter(this, void 0, void 0, function* () {
      yield GraphqlStorage.request('updateTabs', `
        mutation {
          updateTabs(openTabs: ${JSON.stringify(openTabs)}, selectedTab: "${selectedTab}") {
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
      `);
    });
  }
}
GraphqlStorage.url = 'http://localhost:8000/graphql';
// # sourceMappingURL=graphqlStorage.js.map
