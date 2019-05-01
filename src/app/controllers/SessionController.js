const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('User not found!')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('incorrect password')
      return res.redirect('/')
    }

    return res.redirect('/app/dashboard')
  }
}

module.exports = new SessionController()
