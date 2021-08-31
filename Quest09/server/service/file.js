import fileRepository from "../repository/file/json.js";
import FileNameConflictError from "../error/fileNameConflict.js";
import FileNotFoundError from "../error/fileNotFound.js";

class FileService {
  #fileRepository;

  constructor(fileRepository) {
    this.#fileRepository = fileRepository;
  }

  async getFileNames() {
    return this.#fileRepository.findAllNames();
  }

  async exists(fileName) {
    return this.#fileRepository.existsByFileName(fileName);
  }

  async saveFile({ fileName, content }) {
    if (await this.#fileRepository.existsByFileName(fileName)) {
      throw new FileNameConflictError();
    }
    this.#fileRepository.save({ fileName, content });
  }

  async getContent(fileName) {
    const file = await this.#fileRepository.findByFileName(fileName);
    return file.content;
  }

  async updateFile({ fileName, content }) {
    if (!(await this.#fileRepository.existsByFileName(fileName))) {
      throw new FileNotFoundError();
    }
    await this.#fileRepository.updateByFileName({ fileName, content });
  }
}

export default new FileService(fileRepository);
