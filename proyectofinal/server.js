// Express
import express from 'express'
import dotenv from 'dotenv'
import router from './api/api.js'

const app = express()
dotenv.config()

// Variable Global de permiso de Usuario
global.userLogin = 0

// Config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Config Public
app.use(express.static('public'))

// Router/Api
router(express, app)

//? Server ========================================

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
    console.log(`Oyendo desde ${server.address().port} - http://localhost:${PORT}`)
})
server.on('error', error => console.log('ha habido un error: ', error))

