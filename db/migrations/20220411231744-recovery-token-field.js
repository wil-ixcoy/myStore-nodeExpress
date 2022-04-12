'use strict';
const {USER_TABLE} = require('../models/user.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    //funcion para agregar columan a user
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      field: 'recovery_token',
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token')
  }
};
