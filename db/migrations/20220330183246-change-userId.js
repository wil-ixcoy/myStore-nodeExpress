'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
module.exports = {
  async up(queryInterface) {
    //cambiamos un atributo de la tabla CUstomer_TABLE que es el id, y entre los parentesis
    //se pasan los nuevos atributo, importante de que si esta referenciado, ya no se agregue como
    //cambio
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'user_id',
      unique: true,
    });
  },

/*   async down(queryInterface) {}, */
};

