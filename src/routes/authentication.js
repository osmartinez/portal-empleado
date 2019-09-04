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

router.get('/loginInternal',isNotLoggedIn,(req,res,next)=>{
    req.body.username = req.query.user
    req.body.password= req.query.pwd

    console.log(req.body)

    passport.authenticate('local.login',{
        failureRedirect: '/auth/login',
        successRedirect: '/dashboard',
        failureFlash: true,
    })(req,res,next)
})


router.post('/login',isNotLoggedIn, (req,res,next)=>{
    console.log(req.body)
    passport.authenticate('local.login', {
        failureRedirect: '/auth/login',
        successRedirect: '/dashboard',
        failureFlash: true,
    })(req,res,next)
})

module.exports = router