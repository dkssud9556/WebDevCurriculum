import UserRepository from '@repository/user';
import User from '@entity/user';
import {Inject, Service} from 'typedi';
import SequelizeUserRepository from "@repository/user/sequelize";

@Service()
export default class UserService {
  private readonly userRepository: UserRepository

  constructor(
      @Inject(() => SequelizeUserRepository) userRepository: UserRepository
  ) {
    this.userRepository = userRepository;
  }

  async getUser(username: string): Promise<User | null> {
    return this.userRepository.findByPk(username);
  }

  async getUsersIn(usernames: readonly string[]) {
    return this.userRepository.findAllIn(usernames as string[]);
  }
}
