const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail) {
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
  

  passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser)
  // in this app the usernameField is named email in the login page
  // calls authenticateUser
  passport.serializeUser((user, done) => { }) // stores in the session
  passport.deserializeUser((id, done) => { }) // opposite of this ^
}

module.exports = initialize
// export so we can call it