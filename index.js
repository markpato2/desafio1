const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
// app.use Sirve para disser ao Express que pode pegar informa;'oes de un formulario html
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const logMidleware = (req, res, next) => {
  /* console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  ) */

  console.log(`query: ${req.query} `)

  const { age } = req.query

  // const { idade2 } = req.query

  console.log('midleWare' + age)

  if (!age) {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  console.log('antes')
  console.log(req.body)
  const { age } = req.body
  const { nome } = req.body

  const red =
    age >= 18
      ? res.redirect(`/major?age=${age}&nome=${nome}`)
      : res.redirect(`/minor?age=${age}`)

  return red

  // return res.render('new')
})

app.get('/major', logMidleware, (req, res) => {
  const { age } = req.query
  const { nome } = req.query
  return res.render('major', { age, nome })
})

app.get('/minor', logMidleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3003)
