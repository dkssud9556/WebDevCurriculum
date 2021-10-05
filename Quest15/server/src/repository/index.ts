import FileRepository from '@repository/file/sequelize';
import TabRepository from '@repository/tab/sequelize';
import UserRepository from '@repository/user/sequelize';

export const fileRepository = new FileRepository();
export const tabRepository = new TabRepository();
export const userRepository = new UserRepository();
