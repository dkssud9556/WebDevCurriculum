import AuthService from '@service/auth';
import FileService from '@service/file';
import TabService from '@service/tab';
import UserService from '@service/user';

import { userRepository, fileRepository, tabRepository } from '@repository/index';

export const authService = new AuthService(userRepository);
export const fileService = new FileService(fileRepository);
export const tabService = new TabService(tabRepository);
export const userService = new UserService(userRepository);
