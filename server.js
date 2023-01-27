if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt') // for crypting the passwords
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email)
)

// local var, this is just learning purposes usually we'll connect to database
const users = []

app.set('view engine', 'ejs') // sets the view engine so we can use ejs
app.use(express.urlencoded({ extended: false })) // to access in post p
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => { // home page
  res.render('index.ejs', { name: 'Kyle'})
})

app.get('/login', (req, res) => { // login page
  res.render('login.ejs')
})

app.get('/register', (req, res) => { // register page
  res.render('register.ejs')
})

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 = how strong should it be hashed
    users.push({
      id: Date.now().toString(), // for database this will be auto generated
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})

app.listen(3000)