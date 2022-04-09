'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LIKE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.LIKE.belongsTo(models.USER, {foreignKey : 'token', targetKey : 'token'});
      models.LIKE.belongsTo(models.RESTAURANT, {foreignKey : 'r_code', targetKey : 'r_code'});
    }
  }
  LIKE.init({
    token: {
      primaryKey: true, 
      type: DataTypes.STRING(255),
      unique: false
    }, 
    r_code: {
      primaryKey: true, 
      type: DataTypes.INTEGER,
      unique: false
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