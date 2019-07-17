const express = require ('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const session = require('express-session');
const path = require('path')
const flash = require ('connect-flash')
const bodyParser = require('body-parser');
const validator = require('express-validator');
const passport = require('passport')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const http_config = require('./http_config')

// inicializar
const app = express()
require('./lib/passport')

// configuracion
app.set('port',http_config.port || process.argv[2] || 4000)
app.set('views',path.join(__dirname,'views'))
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars') // ruta helpers para handlebar
}))
app.set('view engine', '.hbs')


// middleware
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour

app.use(session({
    secret: 'supersecretpwddeoscarquetalestasyobieneeeaa',
    resave: false,
    saveUninitialized: false,
    secure: true,
    httpOnly: true,
    expires: expiryDate
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());


// global var
app.use((req, res, next) => {
    app.locals.message = req.flash('message')
    app.locals.success = req.flash('success')
    app.locals.user = req.user
    next();
  });


// routes
app.use(require('./routes'))
app.use('/auth',require('./routes/authentication'))
app.use('/dashboard',require('./routes/dashboard'))
app.use('/rrhh',require('./routes/rrhh'))


// public
app.use(express.static(path.join(__dirname,'public')))




// start server
const server = app.listen(app.get('port'),()=>{
    console.log('Listening on port ',app.get('port'))  
})


module.exports = server
