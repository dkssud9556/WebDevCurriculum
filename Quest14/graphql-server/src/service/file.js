import { fileRepository, userRepository } from "../repository/index.js";
import FileNameConflictError from "../error/fileNameConflict.js";
import FileNotFoundError from "../error/fileNotFound.js";

class FileService {
  #fileRepository;
  #userRepository;

  constructor(fileRepository, userRepository) {
    this.#fileRepository = fileRepository;
    this.#userRepository = userRepository;
  }

  async getFiles(username) {
    return this.#fileRepository.findAllByUsername(username);
  }

  async getFile({ username, fileName }) {
    return this.#fileRepository.findByUsernameAndFileName({
      username,
      fileName,
    });
  }

  async saveFile({ username, fileName, content }) {
    if (
      await this.#fileRepository.existsByUsernameAndFileName({
        fileName,
        username,
      })
    ) {
      throw new FileNameConflictError();
    }
    this.#fileRepository.save({ username, fileName, content });
  }

  async updateFile({ username, fileName, content }) {
    if (
      !(await this.#fileRepository.existsByUsernameAndFileName({
        fileName,
        username,
      }))
    ) {
      throw new FileNotFoundError();
    }
    await this.#fileRepository.updateContent({ username, fileName, content });
  }

  async deleteFile({ username, fileName }) {
    if (
      !(await this.#fileRepository.existsByUsernameAndFileName({
        username,
        fileName,
      }))
    ) {
      throw new FileNotFoundError();
    }
    await this.#fileRepository.deleteByUsernameAndFileName({
      username,
      fileName,
    });
  }

  async renameFile({ username, fileName, newFileName }) {
    if (
      !(await this.#fileRepository.existsByUsernameAndFileName({
        username,
        fileName,
      }))
    ) {
      throw new FileNotFoundError();
    }
    if (
      await this.#fileRepository.existsByUsernameAndFileName({
        fileName: newFileName,
        username,
      })
    ) {
      throw new FileNameConflictError();
    }
    await this.#fileRepository.updateFileName({
      username,
      fileName,
      newFileName,
    });
  }
}

export default new FileService(fileRepository, userRepository);
