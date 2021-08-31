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
    const filesBuffer = await fs.readFile(JSON_FILES_PATH);
    const files = JSON.parse(filesBuffer.toString());
    return {
      fileName,
      content: files[fileName],
    };
  }

  async findAllNames() {
    const fileNamesBuffer = await fs.readFile(JSON_FILENAMES_PATH);
    return JSON.parse(fileNamesBuffer.toString());
  }

  async existsByFileName(fileName) {
    const fileNamesBuffer = await fs.readFile(JSON_FILENAMES_PATH);
    const fileNames = JSON.parse(fileNamesBuffer.toString());
    return fileNames.findIndex((v) => v === fileName) !== -1;
  }

  async save({ fileName, content }) {
    const fileNamesBuffer = await fs.readFile(JSON_FILENAMES_PATH);
    const filesBuffer = await fs.readFile(JSON_FILES_PATH);
    const fileNames = JSON.parse(fileNamesBuffer.toString());
    const files = JSON.parse(filesBuffer.toString());
    fileNames.push(fileName);
    files[fileName] = content;
    await fs.writeFile(JSON_FILENAMES_PATH, JSON.stringify(fileNames));
    await fs.writeFile(JSON_FILES_PATH, JSON.stringify(files));
  }

  async updateByFileName({ fileName, content }) {
    const filesBuffer = await fs.readFile(JSON_FILES_PATH);
    const files = JSON.parse(filesBuffer.toString());
    files[fileName] = content;
    await fs.writeFile(JSON_FILES_PATH, JSON.stringify(files));
  }
}

export default new JsonFileRepository();
