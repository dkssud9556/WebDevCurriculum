import fileRepository from "../repository/file/json.js";
import userRepository from "../repository/user/memory.js";
import FileNameConflictError from "../error/fileNameConflict.js";
import FileNotFoundError from "../error/fileNotFound.js";

class FileService {
  #fileRepository;
  #userRepository;

  constructor(fileRepository, userRepository) {
    this.#fileRepository = fileRepository;
    this.#userRepository = userRepository;
  }

  async getFileNames(username) {
    return this.#fileRepository.findAllNamesByUsername(username);
  }

  async exists({ username, fileName }) {
    return this.#fileRepository.existsByUsernameAndFileName({
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

  async getContent({ username, fileName }) {
    const file = await this.#fileRepository.findByUsernameAndFileName({
      username,
      fileName,
    });
    if (!file) {
      throw new FileNotFoundError();
    }
    return file.content;
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
