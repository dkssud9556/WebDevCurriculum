import bcrypt from 'bcrypt';

import InvalidLoginInfoError from '@error/invalidLoginInfo';
import UsernameDuplicationError from '@error/usernameDuplication';
import UserRepository from '@repository/user';

export default class AuthService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login({ username, password }: {username: string, password: string}) {
    const user = await this.userRepository.findByPk(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidLoginInfoError();
    }
  }

  async register({ username, password }: { username: string, password: string}) {
    const user = await this.userRepository.findByPk(username);
    if (user) {
      throw new UsernameDuplicationError();
    }
    const salt = await bcrypt.genSalt(10);
    await this.userRepository.save({
      username,
      password: await bcrypt.hash(password, salt),
    });
  }
}
