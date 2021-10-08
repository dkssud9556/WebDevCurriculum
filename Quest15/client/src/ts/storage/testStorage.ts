import Storage from "./index";
import BusinessError from "../error/businessError";

export default class TestStorage implements Storage {
    private users = {
        'user1': { password: 'pass1', files: [] },
        'user2': { password: 'pass2', files: [] },
        'user3': { password: 'pass3', files: [] }
    };

    async deleteFile(fileName: string): Promise<void> {
        TestStorage.checkAuth();
        const username = TestStorage.getUsername() as string;
        const index = this.users[username].files.find(file => file.fileName === fileName);
        if (index === -1) {
            throw new BusinessError('File not found', 404);
        }
        this.users[username].files.splice(index, 1);
    }

    async getFileContentByName(fileName: string): Promise<string> {
        TestStorage.checkAuth();
        const username = TestStorage.getUsername() as string;
        return this.users[username].files.find(file => file.fileName === fileName).content ?? null;
    }

    async getFileNames(): Promise<string[]> {
        TestStorage.checkAuth();
        const username = TestStorage.getUsername() as string;
        return this.users[username].files.map(file => file.fileName);
    }

    async getTabs(): Promise<{ fileName: string; isSelected: boolean }[]> {
        TestStorage.checkAuth();
        const tabsString = localStorage.getItem('tabs');
        const selectedTab = localStorage.getItem('selectedTab');
        if (tabsString) {
            const tabs: string[] = JSON.parse(tabsString);
            return tabs.map(tab => ({ fileName: tab, isSelected: selectedTab ? selectedTab === tab : false }));
        }
        return [];
    }

    async isExistsFileName(fileName: string): Promise<boolean> {
        TestStorage.checkAuth();
        const username = TestStorage.getUsername() as string;
        return !!this.users[username].files.find(file => file.fileName === fileName);
    }

    async login({
              username,
              password,
          }: { username: string; password: string }): Promise<void> {
        const user = this.users[username];
        if (!user || user.password !== password) {
            throw new BusinessError('Invalid login info', 403);
        }
        localStorage.setItem('username', username);
    }

    async logout(): Promise<void> {
        localStorage.removeItem('username');
    }

    async save({
             fileName,
             content,
         }: { fileName: string; content: string }): Promise<void> {
        TestStorage.checkAuth();
        const username = TestStorage.getUsername() as string;
        const index = this.users[username].files.findIndex(files => file => file.fileName === fileName);
        if (index === -1) {
            throw new BusinessError('File not found', 404);
        }
        this.users[username].files[index].content = content;
    }

    async saveNewFile({ fileName, content }: { fileName: string; content: string }): Promise<void> {
        TestStorage.checkAuth();
        const username = TestStorage.getUsername() as string;
        if (this.users[username].files.find(file => file.fileName === fileName)) {
            throw new BusinessError('File name is conflict', 409);
        }
        this.users[username].files.push({ fileName, content });
    }

    async updateFileName({
                       fileName,
                       newFileName,
                   }: { fileName: string; newFileName: string }): Promise<void> {
        TestStorage.checkAuth();
        const username = TestStorage.getUsername() as string;
        const index = this.users[username].files.findIndex(file => file.fileName === fileName);
        if (index === -1) {
            throw new BusinessError('File not found', 404);
        }
        if (this.users[username].files.find(file => file.fileName === newFileName)) {
            throw new BusinessError('File name is conflict', 409);
        }
        this.users[username].files[index].fileName = newFileName;
    }

    async updateTabStatus({
                        openTabs,
                        selectedTab,
                    }: { openTabs: string[]; selectedTab: string | null }): Promise<void> {
        TestStorage.checkAuth();
        localStorage.setItem('tabs', JSON.stringify(openTabs));
        if (selectedTab) {
            localStorage.setItem('selectedTab', selectedTab);
        }
    }

    private static checkAuth() {
        if (!localStorage.getItem('username')) {
            throw new BusinessError('Unauthenticated', 403);
        }
    }

    private static getUsername() {
        return localStorage.getItem('username');
    }
}