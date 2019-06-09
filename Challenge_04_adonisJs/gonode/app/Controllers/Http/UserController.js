'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.crreate(data)

    return user
  }

  async index () {
    const users = await User.query().fetch()

    return users
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async update ({ request, response }) {
    try {
      const { email, username } = request.all()

      const user = await User.findByOrFail('email', email)

      user.token = null
      user.token_created_at = null
      user.username = username

      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Something went wrong' }
      })
    }
  }
}

module.exports = UserController
