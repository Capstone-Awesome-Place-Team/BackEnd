'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RESTAURANT', {
      r_code: {
        primaryKey: true, 
        type: Sequelize.INTEGER,
        unique: true, 
        allowNull: false, 
        autoIncrement: true
      },
      image: {
        type: Sequelize.TEXT,
      },
      r_name: { 
        type: Sequelize.STRING(255),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(255),
      },
      tag: {
        type: Sequelize.STRING(255),
      },
      price: {
        type: Sequelize.INTEGER
      },
      stars: {
        type: Sequelize.FLOAT(3,2)
      },
      parking: {
        type: Sequelize.BOOLEAN
      },
      takeout: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RESTAURANT');
  }
};