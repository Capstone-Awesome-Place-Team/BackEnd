'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('USER', {
      token: {
        type: Sequelize.STRING(255),
        defaultValue: null, 
        unique: true
      }, 
      id: {
        primaryKey: true, 
        type: Sequelize.STRING(15),
        unique: true, 
        allowNull: false
      }, 
      pw: {
        type: Sequelize.STRING(255), 
        allowNull: false
      }, 
      salt: {
        type: Sequelize.BIGINT, 
        allowNull: false
      }, 
      nickname: {
        type: Sequelize.STRING(15), 
        allowNull: false, 
        defaultValue: "unknown"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('USER');
  }
};