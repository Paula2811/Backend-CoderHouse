import express from 'express'
import login from '../../controllers/loginController.js'

const api = express.Router()

api.post('/', async (req, res) => {
    process.env.PERSIST_MODE = req.body.persist
    process.env.GLOBAL_USER = login(req.body.user)
    process.env.GLOBAL_USER && res.redirect('./productos.html')
})

export { api as login }