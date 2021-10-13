import path from "path";

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
        dialect: 'sqlite',
        storage: `${path.resolve()}/storage/database.sqlite`
    }
}