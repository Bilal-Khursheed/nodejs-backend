'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'Bilal',
        lastName: 'Khursheed',
        email: 'demo@demo.com',
        password: 'demo',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};