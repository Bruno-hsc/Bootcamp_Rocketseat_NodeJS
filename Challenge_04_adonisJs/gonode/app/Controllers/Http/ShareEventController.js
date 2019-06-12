'use strict'

const Calendar = use('App/Models/Calendar')
const Kue = use('Kue')
const Job = use('App/Jobs/ShareEventMail')

class ShareEventController {
  async share ({ request, response, params, auth }) {
    const event = await Calendar.findOrFail(params.calendar_id)
    const email = request.input('email')

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Only the event author can share it'
        }
      })
    }

    Kue.dispatch(
      Job.key,
      { email, username: auth.user.username, event },
      { attempts: 3 }
    )

    return email
  }
}

module.exports = ShareEventController
