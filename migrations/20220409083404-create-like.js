'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LIKE', {
      id: {
        primaryKey: true, 
        type: Sequelize.STRING(15),
        unique: true
      }, 
      r_code: {
        primaryKey: true, 
        type: Sequelize.INTEGER,
        unique: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LIKE');
  }
};