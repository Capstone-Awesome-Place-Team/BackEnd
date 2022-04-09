'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RESTAURANT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.RESTAURANT.hasMany(models.LIKE, { foreignKey : 'r_code', sourceKey : 'r_code'});
    }
  }
  RESTAURANT.init({
    r_code: {
      primaryKey: true, 
      type: DataTypes.INTEGER,
      unique: false, 
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(255),
    },
    r_name: { 
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gu: {
      type: DataTypes.STRING(3),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    type: {
      type: DataTypes.STRING(10),
    },
    tag: {
      type: DataTypes.STRING(50),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    stars: { 
      type: DataTypes.INTEGER,
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