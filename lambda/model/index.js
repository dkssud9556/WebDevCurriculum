const Sequelize = require('sequelize');

const config = require('../config');

const db = {};
const sequelize = new Sequelize(config.SEQUELIZE_OPTION);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);

module.exports = db;