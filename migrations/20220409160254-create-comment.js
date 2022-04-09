'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('COMMENT', {
      c_code: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      r_code: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nickname: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comment_content: {
        allowNull: false,
        type: Sequelize.STRING
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('COMMENT');
  }
};