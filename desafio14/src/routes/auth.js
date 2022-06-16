import {
    Router
} from "express"
import path from "path"
import authController from "../controller/authController.js"

const apiAuth = Router();
const login = async (req, res, next) => {
    req.isAuthenticated() ? next() : res.sendFile(path.join(process.cwd(), 'src/views/login.html'))
}
//Register
apiAuth.get('/register', authController.register)
apiAuth.post('/register', authController.createUser)
apiAuth.get('/register-error', authController.registerError)

//Login
apiAuth.get('/', authController.login);
apiAuth.post('/login', authController.verification);
apiAuth.get('/index', authController.index)
apiAuth.get('/login-error', authController.loginError);
apiAuth.get('/logout', login, authController.logout);


export default apiAuth