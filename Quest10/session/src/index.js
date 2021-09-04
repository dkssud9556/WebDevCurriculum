import server from "./server.js";

const startServer = async () => {
  try {
    await server.listen(8000);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
