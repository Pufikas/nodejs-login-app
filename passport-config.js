const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
      // this is not an error and it's not a server issue, false stand that we cannot find that user, the message is an errror message
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user) // returns the user 
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
        return done(e)
      }
    }
  

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  /* if we use
    passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser)
    like that we will get error 
    TypeError: LocalStrategy requires a verify callback, because we are not autheticating the user so we must use this to fix that

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    Notice where the ) is

  *
   in this app the usernameField is named email in the login page
   calls authenticateUser
  */
  passport.serializeUser((user, done) => done(null, user.id)) // stores in the session
  passport.deserializeUser((id, done) => {                    // opposite of this ^
    return done(null, getUserById(id))
  })
}

module.exports = initialize
// export so we can call it