'use strict';

const data = require('../data/purchases.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Purchases', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Purchases', null, {})
  }
};