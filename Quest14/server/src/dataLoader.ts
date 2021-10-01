import DataLoader from "dataloader/index";
import {fileRepository, tabRepository, userRepository} from "@repository/index";
import User from "@entity/user";
import Tab from "@entity/tab";
import File from "@entity/file";

export const userLoader = () =>
  new DataLoader<string, User | undefined>(async (usernames) => {
    const users = await userRepository.findAllIn(usernames);
    return usernames.map((username) =>
      users.find((user) => user.username === username)
    );
  });

export const filesLoader = () =>
  new DataLoader<string, File[]>(async (usernames) => {
    const files = await fileRepository.findAllIn(usernames);
    return usernames.map((username) =>
      files.filter((file) => file.username === username)
    );
  });

export const tabsLoader = () =>
  new DataLoader<string, Tab[]>(async (usernames) => {
    const tabs = await tabRepository.findAllIn(usernames);
    return usernames.map((username) =>
      tabs.filter((tab) => tab.username === username)
    );
  });
