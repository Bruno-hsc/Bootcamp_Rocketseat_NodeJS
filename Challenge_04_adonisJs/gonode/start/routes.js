'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')
Route.get('users', 'UserController.index')
Route.get('users/:id', 'UserController.show')
Route.put('users', 'UserController.update').validator('User/Update')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('forgotPassword', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('forgotPassword', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.put('changePassword', 'ChangePasswordController.update').validator(
  'ChangePassword'
)

Route.group(() => {
  Route.resource('calendar', 'CalendarController')
    .apiOnly()
    .validator(
      new Map([
        [['calendar.store'], ['Calendar/Store']],
        [['calendar.update'], ['Calendar/Update']]
      ])
    )

  Route.post(
    'calendar/:calendar_id/share',
    'ShareEventController.share'
  ).validator('Calendar/Share')
}).middleware('auth')
