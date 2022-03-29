'use strict';
//usamos el schema y la tabal creada en user.model.js
const {UserSchema,USER_TABLE} = require("./../models/user.model.js");
module.exports = {
  //up sirve para crear
  async up (queryInterface) {
    //sequelize nos da con queryInterface varias api, en este caso la de crear tabla
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  //down sirve para revertir lo hecho en el up si se desea
  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
