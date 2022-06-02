import path from "path"

let getLogin = function (req, res) {
    if(req.isAuthenticated()){
        console.log('User logueado')
        res.sendFile(path.join(process.cwd(), 'src/views/index.html'))
    } else{
        console.log('Usuario no logueado')
        res.sendFile(path.join(process.cwd(), 'src/views/login.html'))
    }
}

let postLogin = function(req, res){
    let user = req.user
    process.env.USER = req.user
    res.redirect('/')
}

let getFailLogin = function(req, res){
    console.log('Error en el login')
    res.sendFile(path.join(process.cwd(), 'src/views/loginError.html'))
}

let getSignup = function(req, res){
    res.sendFile(path.join(process.cwd(), 'src/views/register.html'))
}

let postSignup = function(req, res){
    let user = req.user;
    res.sendFile(path.join(process.cwd(), 'src/views/login.html'))
}

let getFailSignup  = function(req, res){
    console.log('Error en el registro')
    res.sendFile(path.join(process.cwd(), 'src/views/registerError.html'))
}

let getLogout = function(req, res){
    req.logout()
    res.redirect('/logout');
}
export default {
    getLogin,
    postLogin,
    getFailLogin,
    getSignup,
    postSignup,
    getFailSignup,
    getLogout
}