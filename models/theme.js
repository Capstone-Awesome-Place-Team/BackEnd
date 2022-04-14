'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class THEME extends Model {
    static associate(models) {
      models.THEME.belongsTo(models.RESTAURANT, {foreignKey : 'r_code', targetKey : 'r_code'});
    }
  }
  THEME.init({
    theme_title: {
      primaryKey: true, 
      type: DataTypes.STRING(45), 
      allowNull: false, 
      unique: true
    }, 
    theme_content: {
      type: DataTypes.STRING(255)
    },
    r_code: {
      type: DataTypes.INTEGER
    },
    restaurant_intro: {
      type: DataTypes.STRING(255)
    }
  }, {
    sequelize,
    timestamps: false, 
    freezeTableName: true, 
    modelName: 'THEME',
    paranoid: false, 
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return THEME;
};