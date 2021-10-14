import {Container} from "typedi";

import FileService from "@service/file";
import FileRepository from "@repository/file";
import SequelizeFileRepository from "@repository/file/sequelize";
import FileNameConflictError from "@error/fileNameConflict";
import FileNotFoundError from "@error/fileNotFound";

const createFile = () => ({ username: 'user1', fileName: 'file1', content: 'content' });

describe('File service unit test', () => {
    let fileService: FileService;
    let fileRepository: FileRepository;

    beforeAll(() => {
        fileRepository = Container.get(SequelizeFileRepository);
        fileService = new FileService(fileRepository);
    })

    describe('saveFile method', () => {
        test('saveFile success', async () => {
            const file = createFile();
            (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(false);
            (fileRepository.save as jest.Mock) = jest.fn();

            await fileService.saveFile(file);
        });

        describe('saveFile fail', () => {
            test('file name is conflict', async () => {
                const file = createFile();
                (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(true);
                (fileRepository.save as jest.Mock) = jest.fn();

                await expect(fileService.saveFile(file)).rejects.toThrow(new FileNameConflictError());
            })
        });
    });

    describe('updateFile method', () => {
        test('updateFile success', async () => {
            const file = createFile();
            (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(true);
            (fileRepository.save as jest.Mock) = jest.fn();

            await fileService.updateFile(file);
        });

        describe('updateFile fail', () => {
            test('file is not found', async () => {
                const file = createFile();
                (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(false);
                (fileRepository.save as jest.Mock) = jest.fn();

                await expect(fileService.updateFile(file)).rejects.toThrow(new FileNotFoundError());
            });
        });
    });

    describe('deleteFile method', () => {
        test('deleteFile success', async () => {
            const file = createFile();
            (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(true);
            (fileRepository.deleteByPk as jest.Mock) = jest.fn();

            await fileService.deleteFile(file);
        });

        describe('deleteFile fail', () => {
            test('file is not found', async () => {
                const file = createFile();
                (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(false);
                (fileRepository.deleteByPk as jest.Mock) = jest.fn();

                await expect(fileService.deleteFile(file)).rejects.toThrow(new FileNotFoundError());
            })
        })
    });

    describe('renameFile method', () => {
        test('renameFile success', async () => {
            const file = { username: 'user1', fileName: 'file1', newFileName: 'file2' };
            (fileRepository.existsByPk as jest.Mock) = jest.fn().mockImplementation(({ username, fileName }) => {
                return new Promise((resolve, reject) => {
                    if (fileName === file.fileName) {
                        resolve(true);
                    } else if (fileName === file.newFileName) {
                        resolve(false);
                    }
                });
            });
            (fileRepository.updateFileName as jest.Mock) = jest.fn();

            await fileService.renameFile(file);
        });

        describe('renameFile fail', () => {
            test('file name is not found', async () => {
                const file = { username: 'user1', fileName: 'file1', newFileName: 'file2' };
                (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(false);
                (fileRepository.updateFileName as jest.Mock) = jest.fn();

                await expect(fileService.renameFile(file)).rejects.toThrow(new FileNotFoundError());
            });

            test('new file name is conflict', async () => {
                const file = { username: 'user1', fileName: 'file1', newFileName: 'file2' };
                (fileRepository.existsByPk as jest.Mock) = jest.fn().mockResolvedValue(true);
                (fileRepository.updateFileName as jest.Mock) = jest.fn();

                await expect(fileService.renameFile(file)).rejects.toThrow(new FileNameConflictError());
            })
        })
    })
});