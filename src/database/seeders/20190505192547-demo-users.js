'use strict'
const bcrypt = require('bcryptjs')

const PASSWORD = '1234'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash(PASSWORD, 8)

    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John',
          email: 'user3@user.com',
          avatar: '',
          password_hash: password,
          provider: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Marshall',
          email: 'user4@user.com',
          avatar: '',
          password_hash: password,
          provider: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Luke',
          email: 'user5@user.com',
          avatar: '',
          password_hash: password,
          provider: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Nami',
          email: 'user6@user.com',
          avatar: '',
          password_hash: password,
          provider: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Zoro',
          email: 'user7@user.com',
          avatar: '',
          password_hash: password,
          provider: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Brook',
          email: 'user8@user.com',
          avatar: '',
          password_hash: password,
          provider: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {})
  }
}
