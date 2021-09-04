const baseUrl = "http://localhost:8000";

class ServerStorage {
  async saveNewFile(tabInfo) {
    await fetch(`${baseUrl}/files`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(tabInfo),
    });
  }

  async getFileContentByName(fileName) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/content`
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
    });
  }

  async getFileNames() {
    const response = await fetch(`${baseUrl}/files/name`);
    if (response.ok) {
      return response.json();
    }
  }

  async isExistsFileName(fileName) {
    const response = await fetch(
      `${baseUrl}/files/${encodeURI(fileName)}/existence`
    );
    if (response.ok) {
      return response.json();
    }
  }

  async deleteFile(fileName) {
    await fetch(`${baseUrl}/files/${encodeURI(fileName)}`, {
      method: "DELETE",
    });
  }

  async updateFileName({ fileName, newFileName }) {
    await fetch(`${baseUrl}/files/${encodeURI(fileName)}/file-name`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newFileName }),
    });
  }
}
