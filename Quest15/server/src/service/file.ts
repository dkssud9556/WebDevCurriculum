import FileNameConflictError from '@error/fileNameConflict';
import FileNotFoundError from '@error/fileNotFound';
import FileRepository from '@repository/file';
import { Service } from 'typedi';

@Service()
export default class FileService {
  private readonly fileRepository: FileRepository;

  constructor(fileRepository: FileRepository) {
    this.fileRepository = fileRepository;
  }

  async getFiles(username: string) {
    return this.fileRepository.findAllByUsername(username);
  }

  async getFile({ username, fileName }: { username: string, fileName: string }) {
    return this.fileRepository.findByPk({
      username,
      fileName,
    });
  }

  async getFilesIn(usernames: readonly string[]) {
    return this.fileRepository.findAllIn(usernames as string[]);
  }

  async saveFile(fileInfo: { username: string, fileName: string, content: string }) {
    const { fileName, username, content } = fileInfo;
    if (
      await this.fileRepository.existsByPk({
        fileName,
        username,
      })
    ) {
      throw new FileNameConflictError();
    }
    await this.fileRepository.save({ username, fileName, content });
  }

  async updateFile(updateInfo: { username: string, fileName: string, content: string }) {
    const { fileName, username, content } = updateInfo;
    if (
      !(await this.fileRepository.existsByPk({
        fileName,
        username,
      }))
    ) {
      throw new FileNotFoundError();
    }
    await this.fileRepository.save({ username, fileName, content });
  }

  async deleteFile({ username, fileName }: { username: string, fileName: string }) {
    if (
      !(await this.fileRepository.existsByPk({
        username,
        fileName,
      }))
    ) {
      throw new FileNotFoundError();
    }
    await this.fileRepository.deleteByPk({
      username,
      fileName,
    });
  }

  async renameFile(renameInfo: { username: string, fileName: string, newFileName: string }) {
    const { username, fileName, newFileName } = renameInfo;
    if (
      !(await this.fileRepository.existsByPk({
        username,
        fileName,
      }))
    ) {
      throw new FileNotFoundError();
    }
    if (
      await this.fileRepository.existsByPk({
        fileName: newFileName,
        username,
      })
    ) {
      throw new FileNameConflictError();
    }
    await this.fileRepository.updateFileName({
      username,
      fileName,
      newFileName,
    });
  }
}
