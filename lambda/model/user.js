module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  timestamps: false,
  indexes: [{ unique: true, fields: ['username'] }],
  modelName: 'User'
});