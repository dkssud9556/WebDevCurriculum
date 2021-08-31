import { existsSync, mkdirSync, writeFileSync } from "fs";
import fs from "fs/promises";
import path from "path";

const JSON_FOLDER_PATH = `${path.resolve()}/storage`;
const JSON_FILES_PATH = `${JSON_FOLDER_PATH}/files.json`;
const JSON_FILENAMES_PATH = `${JSON_FOLDER_PATH}/filenames.json`;

if (!existsSync(JSON_FOLDER_PATH)) {
  mkdirSync(JSON_FOLDER_PATH);
  writeFileSync(JSON_FILES_PATH, JSON.stringify({}));
  writeFileSync(JSON_FILENAMES_PATH, JSON.stringify([]));
}

class JsonFileRepository {
  async findByFileName(fileName) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    return {
      fileName,
      content: files[fileName],
    };
  }

  async findAllNames() {
    return this.#loadAsJson(JSON_FILENAMES_PATH);
  }

  async existsByFileName(fileName) {
    const fileNames = await this.#loadAsJson(JSON_FILENAMES_PATH);
    return fileNames.findIndex((v) => v === fileName) !== -1;
  }

  async save({ fileName, content }) {
    const fileNames = await this.#loadAsJson(JSON_FILENAMES_PATH);
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    fileNames.push(fileName);
    files[fileName] = content;
    await fs.writeFile(JSON_FILENAMES_PATH, JSON.stringify(fileNames));
    await fs.writeFile(JSON_FILES_PATH, JSON.stringify(files));
  }

  async updateByFileName({ fileName, content }) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    files[fileName] = content;
    await fs.writeFile(JSON_FILES_PATH, JSON.stringify(files));
  }

  async #loadAsJson(filePath) {
    const buffer = await fs.readFile(filePath);
    return JSON.parse(buffer.toString());
  }
}

export default new JsonFileRepository();
