const baseUrl = "http://localhost:8000";

class ServerStorage {
  async saveNewFile(tabInfo) {
    const response = await fetch(`${baseUrl}/files`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(tabInfo),
      credentials: "include",
    });
    if (!response.ok) {
      throw response;
    }
  }

  async getFileContentByName(fileName) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/content`,
      { credentials: "include" }
    );
    if (response.ok) {
      return response.text();
    } else {
      throw response;
    }
  }

  async save({ fileName, content }) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/content`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw response;
    }
  }

  async getFileNames() {
    const response = await fetch(`${baseUrl}/files/name`, {
      credentials: "include",
    });
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  async isExistsFileName(fileName) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/existence`,
      { credentials: "include" }
    );
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  async deleteFile(fileName) {
    const response = await fetch(`${baseUrl}/files/${encodeURI(fileName)}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw response;
    }
  }

  async updateFileName({ fileName, newFileName }) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/file-name`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newFileName }),
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw response;
    }
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

  async getTabStatus() {
    const response = await fetch(`${baseUrl}/tabs`, { credentials: "include" });
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  async updateTabStatus({ openTabs, selectedTab }) {
    const response = await fetch(`${baseUrl}/tabs`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ openTabs, selectedTab }),
    });
    if (!response.ok) {
      throw response;
    }
  }

  async logout() {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw response;
    }
  }
}
