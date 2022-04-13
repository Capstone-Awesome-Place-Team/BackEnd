'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class COMMENT extends Model {
    static associate(models) {
      models.COMMENT.belongsTo(models.RESTAURANT, {foreignKey : 'r_code', targetKey : 'r_code'});
      models.COMMENT.belongsTo(models.USER, {foreignKey : 'id', targetKey : 'id'});
    }
  }
  COMMENT.init({
    c_code: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    r_code: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id: {
      allowNull: false,
      type: DataTypes.STRING(15)
    },
    comment_title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comment_content: {
      allowNull: false,
      type: DataTypes.STRING
    }, 
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    timestamps: true, 
    freezeTableName: true, 
    modelName: 'COMMENT',
    paranoid: false, 
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  return COMMENT;
};