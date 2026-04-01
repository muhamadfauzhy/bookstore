'use strict';

const data = require('../data/personals.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Personals', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personals', null, {})
  }
};