'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.get('/users', 'UserController.index')
Route.get('/users/:id', 'UserController.show')

Route.post('/sessions', 'SessionController.store')
