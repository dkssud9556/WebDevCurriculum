export interface TabPk {
    username: string;
    fileName: string;
}

export default class Tab {
    public fileName: string;

    public username: string;

    public isSelected: boolean;

    constructor(fileName: string, username: string, isSelected: boolean) {
      this.fileName = fileName;
      this.username = username;
      this.isSelected = isSelected;
    }
}
