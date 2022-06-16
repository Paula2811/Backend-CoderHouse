import express from "express"
import session from 'express-session'
import path from "path"
import passport from "passport"
import * as strategy from "./authentication/strategy.js"
import { connection } from "./db.js"
import routerProducto from './routes/routes.js'
import apiInfo from "./routes/apiInfo.js"
import apiRandom from "./routes/apiRandom.js"
import apiAuth from "./routes/auth.js"

const app = express()

app.use(session(connection.cookies))
passport.use('register', strategy.register)
passport.use('login', strategy.login)
passport.serializeUser(strategy.serialize)
passport.deserializeUser(strategy.deserialize)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


//Rutas
app.use('/api/',routerProducto)
app.use(apiInfo)
app.use(apiRandom)
app.use(apiRandom)
app.use(apiAuth)

export default app;