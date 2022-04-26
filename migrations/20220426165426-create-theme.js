'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('THEME', {
      theme_code: {
        primaryKey: true, 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false, 
        unique: true
      }, 
      theme_title: {
        allowNull: false, 
        type: Sequelize.STRING(45), 
        unique: false
      },
      theme_content: {
        type: Sequelize.STRING(255)
      },
      r_code: {
        type: Sequelize.INTEGER
      },
      restaurant_intro: {
        type: Sequelize.STRING(255)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('THEMEs');
  }
};