export interface FilePk {
    username: string;
    fileName: string;
}

export default class File {
    public fileName!: string;

    public username!: string;

    public content!: string;

    constructor(fileName: string, username: string, content: string) {
      this.fileName = fileName;
      this.username = username;
      this.content = content;
    }
}
