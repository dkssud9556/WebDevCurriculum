export const users = [
  {
    username: "user1",
    password: "pass1",
  },
  {
    username: "user2",
    password: "pass2",
  },
  {
    username: "user3",
    password: "pass3",
  },
];

class MemoryUserRepository {
  async findByUsername(username) {
    return users.find((user) => user.username === username) ?? null;
  }
}

export default new MemoryUserRepository();
