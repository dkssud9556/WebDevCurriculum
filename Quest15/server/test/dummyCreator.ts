export default class DummyCreator {
    static createUsers() {
        return [
            { username: 'user1', password: 'pass1' },
            { username: 'user2', password: 'pass2' },
            { username: 'user3', password: 'pass3' }
        ];
    }

    static createFiles() {
        return [
            { username: 'user1', fileName: 'file1', content: 'content' },
            { username: 'user1', fileName: 'file2', content: 'content' },
            { username: 'user2', fileName: 'file1', content: 'content' },
            { username: 'user2', fileName: 'file2', content: 'content' }
        ];
    }
}