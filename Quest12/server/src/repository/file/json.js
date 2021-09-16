import { existsSync, mkdirSync, writeFileSync } from "fs";
import fs from "fs/promises";

import { users } from "../user/memory.js";
import { STORAGE_FOLDER_PATH, JSON_FILES_PATH } from "../../config.js";

if (!existsSync(STORAGE_FOLDER_PATH)) {
  mkdirSync(STORAGE_FOLDER_PATH);
  const initValue = {};
  users.forEach((user) => (initValue[user.username] = {}));
  writeFileSync(JSON_FILES_PATH, JSON.stringify(initValue));
}

class JsonFileRepository {
  async findByUsernameAndFileName({ username, fileName }) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    return files[username][fileName]
      ? { fileName, content: files[username][fileName] }
      : null;
  }

  async findAllNamesByUsername(username) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    return Object.keys(files[username]);
  }

  async existsByUsernameAndFileName({ username, fileName }) {
    const fileNames = await this.findAllNamesByUsername(username);
    return fileNames.findIndex((v) => v === fileName) !== -1;
  }

  async save({ username, fileName, content }) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    files[username][fileName] = content;
    await fs.writeFile(JSON_FILES_PATH, JSON.stringify(files));
  }

  async updateContent({ username, fileName, content }) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    files[username][fileName] = content;
    await fs.writeFile(JSON_FILES_PATH, JSON.stringify(files));
  }

  async deleteByUsernameAndFileName({ username, fileName }) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    delete files[username][fileName];
    await fs.writeFile(JSON_FILES_PATH, JSON.stringify(files));
  }

  async updateFileName({ username, fileName, newFileName }) {
    const files = await this.#loadAsJson(JSON_FILES_PATH);
    files[username][newFileName] = files[username][fileName];
    delete files[username][fileName];
  }

  async #loadAsJson(filePath) {
    const buffer = await fs.readFile(filePath);
    return JSON.parse(buffer.toString());
  }
}

export default new JsonFileRepository();
