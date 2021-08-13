class LocalStorage {
  saveAndUpdateFileNames(tabInfo) {
    this.save(tabInfo);
    this.updateFileNames(tabInfo.fileName);
  }

  getFileContentByName(fileName) {
    return localStorage.getItem('file:' + fileName);
  }

  save({fileName, content}) {
    localStorage.setItem('file:' + fileName, content);
  }

  updateFileNames(fileName) {
    if (!localStorage.getItem('fileNames')) {
      return localStorage.setItem('fileNames', fileName);
    }
    localStorage.setItem('fileNames', localStorage.getItem('fileNames') + ':' + fileName);
  }

  getFileNames() {
    return localStorage.getItem('fileNames')?.split(':') ?? [];
  }

  isExistsFileName(fileName) {
    return this.getFileNames().find(v => v === fileName);
  }
}