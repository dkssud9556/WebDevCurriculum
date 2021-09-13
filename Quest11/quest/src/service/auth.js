import bcrypt from "bcrypt";

import userRepository from "../repository/user/sequelize.js";
import InvalidLoginInfoError from "../error/invalidLoginInfo.js";

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
}

export default new AuthService(userRepository);
