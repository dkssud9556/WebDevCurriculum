import {Container} from "typedi";

import FileService from "@service/file";
import FileRepository from "@repository/file";
import SequelizeFileRepository from "@repository/file/sequelize";
import {FileModel} from "@model/file";
import sequelize from "@model/index";
import {UserModel} from "@model/user";
import DummyCreator from "../../dummyCreator";

describe('File service integration test', () => {
    const users = DummyCreator.createUsers();
    const files = DummyCreator.createFiles();
    let fileService: FileService;
    let fileRepository: FileRepository;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        fileRepository = Container.get(SequelizeFileRepository);
        fileService = new FileService(fileRepository);
    });

    beforeEach(async () => {
        await FileModel.truncate();
        await UserModel.truncate();
        await UserModel.bulkCreate(users);
        await FileModel.bulkCreate(files);
    });

    describe('getFiles method', () => {
        test('getFiles in common situation', async () => {
            const username = users[0].username;
            const storedFiles = await fileService.getFiles(username);

            expect(storedFiles).toBeDefined();
            expect(storedFiles).toHaveLength(files.filter(file => file.username === username).length);
        });

        test('getFiles when user has no post', async () => {
            const username = users[2].username;
            const storedFiles = await fileService.getFiles(username);

            expect(storedFiles).toBeDefined();
            expect(storedFiles).toHaveLength(files.filter(file => file.username === username).length);
        });

        test('getFiles when nonexistent username is queried', async () => {
            const username = 'user4';
            const storedFiles = await fileService.getFiles(username);

            expect(storedFiles).toBeDefined();
            expect(storedFiles).toHaveLength(0);
        });
    });

    describe('getFile method', () => {
        test('getFile in common situation', async () => {
            const fileInfo = { username: files[0].username, fileName: files[0].fileName };
            const storedFile = await fileService.getFile(fileInfo);

            expect(storedFile).toBeDefined();
            expect(storedFile).toEqual(files[0]);
        });

        test('getFile when nonexistent username is queried', async () => {
           const fileInfo = { username: 'user4', fileName: 'file4' };
           const storedFile = await fileService.getFile(fileInfo);

           expect(storedFile).toBeNull();
        });
    });

    describe('getFilesIn method', () => {
        test('getFilesIn in common situation', async () => {
            await FileModel.create({ username: users[2].username, fileName: 'file1', content: 'content' });
           const usernames = [users[0].username, users[1].username];
           const storedFiles = await fileService.getFilesIn(usernames);

           expect(storedFiles).toBeDefined();
           expect(storedFiles).toHaveLength(4);
        });
    })
});