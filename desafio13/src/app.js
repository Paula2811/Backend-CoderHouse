import express from "express"
import path from "path"
import routerProducto from './routes/routes.js'
import apiInfo from "./routes/apiInfo"
import apiRandom from "./routes/apiRandom"
import apiAuth from './routes/auth'
import session from 'express-session'
import {
    connection
} from "./db.js"
import passport from 'passport'
import * as strategy from './authentication/strategy'

const app = express()

//--------------------------------------------------------------------------------------//
app.use(session(connection.cookies))
passport.use('register', strategy.register)
passport.use('login', strategy.login)
passport.serializeUser(strategy.serialize)
passport.deserializeUser(strategy.deserialize)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//------------------------------------Rutas--------------------------------------------//
app.use('/api/', routerProducto);
app.use(apiInfo)
app.use(apiRandom)
app.use(apiAuth)

export default app