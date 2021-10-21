export default process.env.NODE_ENV === 'test' ? {
    JWT_SECRET: 'jwtsecret',
    SEQUELIZE_OPTION: {
        url: 'sqlite::memory:',
        dialect: 'sqlite',
        logging: false
    }
} : {
    JWT_SECRET: 'jwtsecret',
    SEQUELIZE_OPTION: {
        dialect: 'mysql',
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
    },
    ELASTIC_SEARCH_URL: process.env.ELASTIC_SEARCH_URL
}