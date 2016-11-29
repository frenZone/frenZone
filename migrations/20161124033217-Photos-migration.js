'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Photos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.TEXT
      },
      instaCreatedTime:{
        type: Sequelize.TEXT
      },
      LocationId:{
        references:{ model: 'Locations', key: 'id'},
        type: Sequelize.DOUBLE
      },
      UserId:{
        references:{ model: 'Users', key: 'id'},
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Photos');
  }
};