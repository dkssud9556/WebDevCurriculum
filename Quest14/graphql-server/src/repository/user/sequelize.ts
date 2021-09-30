import UserRepository from "@repository/user/index";
import { UserModel} from "@model/user";
import User, {UserPk} from "@entity/user";
import {Op} from "sequelize";

export default class SequelizeUserRepository implements UserRepository {
  async findByPk(pk: UserPk): Promise<User | null> {
    const user = await UserModel.findOne({ where: { username: pk } });
    if (user) {
      return new User(user.username, user.password)
    }
    return null;
  }

  async save(user: User): Promise<void> {
    await UserModel.create(user);
  }

  async findAllIn(usernames: readonly string[]): Promise<User[]> {
    const users = await UserModel.findAll({ where: { username: { [Op.in]: usernames}}});
    return users.map(user => new User(user.username, user.password))
  }
}
