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
        type: Sequelize.STRING(255),
      },
      r_name: { 
        type: Sequelize.STRING(255),
        allowNull: false
      },
      gu: {
        type: Sequelize.STRING(3),
      },
      address: {
        type: Sequelize.STRING(255),
      },
      type: {
        type: Sequelize.STRING(10),
      },
      tag: {
        type: Sequelize.STRING(50),
      },
      price: {
        type: Sequelize.INTEGER
      },
      stars: {
        type: Sequelize.INTEGER
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