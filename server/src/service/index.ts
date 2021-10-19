import { Container } from 'typedi';

import AuthService from '@service/auth';
import FileService from '@service/file';
import TabService from '@service/tab';
import UserService from '@service/user';
import LogService from '@service/log';

export default {
  authService: Container.get(AuthService),
  fileService: Container.get(FileService),
  tabService: Container.get(TabService),
  userService: Container.get(UserService),
  logService: Container.get(LogService),
};
