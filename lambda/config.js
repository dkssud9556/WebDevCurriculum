module.exports = {
  SEQUELIZE_OPTION: {
    dialect: 'mysql',
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
  },
  JWT_SECRET: 'jwtsecret'
}