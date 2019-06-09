'use strict'

const Antl = use('Antl')

class ChangePassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required',
      newPassword: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ChangePassword
