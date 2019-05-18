const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const app = express()
const db = require('./models')

// 判別開發環境
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

Handlebars.registerHelper('switch', function(value, options) {
  this.switch_value = value
  this.switch_break = false
  return options.fn(this)
})

Handlebars.registerHelper('case', function(value, options) {
  if (value == this.switch_value) {
    this.switch_break = true
    return options.fn(this)
  }
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(flash())

app.use(
  session({
    secret: 'kerokero',
    resave: 'false',
    saveUninitialized: 'false'
  })
)

app.use(passport.initialize())

app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() // 辨識是否已經登入
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/users'))
app.use('/todos', require('./routes/todos'))
// app.use('/auth', require('./routes/auths'))

app.listen(process.env.PORT || 3000, () => {
  db.sequelize.sync()
  console.log('App is running: localhost:3000')
})
