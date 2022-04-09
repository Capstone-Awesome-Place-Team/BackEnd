'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LIKE extends Model {
    static associate(models) {
      models.LIKE.belongsTo(models.USER, {foreignKey : 'token', targetKey : 'token'});
      models.LIKE.belongsTo(models.RESTAURANT, {foreignKey : 'r_code', targetKey : 'r_code'});
    }
  }
  LIKE.init({
    token: {
      primaryKey: true, 
      type: DataTypes.STRING(255),
      unique: true
    }, 
    r_code: {
      primaryKey: true, 
      type: DataTypes.INTEGER,
      unique: true
    }
  }, {
    sequelize, 
    timestamps: false, 
    freezeTableName: true, 
    modelName: 'LIKE',
    paranoid: false, 
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return LIKE;
};