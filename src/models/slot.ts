import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Slot extends Model {
    id!: number;
    provider_id!: number;
    start_at!: Date;
    end_at!: Date;
    remaining!: number;
  }

  Slot.init(
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      provider_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
      start_at: { type: DataTypes.DATE, allowNull: false },
      end_at: { type: DataTypes.DATE, allowNull: false },
      remaining: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 }
    },
    { sequelize, tableName: 'slots', timestamps: false }
  );

  return Slot;
};
