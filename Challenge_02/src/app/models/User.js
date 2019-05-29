const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )


  User.prototype.checkPassord = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  User.prototype.checkProvider = function (provider) {
    if (provider === true) {
      return true
    } else {
      return false
    }
  }
  return User
}
