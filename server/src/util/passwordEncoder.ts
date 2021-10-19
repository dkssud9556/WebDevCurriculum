import { Service } from 'typedi';
import bcrypt from 'bcrypt';

export default interface PasswordEncoder {
    encode(password: string): Promise<string>;
    compare(data: string, encrypted: string): Promise<boolean>;
}

@Service()
export class BcryptPasswordEncoder implements PasswordEncoder {
  async encode(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
