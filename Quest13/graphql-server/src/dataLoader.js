import DataLoader from "dataloader";
import { userRepository } from "./repository/index.js";

export const usersLoader = () =>
  new DataLoader(async (usernames) => {
    const users = await userRepository.findAllIn(usernames);
    return usernames.map((username) =>
      users.find((user) => user.username === username)
    );
  });
