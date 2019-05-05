const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }

  async store (req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }

  async show (req, res) {
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.session.user.id
      }
    })

    const barberAppointments = await Promise.all(
      appointments.map(async ap => {
        const user = await User.findOne({ where: { id: ap.user_id } })
        return {
          user: user.name,
          date: moment(ap.date).format('DD/MM/YYYY - HH:mm')
        }
      })
    )

    return res.render('appointments/index', { barberAppointments })
  }

  async getAppointments (req, res) {
    console.log('XABLAAAAAAAAAAAAAU')
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const barberAppointments = await Promise.all(
      appointments.map(async ap => {
        const user = await User.findOne({ where: { id: ap.user_id } })
        return {
          name: user.name,
          time: moment(ap.date).format('HH:mm')
        }
      })
    )

    console.log(
      'TCL: AppointmentController -> getAppointments -> barberAppointments',
      barberAppointments
    )

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      console.log(
        'TCL: AppointmentController -> getAppointments -> value.format()',
        value.format()
      )

      let user = barberAppointments.filter(item => item.time === time)[0]
      user = user ? user.name : ''

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time),
        user
      }
    })

    console.log(
      'TCL: AppointmentController -> getAppointments -> available',
      available
    )

    return res.render('appointments/appointments', { available })
  }
}

module.exports = new AppointmentController()
