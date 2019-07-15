const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../db')
const {isNotLoggedIn} = require('../lib/authenticationHelpers')


router.get('/logout',isNotLoggedIn,(req,res)=>{
    req.logOut()
    res.redirect('/auth/login')
})


router.get('/login',isNotLoggedIn,(req,res)=>{
    res.render('authentication/login',{title: 'Acceso'})
})

router.post('/login',isNotLoggedIn, (req,res,next)=>{
    console.log(res.getHeaders)
    passport.authenticate('local.login',{
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })(req,res,next)
})

module.exports = router