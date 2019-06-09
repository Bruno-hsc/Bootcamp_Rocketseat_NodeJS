'use strict'

const Mail = use('Mail')

class ShareEventMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'ShareEventMail-job'
  }

  async handle ({ email, username, event }) {
    console.log(`Job:${ShareEventMail.key}`)
    await Mail.send(
      ['emails.share_event'],
      { username, event },
      message => {
        message
          .to(email)
          .from('brunohenriquescosta@hotmail.com')
          .subject(`Event:${event.name}`)
      }
    )
  }
}

module.exports = ShareEventMail
