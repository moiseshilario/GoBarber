const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    const providers = await User.findAll({ where: { provider: true } })
    const clients = await User.findAll({ where: { provider: false } })

    return res.render('dashboard', { providers, clients })
  }
}

module.exports = new DashboardController()
