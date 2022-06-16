import passport from 'passport';
import path from 'path';


const login = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/login.html'))
}

const loginError = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/loginError.html'))
}

const register = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/register.html'))
}

const registerError = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/registerError.html'))
}

const verification = passport.authenticate('login', {
    successRedirect: '/index',
    failureRedirect: '/login-error'
})

const createUser = passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register-error'
})

const index = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src/views/index.html'))
}

const logout = (req, res, next) => {
    res.sendFile(path.join(process.cwd(), 'src/views/logout.html'))
    res.clearCookie('session.with.atlas')
    req.session.destroy(err => {
        err && res.status(500)
            .send('Hubo un error en su solicitud: Ya está deslogueado')
    })
}

export default {
    login,
    loginError,
    register,
    registerError,
    verification,
    createUser,
    logout,
    index
}