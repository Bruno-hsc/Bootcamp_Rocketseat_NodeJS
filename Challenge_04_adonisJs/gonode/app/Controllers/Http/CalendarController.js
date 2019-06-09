'use strict'

const Calendar = use('App/Models/Calendar')
const moment = require('moment')

class CalendarController {
  async index ({ request, response }) {
    const { page, date } = request.get()

    let query = Calendar.query().with('user')

    if (date) {
      query = query.whereRaw(`"when"::date = ?`, date)
    }

    const events = await query.paginate(page)

    return events
  }

  async store ({ request, response, auth }) {
    const data = request.only(['title', 'description', 'localization', 'when'])

    try {
      await Calendar.findByOrFail('when', data.when)

      return response.status(401).send({
        error: {
          message: "You can't schedule two events at the same time "
        }
      })
    } catch (err) {
      const event = await Calendar.create({ ...data, user_id: auth.user.id })

      return event
    }
  }

  async show ({ params, response, auth }) {
    const event = await Calendar.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Only the event author can see it'
        }
      })
    }

    return event
  }

  async update ({ params, request, response, auth }) {
    const event = await Calendar.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Only the event author can change it'
        }
      })
    }

    const passed = moment().isAfter(event.when)

    if (passed) {
      return response.status(401).send({
        error: {
          message: "You can't change past events"
        }
      })
    }

    const data = request.only(['title', 'description', 'localization', 'when'])

    try {
      await Calendar.findByOrFail('when', data.when)

      return response.status(401).send({
        error: {
          message: "You can't schedule two events at the same time "
        }
      })
    } catch (err) {}

    event.merge(data)

    await event.save()

    return event
  }

  async destroy ({ params, request, response, auth }) {
    const event = await Calendar.findOrFail(params.id)

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Only the event author can delete it'
        }
      })
    }

    const passed = moment().isAfter(event.when)

    if (passed) {
      return response.status(401).send({
        error: {
          message: "You can't change past events"
        }
      })
    }

    await event.delete()
  }
}

module.exports = CalendarController
