class LocalStorage {
  async saveNewFile(tabInfo) {
    const fileNames = localStorage.getItem("fileNames");
    if (!fileNames) {
      localStorage.setItem("fileNames", tabInfo.fileName);
    } else {
      localStorage.setItem("fileNames", `${fileNames}:${tabInfo.fileName}`);
    }
    await this.save(tabInfo);
  }

  async getFileContentByName(fileName) {
    return localStorage.getItem("file:" + fileName);
  }

  async save({ fileName, content }) {
    localStorage.setItem("file:" + fileName, content);
  }

  async getFileNames() {
    return localStorage.getItem("fileNames")?.split(":") ?? [];
  }

  async isExistsFileName(fileName) {
    return (await this.getFileNames()).find((v) => v === fileName);
  }

  async deleteFile(fileName) {
    let fileNames = await this.getFileNames();
    fileNames = fileNames.filter((v) => v !== fileName);
    localStorage.setItem("fileNames", fileNames.join(":"));
    localStorage.removeItem("file:" + fileName);
  }

  async updateFileName({ fileName, newFileName }) {
    await this.saveNewFile({
      fileName: newFileName,
      content: await this.getFileContentByName(fileName),
    });
    await this.deleteFile(fileName);
  }
}
