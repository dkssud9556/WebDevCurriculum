import server from "./server.js";
import sequelize from "./model/index.js";
import bcrypt from "bcrypt";

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    await server.listen(8000);
    await sequelize.models.User.create({
      username: "user1",
      password: bcrypt.hashSync("pass1", bcrypt.genSaltSync(10)),
    });
    await sequelize.models.User.create({
      username: "user2",
      password: bcrypt.hashSync("pass2", bcrypt.genSaltSync(10)),
    });
    await sequelize.models.User.create({
      username: "user3",
      password: bcrypt.hashSync("pass3", bcrypt.genSaltSync(10)),
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
