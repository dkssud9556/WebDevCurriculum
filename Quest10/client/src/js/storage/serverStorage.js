const baseUrl = "http://localhost:8000";

class ServerStorage {
  async saveNewFile(tabInfo) {
    await fetch(`${baseUrl}/files`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(tabInfo),
      credentials: "include",
    });
  }

  async getFileContentByName(fileName) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/content`,
      { credentials: "include" }
    );
    if (response.ok) {
      return response.text();
    }
  }

  async save({ fileName, content }) {
    await fetch(`${baseUrl}/files/${encodeURI(fileName)}/content`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
      credentials: "include",
    });
  }

  async getFileNames() {
    const response = await fetch(`${baseUrl}/files/name`, {
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    }
  }

  async isExistsFileName(fileName) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/existence`,
      { credentials: "include" }
    );
    if (response.ok) {
      return response.json();
    }
  }

  async deleteFile(fileName) {
    await fetch(`${baseUrl}/files/${encodeURI(fileName)}`, {
      method: "DELETE",
      credentials: "include",
    });
  }

  async updateFileName({ fileName, newFileName }) {
    await fetch(`${baseUrl}/files/${encodeURI(fileName)}/file-name`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newFileName }),
      credentials: "include",
    });
  }

  async login({ username, password }) {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    if (!response.ok) {
      throw response;
    }
  }
}
