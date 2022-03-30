'use strict';


const {CATEGORY_TABLE, CategorySchema} = require("../models/category.model");
const {PRODUCT_TABLE, ProductSchema} = require("../models/product.model");
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
