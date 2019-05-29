'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // aqui sao as foreng keys (chaves de relacionamento com a table de users)
      user_id: {
        type: Sequelize.INTEGER,
        // qual tabela essa chave ta referenciando
        references: { model: 'users', key: 'id' },
        // onUpdate p/ se o id alterar na tabela de users, altera aqui tbm
        onUpdate: 'CASCADE',
        // onUpdate - se um user for removido todos os agendamentos dele
        // sera removido tbm.
        onDelete: 'CASCADE',
        allowNull: false
      },
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('appointments')
  }
}
