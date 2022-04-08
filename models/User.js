'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class USER extends Model {
    static associate(models) {
      // define association here
    }
  }

  USER.init({
    token: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      unique: false
    },
    id: {
      primaryKey: true,
      type: DataTypes.STRING(15),
      unique: false,
      allowNull: false
    },
    pw: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    salt: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "unknown"
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'USER',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return USER;

};
