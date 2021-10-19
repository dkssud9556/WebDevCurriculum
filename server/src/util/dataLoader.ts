import DataLoader from 'dataloader/index';
import { Container } from 'typedi';

import User from '@entity/user';
import Tab from '@entity/tab';
import File from '@entity/file';
import UserService from '@service/user';
import FileService from '@service/file';
import TabService from '@service/tab';

export const userLoader = () => new DataLoader<string, User | undefined>(async (usernames) => {
  const userService = Container.get(UserService);
  const users = await userService.getUsersIn(usernames);
  return usernames.map((username) => users.find((user) => user.username === username));
});

export const filesLoader = () => new DataLoader<string, File[]>(async (usernames) => {
  const fileService = Container.get(FileService);
  const files = await fileService.getFilesIn(usernames);
  return usernames.map((username) => files.filter((file) => file.username === username));
});

export const tabsLoader = () => new DataLoader<string, Tab[]>(async (usernames) => {
  const tabService = Container.get(TabService);
  const tabs = await tabService.getTabsIn(usernames);
  return usernames.map((username) => tabs.filter((tab) => tab.username === username));
});
