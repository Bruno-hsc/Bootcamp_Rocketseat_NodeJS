const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

app.use(express.urlencoded({ extended: false }))

nunjucks.configure('view', {
  autoescape: true,
  express: app,
  watch: true
})

const checkAge = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }
  return next()
}

app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/major', checkAge, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.get('/minor', checkAge, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  age >= 18
    ? res.redirect(`/major?age=${age}`)
    : res.redirect(`/minor?age=${age}`)
})

app.listen(3000)
