'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('THEME', {
      theme_title: {
        primaryKey: true, 
        allowNull: false, 
        type: Sequelize.STRING(45), 
        unique: true
      },
      theme_content: {
        type: Sequelize.STRING(45)
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
    await queryInterface.dropTable('THEME');
  }
};