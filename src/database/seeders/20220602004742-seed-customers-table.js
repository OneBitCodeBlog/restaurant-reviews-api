'use strict';

const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('customers', [
      { name: 'Isaac Pontes', phone: '1234', created_at: new Date(), updated_at: new Date() },
      { name: 'Juliana Conde', phone: '1234', created_at: new Date(), updated_at: new Date() },
      { name: 'Lucas Queiroga', phone: '1234', created_at: new Date(), updated_at: new Date() }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {
      where: {
        [Op.or]: [{ name: 'Isaac Pontes' }, { name: 'Juliana Conde' }, { name: 'Lucas Queiroga' }]
      }
    })
  }
};
