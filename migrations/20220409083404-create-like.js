'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LIKE', {
      token: {
        primaryKey: true, 
        type: Sequelize.STRING(255),
        unique: false
      }, 
      r_code: {
        primaryKey: true, 
        type: Sequelize.INTEGER,
        unique: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LIKE');
  }
};