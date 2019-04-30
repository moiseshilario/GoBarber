const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'User',
    {
      name: DataType.STRING,
      email: DataType.STRING,
      avatar: DataType.STRING,
      password: DataType.VIRTUAL,
      password_hash: DataType.STRING,
      provider: DataType.BOOLEAN
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

  return User
}
