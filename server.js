const express = require('express')
const app = express()

app.set('view engine', 'ejs') // sets the view engine so we can use ejs

app.get('/', (req, res) => { // home page
  res.render('index.ejs', { name: 'Kyle'})
})

app.get('/login', (req, res) => { // login page
  res.render('login.ejs')
})

app.get('/register', (req, res) => { // register page
  res.render('register.ejs')
})

app.post('/register', (req, res) => {
  
})

app.listen(3000)