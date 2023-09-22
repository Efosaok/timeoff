'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('Leaves', 'rejecter_comment', {
          type: DataTypes.STRING,
          allowNull: true,
        }, { transaction }),
        queryInterface.addColumn('Leaves', 'general_comments', {
          type: DataTypes.STRING,
          allowNull: true,
        }, { transaction }),
        queryInterface.addColumn('Leaves', 'mod_leave_type', {
          type: DataTypes.STRING,
          allowNull: true,
        }, { transaction }),
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn('Leaves', 'rejecter_comment', { transaction }),
        queryInterface.removeColumn('Leaves', 'general_comments', { transaction }),
        queryInterface.removeColumn('Leaves', 'mod_leave_type', { transaction }),
      ]);
    });
  }
};
