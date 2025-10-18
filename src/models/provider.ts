import { DataTypes, Model, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  class Provider extends Model {
    id!: number;
    name!: string;
    latitude!: number;
    longitude!: number;
    overAllRating?: number;
  }

  Provider.init(
    {
      id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      latitude: { type: DataTypes.DOUBLE, allowNull: false },
      longitude: { type: DataTypes.DOUBLE, allowNull: false },
      location: { type: DataTypes.GEOMETRY('POINT'), allowNull: false },
      overAllRating: { type: DataTypes.FLOAT, allowNull: true }
    },
    { sequelize, tableName: 'providers', timestamps: false }
  );

  return Provider;
};
