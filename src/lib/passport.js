const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db')
const authHelpers = require('../lib/authenticationHelpers')
const TYPES = require("tedious").TYPES;
const {user_status} = require('../lib/static/enums')

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
},  (req,username,password, done)=>{
    params = []
    db.buildParams(params,"Username", TYPES.NVarChar, username)
    db.procedure("FindUserByUsername",params, async (rows)=>{
        if(rows.length==1 && rows[0].Status == user_status.ACTIVE){
            const user = rows[0]
            const comparisonResult =  password==user.Password //await authHelpers.comparePwd(password,user.Password) ||
            if(comparisonResult){
                done(null, user, req.flash('success','Bienvenido '+user.Name))
            }
            else{
                done(null, false , req.flash('message','Contraseña incorrecta'))
            }
        }
        else{
            return done(null, false , req.flash('message','Usuario no encontrado') )

        }
    })
}))


passport.serializeUser((user, done)=>{
    done(null, user.Id)
})

passport.deserializeUser((id, done)=>{
    params = []
    db.buildParams(params,"Id", TYPES.Int, id)
    db.procedure("FindUserById", params, (rows)=>{
        done(null, rows[0])
    })
})
