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
    passport.authenticate('local.login', {
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(req, res, (data, user, info) => {
        if (req.user && req.user.IsRRHH) {
            console.log(req.user)
            const username = req.user.Username
            const pwd = req.user.Password
            req.logOut()

            let url = 'http://40.114.223.46:4000/auth/loginInternal?user='+username+'&pwd='+pwd
            console.log(url)
            res.redirect(url)
        }
        else {
            res.redirect('/dashboard')
        }
    })
})

module.exports = router