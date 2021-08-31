const url = "http://localhost:8000";

class ServerStorage {
  async saveNewFile(tabInfo) {
    const response = await fetch(`${url}/files`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(tabInfo),
    });
    if (response.ok) {
      alert("저장 성공");
    }
  }

  async getFileContentByName(fileName) {
    const response = await fetch(`${url}/files/${fileName}/content`);
    if (response.ok) {
      return response.text();
    }
  }

  async save({ fileName, content }) {
    const response = await fetch(`${url}/files`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, content }),
    });
    if (response.ok) {
      alert("저장 성공");
    }
  }

  async getFileNames() {
    const response = await fetch(`${url}/files/name`);
    if (response.ok) {
      return response.json();
    }
  }

  async isExistsFileName(fileName) {
    const response = await fetch(`${url}/files/existence?fileName=${fileName}`);
    if (response.ok) {
      return response.json();
    }
  }
}
