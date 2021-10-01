import { Sequelize } from 'sequelize';

import { STORAGE_FOLDER_PATH } from '../config';
import userInit from './user';
import fileInit from './file';
import tabInit from './tab';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${STORAGE_FOLDER_PATH}/database.sqlite`,
});

userInit(sequelize);
fileInit(sequelize);
tabInit(sequelize);

sequelize.models.File.belongsTo(sequelize.models.User, {
  foreignKey: 'username',
  onDelete: 'cascade',
});
sequelize.models.Tab.belongsTo(sequelize.models.User, {
  foreignKey: 'username',
  onDelete: 'cascade',
});

export default sequelize;
