import {ApolloServer} from "apollo-server-fastify";
import jwt from 'jsonwebtoken';
import {ApolloServerTestClient, createTestClient} from "apollo-server-integration-testing-fastify";
import {Container} from "typedi";

import config from "@src/config";
import {FileModel} from "@model/file";
import {UserModel} from "@model/user";
import sequelize from "@model/index";
import DummyCreator from "../dummyCreator";
import schema from "@schema/index";
import {filesLoader, tabsLoader, userLoader} from "@src/dataLoader";
import AuthService from "@service/auth";
import UserRepository from "@repository/user";
import FileRepository from "@repository/file";
import TabRepository from "@repository/tab";
import SequelizeUserRepository from "@repository/user/sequelize";
import SequelizeFileRepository from "@repository/file/sequelize";
import SequelizeTabRepository from "@repository/tab/sequelize";
import PasswordEncoder, {BcryptPasswordEncoder} from "@src/passwordEncoder";
import UserService from "@service/user";
import FileService from "@service/file";
import TabService from "@service/tab";
import {
    deleteFileMutation,
    fileQuery,
    filesQuery,
    renameFileMutation,
    saveFileMutation,
    updateFileContentMutation
} from "../gqlQuery";
import LogService, {EmptyLogger, Logger} from "@service/log";

describe('e2e test', () => {
    const users = DummyCreator.createUsers();
    const files = DummyCreator.createFiles();
    const token: string = jwt.sign({ username: users[0].username }, config.JWT_SECRET, { expiresIn: '7d' });
    let server: ApolloServer;
    let client: ApolloServerTestClient;
    let userRepository: UserRepository;
    let fileRepository: FileRepository;
    let tabRepository: TabRepository;
    let passwordEncoder: PasswordEncoder;
    let logger: Logger;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        userRepository = Container.get(SequelizeUserRepository);
        fileRepository = Container.get(SequelizeFileRepository);
        tabRepository = Container.get(SequelizeTabRepository);
        passwordEncoder = Container.get(BcryptPasswordEncoder);
        logger = new EmptyLogger();
        server = new ApolloServer({
            schema,
            context: ({ request, reply }) => {
                return {
                    loaders: {
                        userLoader: userLoader(),
                        filesLoader: filesLoader(),
                        tabsLoader: tabsLoader()
                    },
                    services: {
                        authService: new AuthService(userRepository, passwordEncoder),
                        userService: new UserService(userRepository),
                        fileService: new FileService(fileRepository),
                        tabService: new TabService(tabRepository),
                        logService: new LogService(logger)
                    },
                    reply,
                    token
                }
            }
        });
        client = await createTestClient({
            apolloServer: server
        });
    });

    beforeEach(async () => {
        await FileModel.truncate();
        await UserModel.truncate();
        await UserModel.bulkCreate(users);
        await FileModel.bulkCreate(files);
    });

    test('files query', async () => {
        const response = await client.query({
          query: filesQuery
        });
        const body = JSON.parse(response.body)

        expect(body.data.files.__typename).toEqual('FilesSuccess');
        expect(body.data.files.files).toHaveLength(2);
    });

    test('file query', async () => {
        const response = await client.query({
            query: fileQuery('file1')
        });
        const body = JSON.parse(response.body);

        expect(body.data.file.__typename).toEqual('FileSuccess');
        expect(body.data.file.file).toBeDefined();
    });

    test('saveFile mutation', async () => {
        const username = users[0].username;
        const fileInfo = { fileName: 'file4', content: 'content' };
        const response = await client.query({
            query: saveFileMutation(fileInfo)
        });
        const body = JSON.parse(response.body);

        expect(body.data.saveFile.__typename).toEqual('SaveFileSuccess');
        const storedFile = await FileModel.findOne({
            where: {
                fileName: fileInfo.fileName,
                username
            }
        });
        expect(storedFile?.username).toEqual(users[0].username);
        expect(storedFile?.fileName).toEqual(fileInfo.fileName);
        expect(storedFile?.content).toEqual(fileInfo.content);
    });

    test('updateFileContent mutation', async () => {
        const username = users[0].username;
        const fileInfo = { fileName: files[0].fileName, content: 'changedContent' };
        const response = await client.query({
            query: updateFileContentMutation(fileInfo)
        });
        const body = JSON.parse(response.body);

        expect(body.data.updateFileContent.__typename).toEqual('UpdateFileContentSuccess');
        const updatedFile = await FileModel.findOne({
            where: {
                fileName: fileInfo.fileName,
                username
            }
        });
        expect(updatedFile?.username).toEqual(users[0].username);
        expect(updatedFile?.fileName).toEqual(fileInfo.fileName);
        expect(updatedFile?.content).toEqual(fileInfo.content);
    });

    test('deleteFile mutation', async () => {
        const fileName = files[0].fileName;
        const username = users[0].username;
        const response = await client.query({
            query: deleteFileMutation(fileName)
        });
        const body = JSON.parse(response.body);

        expect(body.data.deleteFile.__typename).toEqual('DeleteFileSuccess');
        const deletedFile = await FileModel.findOne({
            where: {
                fileName,
                username
            }
        });
        expect(deletedFile).toBeNull();
    });

    test('renameFile mutation', async () => {
        const username = users[0].username;
        const content = files[0].content;
        const fileInfo = { fileName: files[0].fileName, newFileName: 'file4' };
        const response = await client.query({
            query: renameFileMutation(fileInfo)
        });
        const body = JSON.parse(response.body);
        console.log(body)
        expect(body.data.renameFile.__typename).toEqual('RenameFileSuccess');
        const renamedFile = await FileModel.findOne({
            where: {
                username,
                fileName: fileInfo.newFileName
            }
        });
        expect(renamedFile?.username).toEqual(username);
        expect(renamedFile?.fileName).toEqual(fileInfo.newFileName);
        expect(renamedFile?.content).toEqual(content);
    });
});