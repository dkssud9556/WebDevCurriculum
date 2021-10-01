export default interface Storage {
  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void>;
  getFileContentByName(fileName: string): Promise<string>;
  getFileNames(): Promise<string[]>;
  isExistsFileName(fileName: string): Promise<boolean>;
  logout(): Promise<void>;
  saveNewFile(file: { fileName: string; content: string }): Promise<void>;
  save({
    fileName,
    content,
  }: {
    fileName: string;
    content: string;
  }): Promise<void>;
  deleteFile(fileName: string): Promise<void>;
  updateFileName({
    fileName,
    newFileName,
  }: {
    fileName: string;
    newFileName: string;
  }): Promise<void>;
  getTabs(): Promise<{ fileName: string; isSelected: boolean }[]>;
  updateTabStatus({
    openTabs,
    selectedTab,
  }: {
    openTabs: string[];
    selectedTab: string;
  }): Promise<void>;
}
