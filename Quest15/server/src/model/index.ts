import { Options, Sequelize } from 'sequelize';

import config from '@src/config';
import userInit from '@model/user';
import fileInit from '@model/file';
import tabInit from '@model/tab';

const createSequelize = () => {
  if (process.env.NODE_ENV === 'test') {
    const { url, dialect, logging } = config.SEQUELIZE_OPTION;
    return new Sequelize(url as string, {
      dialect, logging,
    } as Options);
  }
  return new Sequelize(config.SEQUELIZE_OPTION as Options);
};

const sequelize = createSequelize();

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
