const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db')
const authHelpers = require('../lib/authenticationHelpers')
const TYPES = require("tedious").TYPES;
const {user_status} = require('../lib/static/enums')
const { lookup } = require('dns').promises;
const { hostname } = require('os');
var http = require('http');
var querystring = require('querystring');

async function getMyIPAddress(options) {
  return (await lookup(hostname(), options))
    .address;
}

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
            const comparisonResult = await authHelpers.comparePwd(password,user.Password)
            if(comparisonResult){
                // cargo version green
                if(user.IsRRHH){
                    console.log(req.body)
                    var data = querystring.stringify(req.body);
                    var options = {
                        host: '10.0.0.4',
                        port: 4000,
                        path: "/auth/login",
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Content-Length': Buffer.byteLength(data)
                        }
                    }

                    var httpreq = http.request(options, (response)=>{
                        response.setEncoding('utf8')
                        response.on('data',(chunk)=>{
                            console.log("body "+ chunk)
                        })
                        response.on('end',()=>{
                            res.redirect('google.es')
                        })
                    })
                    httpreq.write(data)
                    httpreq.end()


                }
                else{
                    done(null, user, req.flash('success','Bienvenido '+user.Name))
                }
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
