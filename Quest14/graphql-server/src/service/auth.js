import bcrypt from "bcrypt";

import { userRepository } from "../repository/index.js";
import InvalidLoginInfoError from "../error/invalidLoginInfo.js";
import UsernameDuplicationError from "../error/usernameDuplication.js";

class AuthService {
  #userRepository;

  constructor(userRepository) {
    this.#userRepository = userRepository;
  }

  async login({ username, password }) {
    const user = await this.#userRepository.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidLoginInfoError();
    }
  }

  async register({ username, password }) {
    const user = await this.#userRepository.findByUsername(username);
    if (user) {
      throw new UsernameDuplicationError();
    }
    const salt = await bcrypt.genSalt(10);
    await this.#userRepository.save({
      username,
      password: await bcrypt.hash(password, salt),
    });
  }
}

export default new AuthService(userRepository);
