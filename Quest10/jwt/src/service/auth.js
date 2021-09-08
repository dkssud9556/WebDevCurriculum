import userRepository from "../repository/user/memory.js";
import InvalidLoginInfoError from "../error/invalidLoginInfo.js";

class AuthService {
  #userRepository;

  constructor(userRepository) {
    this.#userRepository = userRepository;
  }

  async login({ username, password }) {
    const user = await this.#userRepository.findByUsername(username);
    if (!user || user.password !== password) {
      throw new InvalidLoginInfoError();
    }
  }
}

export default new AuthService(userRepository);
