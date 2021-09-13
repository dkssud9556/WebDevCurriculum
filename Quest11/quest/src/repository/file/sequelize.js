import sequelize from "../../model/index.js";

class SequelizeFileRepository {
  #FileModel;

  constructor(FileModel) {
    this.#FileModel = FileModel;
  }

  async findByUsernameAndFileName({ username, fileName }) {
    return this.#FileModel.findOne({ where: { username, name: fileName } });
  }

  async findAllNamesByUsername(username) {
    const files = await this.#FileModel.findAll({
      where: { username },
      attributes: ["name"],
    });
    return files.map((file) => file.name);
  }

  async existsByUsernameAndFileName({ username, fileName }) {
    const fileNames = await this.findAllNamesByUsername(username);
    return fileNames.findIndex((v) => v === fileName) !== -1;
  }

  async save({ username, fileName, content }) {
    const file = await this.findByUsernameAndFileName({ username, fileName });
    if (file) {
      file.content = content;
      await file.save();
    } else {
      await this.#FileModel.create({ username, name: fileName, content });
    }
  }

  async updateContent({ username, fileName, content }) {
    const file = await this.findByUsernameAndFileName({ username, fileName });
    file.content = content;
    await file.save();
  }

  async deleteByUsernameAndFileName({ username, fileName }) {
    const file = await this.findByUsernameAndFileName({ username, fileName });
    await file.destroy();
  }

  async updateFileName({ username, fileName, newFileName }) {
    const file = await this.findByUsernameAndFileName({ username, fileName });
    file.name = newFileName;
    await file.save();
  }
}

export default new SequelizeFileRepository(sequelize.models.File);
