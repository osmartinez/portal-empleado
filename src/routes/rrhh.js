const express = require('express')
const router = express.Router()
//const { findAllUsers, updateUserStatus, findAllSuggestions,findAllRequestsChangeUserInfo } = require('../lib/queries/rrhhQueries')
const passport = require('passport')
const { isRRHH, checkFirstLogin } = require('../lib/authenticationHelpers')
const { user_status } = require('../lib/static/enums')
const db = require('../db')

router.get('/', isRRHH, checkFirstLogin, (req, res) => {
    res.render('rrhh/index', { title: 'Administración' })
})

// Crear nuevo empleado
router.get('/nuevo_empleado', isRRHH, checkFirstLogin, (req, res) => {
    res.render('rrhh/nuevo_empleado', { title: 'Nuevo empleado' })
})

router.post('/nuevo_empleado', isRRHH, checkFirstLogin, (req, res, next) => {
    passport.authenticate('local.registrar', {
        successRedirect: '/rrhh/nuevo_empleado',
        failureRedirect: '/rrhh/nuevo_empleado',
        failureFlash: true,
    })(req, res, next)
})
// Fin crear nuevo empleado

// Gestionar empleados
router.post('/gestionar_empleados/bloquear', isRRHH, checkFirstLogin, async (req, res) => {
    const { id } = req.body
    res.send(await updateUserStatus(id, user_status.BLOCKED))
})

router.post('/gestionar_empleados/activar', isRRHH, checkFirstLogin, async (req, res) => {
    const { id } = req.body
    res.send(await updateUserStatus(id, user_status.ACTIVE))
})

router.post('/gestionar_empleados/suspender', isRRHH, checkFirstLogin, async (req, res) => {
    const { id } = req.body
    res.send(await updateUserStatus(id, user_status.BANNED))
})

router.get('/gestionar_empleados', isRRHH, checkFirstLogin, async (req, res) => {
    db.procedure('FindAllUsers', null, (users) => {
        for (let user of users) {
            switch (user.status) {
                case user_status.BLOCKED:
                    user.blocked = true
                    user.banned = false
                    user.active = false
                    break
                case user_status.BANNED:
                    user.blocked = false
                    user.banned = true
                    user.active = false
                    break
                case user_status.ACTIVE:
                    user.blocked = false
                    user.banned = false
                    user.active = true
                    break
                default:
                    user.blocked = false
                    user.banned = false
                    user.active = false
                    break
            }
        }

        res.render('rrhh/gestionar_empleados', { title: 'Empleados', users: users })
    })
})
// Fin gestionar empleados

// inicio tablon sugerencias

router.get('/tablon_sugerencias', isRRHH, checkFirstLogin, async (req, res) => {
    db.procedure('FindAllSuggestions', null, (sugerencias) => {
        res.render('rrhh/tablon_sugerencias', { title: 'Sugerencias', sugerencias: sugerencias })
    })
})

// fin tablon sugerencias

// inicio solicitudes cambio info
router.get('/solicitudes_cambio_info', isRRHH, checkFirstLogin, async (req, res) => {
    const solicitudes = []
    res.render('rrhh/solicitudes_cambio_info', { title: 'Rectificación', solicitudes: solicitudes })
})
// fin solicitudes
module.exports = router
