import InvalidLoginInfoError from '@error/invalidLoginInfo';
import UsernameDuplicationError from '@error/usernameDuplication';
import UserRepository from '@repository/user';
import {Inject, Service} from 'typedi';
import PasswordEncoder, {BcryptPasswordEncoder} from '@src/passwordEncoder';
import SequelizeUserRepository from "@repository/user/sequelize";

@Service()
export default class AuthService {
  private readonly userRepository: UserRepository;

  private readonly passwordEncoder: PasswordEncoder;

  constructor(
      @Inject(() => SequelizeUserRepository) userRepository: UserRepository,
      @Inject(() => BcryptPasswordEncoder) passwordEncoder: PasswordEncoder
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  async login({ username, password }: {username: string, password: string}) {
    const user = await this.userRepository.findByPk(username);
    if (!user || !(await this.passwordEncoder.compare(password, user.password))) {
      throw new InvalidLoginInfoError();
    }
  }

  async register({ username, password }: { username: string, password: string}) {
    const user = await this.userRepository.findByPk(username);
    if (user) {
      throw new UsernameDuplicationError();
    }
    await this.userRepository.save({
      username,
      password: await this.passwordEncoder.encode(password),
    });
  }
}
