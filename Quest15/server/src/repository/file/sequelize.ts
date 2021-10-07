import {FileModel} from "@model/file";
import FileRepository from "@repository/file/index";
import File, {FilePk} from "@entity/file";
import {Op} from "sequelize";
import {Service} from "typedi";

@Service()
export default class SequelizeFileRepository implements FileRepository {
  async findByPk(pk: FilePk): Promise<File | null> {
    const file = await FileModel.findOne({ where: pk });
    if (file) {
      const { fileName, username, content } = file;
      return new File(fileName, username, content);
    }
    return null;
  }

  async findAllByUsername(username: string): Promise<File[]> {
    const files = await FileModel.findAll({ where: { username }});
    return files.map(file => {
      const { fileName, username, content } = file;
      return new File(fileName, username, content);
    });
  }

  async existsByPk(pk: FilePk): Promise<boolean> {
    const file = await this.findByPk(pk);
    return !!file;
  }

  async save({ username, fileName, content }: File): Promise<void> {
    const file = await FileModel.findOne({ where:{username, fileName}});
    if (file) {
      file.content = content;
      await file.save();
    } else {
      await FileModel.create({ username, fileName, content})
    }
  }

  async deleteByPk(pk: FilePk): Promise<void> {
    const file = await FileModel.findOne({ where: pk });
    if (file) {
      await file.destroy();
    }
  }

  async updateFileName({ username, fileName, newFileName }: { username: string; fileName: string; newFileName: string; }): Promise<void> {
    const file = await FileModel.findOne({ where: { username, fileName}});
    if (file) {
      await FileModel.update({ fileName: newFileName}, { where: {username, fileName}})
    }
  }

  async findAllIn(usernames: readonly string[]): Promise<File[]> {
    const files = await FileModel.findAll({ where: { username: { [Op.in]: usernames}}})
    return files.map(file => {
      const { fileName, username, content} = file
      return new File(fileName, username, content);
    })
  }
}
