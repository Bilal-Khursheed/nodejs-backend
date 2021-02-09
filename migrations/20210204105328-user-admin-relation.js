'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    // Promise.all([
    //   queryInterface.addColumn('Users', 'UserId', {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //     references: {
    //         model: 'adminUsers', // name of Target model
    //         key: 'id', // key in Target model that we're referencing
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    // }),
    // ]).catch(err =>{
    //   console.log(err)
    // })
  },

  down: async (queryInterface, Sequelize) => {
    // Promise.all([
    //   queryInterface.removeColumn('Users', 'UserId')
    // ])
  },
  
};
