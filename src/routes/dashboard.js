const express = require('express')
const router = express.Router()
const {isLoggedIn, checkFirstLogin, notCheckFirstLogin} = require('../lib/authenticationHelpers')
const fs = require('fs');
const path = require('path')


router.get('/',isLoggedIn,checkFirstLogin,(req,res)=>{
    res.render('dashboard/index',{title: 'Portal web'})
})

module.exports = router