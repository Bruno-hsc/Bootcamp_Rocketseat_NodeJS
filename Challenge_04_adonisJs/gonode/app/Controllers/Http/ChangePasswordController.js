'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class ChangePasswordController {
  async update ({ request, response }) {
    try {
      const { email, password, newPassword } = request.all()

      const user = await User.findByOrFail('email', email)

      if (password) {
        const isSame = await Hash.verify(password, user.password)

        if (!isSame) {
          return response.status(401).send({
            error: {
              message: 'Invalid password'
            }
          })
        }
      }

      if (!password) {
        return response.status(401).send({
          error: {
            message: 'Password not informed'
          }
        })
      }

      user.password = newPassword

      await user.save()

      return user
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Something went wrong' }
      })
    }
  }
}

module.exports = ChangePasswordController
