import DataLoader from "dataloader";
import {
  fileRepository,
  tabRepository,
  userRepository,
} from "./repository/index.js";

export const userLoader = () =>
  new DataLoader(async (usernames) => {
    const users = await userRepository.findAllIn(usernames);
    return usernames.map((username) =>
      users.find((user) => user.username === username)
    );
  });

export const filesLoader = () =>
  new DataLoader(async (usernames) => {
    const files = await fileRepository.findAllIn(usernames);
    return usernames.map((username) =>
      files.filter((file) => file.username === username)
    );
  });

export const tabsLoader = () =>
  new DataLoader(async (usernames) => {
    const tabs = await tabRepository.findAllIn(usernames);
    return usernames.map((username) =>
      tabs.filter((tab) => tab.username === username)
    );
  });
