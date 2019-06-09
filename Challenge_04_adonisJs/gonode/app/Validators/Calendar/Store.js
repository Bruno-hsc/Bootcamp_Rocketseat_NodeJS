'use strict'

const Antl = use('Antl')
const { rule } = use('Validator')

class Calendar {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: `required`,
      description: 'required',
      localization: 'required',
      when: [rule('required'), rule('date_format', 'YYYY-MM-DD HH:mm:ss')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Calendar
