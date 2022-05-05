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
      id: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      comment_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comment_content: {
        allowNull: false,
        type: Sequelize.STRING
      }, 
      star: {
        allowNull: false, 
        type: Sequelize.FLOAT(3,2)
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
