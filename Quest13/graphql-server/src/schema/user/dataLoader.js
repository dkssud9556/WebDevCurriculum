import DataLoader from "dataloader";
import { userRepository } from "../../repository";

const batchLoadFn = async (usernames) => {
  const users = await userRepository.findIn(usernames);
  return usernames.map((username) =>
    users.find((user) => user.username === username)
  );
};

export default () => new DataLoader(batchLoadFn);
