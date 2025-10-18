import { Sequelize, QueryTypes as SequelizeQueryTypes } from 'sequelize';
import ProviderModel from './provider';
import SlotModel from './slot';

export const sequelize = new Sequelize(
  process.env.DATABASE_URL!,
  {
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 8,
      min: 2,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const Provider = ProviderModel(sequelize);
export const Slot = SlotModel(sequelize);

Provider.hasMany(Slot, { foreignKey: 'provider_id', as: 'slots' });
Slot.belongsTo(Provider, { foreignKey: 'provider_id', as: 'provider' });

export const QueryTypes = SequelizeQueryTypes;

export default sequelize;
