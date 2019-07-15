const helpers = {}
const bcrypt = require('bcryptjs')
const {user_status} = require ('../lib/static/enums')
helpers.encryptPwd = async (pwd) => {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(pwd, salt)
    return hash
}

helpers.comparePwd = async (pwd, savedHash) => {
    return await bcrypt.compare(pwd, savedHash)
}

helpers.isLoggedIn = (req, res, next) => {
    res.cookie("is_rrhh",(req.user!=null && req.user.IsRRHH)? true: false)
    if (req.isAuthenticated() ) {
        return next()
    }
    else {
        return res.redirect('/auth/login')
    }
}

helpers.checkFirstLogin = (req, res, next)=>{
    if(req.user.IsFirstLogin){
        res.redirect('/dashboard/cambiar_clave')
    }
    else{
        return next()
    }
}

helpers.notCheckFirstLogin = (req, res, next)=>{
    if(!req.user.IsFirstLogin){
        res.redirect('/dashboard')
    }
    else{
        next()
    }
}


helpers.isNotLoggedIn = (req, res, next) => {
    res.clearCookie("is_rrhh")
    if (req.isAuthenticated() && req.path != '/logout') {
        return res.redirect('/dashboard')
    }
    else {
        return next()
    }
}

helpers.isRRHH = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.IsRRHH) {
        return next()
    }
    return res.redirect('/dashboard')
}

module.exports = helpers