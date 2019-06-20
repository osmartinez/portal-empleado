const express = require('express')
const router = express.Router()
const {isLoggedIn, checkFirstLogin, notCheckFirstLogin} = require('../lib/authenticationHelpers')
const fs = require('fs');
const path = require('path')
const db = require('../db')
const TYPES = require('tedious').TYPES

router.get('/',isLoggedIn,checkFirstLogin,(req,res)=>{
    res.render('dashboard/index',{title: 'Portal web'})
})

// rutas mail
router.get('/mail',isLoggedIn,checkFirstLogin,(req,res)=>{
    res.render('dashboard/mail/mail',{title: 'Mensajería'})
})
// fin rutas mail

// Rutas cambiar clave
router.get('/cambiar_clave',isLoggedIn,notCheckFirstLogin, async (req,res)=>{
    res.render('dashboard/cambiar_clave',{title: 'Cambio de clave', success: 'Es la primera vez que accedes al portal, por favor cambia tu clave de usuario'})
})



router.post('/cambiar_clave',isLoggedIn,notCheckFirstLogin, async (req,res)=>{
    params = []
    db.buildParams(params, 'Id',TYPES.Int, req.user.Id)
    db.buildParams(params, 'NewPassword', TYPES.NVarChar, req.body.password)
    db.procedure('ChangePasswordByUserId',params, (results)=>{
        result = results.length==1 && results[0].result == 1
        if(result){
            res.redirect('/dashboard')
        }
        else{
            res.redirect('/dashboard/cambiar_clave')
        }
    })

})
// Fin cambiar clave

// Rutas info personal
router.get('/info_personal',isLoggedIn,checkFirstLogin,async (req,res)=>{
    params = []
    db.buildParams(params, 'Id', TYPES.Int, req.user.Id)
    db.procedure('FindUserInformationByUserId',params, (rows)=>{
        let info = rows.length == 1?rows[0]:{}
        res.render('dashboard/info_personal/index',{title: 'Perfil',user_info: info})
    })
})
// fin info personal

// RUtas sugerencias
router.get('/sugerencias',isLoggedIn,checkFirstLogin,(req,res)=>{
    res.render('dashboard/sugerencias',{title: 'Sugerencias'})
})

router.post('/sugerencias',isLoggedIn,checkFirstLogin,async(req,res)=>{
    const {subject, body} = req.body
    const res_obj = { title: 'Sugerencias'}
    params=[]
    db.buildParams(params, 'Subject', TYPES.NVarChar, subject)
    db.buildParams(params, 'Body', TYPES.NVarChar, body)
    db.procedure('InsertAnonymousSuggestion',params, (results)=>{
        result = results.length==1 && results[0].result == 1
        if(result){
            res_obj.success = 'Tu sugerencia ha sido registrada correctamente'
        }
        else{
            res_obj.message = 'Ha ocurrido un error al registrar la sugerencia'
        }
        res.render('dashboard/sugerencias',res_obj)
    })
})
// fin sugerencias

// Rutas nominas
router.get('/nominas',isLoggedIn,checkFirstLogin, async (req,res)=>{
    res.render('dashboard/nominas/index',{title: 'Mis nóminas', nominas : []})
})

router.get('/nominas/ver',isLoggedIn,checkFirstLogin, (req, res)=>{
    
    console.log(ruta)
  })
// fin nominas

module.exports = router