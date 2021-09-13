import server from "./server.js";
import sequelize from "./model/index.js";

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    await server.listen(8000);
    await sequelize.models.User.create({
      username: "user1",
      password: "pass1",
    });
    await sequelize.models.User.create({
      username: "user2",
      password: "pass2",
    });
    await sequelize.models.User.create({
      username: "user3",
      password: "pass3",
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
