'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class USER extends Model {
    static associate(models) {
      models.USER.hasMany(models.LIKE, { foreignKey : 'id', sourceKey : 'id'});
      models.USER.hasMany(models.COMMENT, { foreignKey : 'nickname', sourceKey : 'nickname'});
    }
  }
  USER.init({
    token: {
      type: DataTypes.STRING(255),
      defaultValue: null, 
      unique: true
    }, 
    id: {
      primaryKey: true, 
      type: DataTypes.STRING(15),
      unique: true, 
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
