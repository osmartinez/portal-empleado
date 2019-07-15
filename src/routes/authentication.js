const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../db')
const { isNotLoggedIn } = require('../lib/authenticationHelpers')
const { lookup } = require('dns').promises;
const { hostname } = require('os');
var http = require('http');
var querystring = require('querystring');

async function getMyIPAddress(options) {
    return (await lookup(hostname(), options))
        .address;
}


router.get('/logout', isNotLoggedIn, (req, res) => {
    req.logOut()
    res.redirect('/auth/login')
})


router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('authentication/login', { title: 'Acceso' })
})

router.post('/login', isNotLoggedIn, (req, res, next) => {

    console.log(res.getHeaders())
    passport.authenticate('local.login', {
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(req, res, (data, user, info) => {
        if (req.user && req.user.IsRRHH) {
            req.logOut()
            console.log(req.body)
            var data = querystring.stringify(req.body);
            var options = {
                host: '40.68.185.174',
                port: 4000,
                path: "/auth/login",
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(data)
                }
            }

            var httpreq = http.request(options, (response) => {
                response.setEncoding('utf8')
                response.on('data', (chunk) => {
                    console.log("body " + chunk)
                })
                response.on('end', () => {
                    res.redirect('http://40.68.185.174:4000/dashboard')
                })
            })
            httpreq.write(data)
            httpreq.end()
        }
        else {
            res.redirect('/dashboard')
        }
    })
})

module.exports = router