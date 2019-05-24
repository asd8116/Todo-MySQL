const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy // 載入 passport-facebook
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } })

      if (!user) return done(null, false, { message: 'That email is not registered' })

      const isMatch = await bcrypt.compare(password, user.password)

      if (isMatch) return done(null, user)
      else return done(null, false, { message: 'Email and Password incorrect' })
    })
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      async (accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json
        const user = await User.findOne({ where: { email: email } })

        if (user) return done(null, user)

        const randomPassword = Math.random()
          .toString(36)
          .slice(-8)

        const hash = bcrypt.hashSync(randomPassword, 10)

        const newUser = new User({ name, email, password: hash })
        await newUser.save()

        return done(null, newUser)
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user)
    })
  })
}
