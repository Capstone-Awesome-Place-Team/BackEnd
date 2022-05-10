'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RESTAURANT extends Model {
    static associate(models) {
      models.RESTAURANT.hasMany(models.LIKE, { foreignKey : 'r_code', sourceKey : 'r_code'});
      models.RESTAURANT.hasMany(models.THEME, { foreignKey : 'r_code', sourceKey : 'r_code'});
    }
  }
  RESTAURANT.init({
    r_code: {
      primaryKey: true, 
      type: DataTypes.INTEGER,
      unique: true, 
      allowNull: false, 
      autoIncrement: true
    },
    image: {
      type: DataTypes.STRING(255),
    },
    r_name: { 
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
    },
    tag: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    stars: { 
      type: DataTypes.FLOAT(3,2)
    },
    parking: {
      type: DataTypes.BOOLEAN,
    },
    takeout: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    timestamps: false, 
    freezeTableName: true, 
    modelName: 'RESTAURANT',
    paranoid: false, 
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return RESTAURANT;
};