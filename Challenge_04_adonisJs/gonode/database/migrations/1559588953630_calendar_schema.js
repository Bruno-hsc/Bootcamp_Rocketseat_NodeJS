'use strict'

const Schema = use('Schema')

class CalendarSchema extends Schema {
  up () {
    this.create('calendars', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('localization').notNullable()
      table.timestamp('when')
      table.timestamps()
    })
  }

  down () {
    this.drop('calendars')
  }
}

module.exports = CalendarSchema
