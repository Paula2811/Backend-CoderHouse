import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const usuarios = mongoose.model('usuarios', userSchema)

export default class Login {
    constructor() {}

    register = async (user) => {
        new usuarios(user).save()
    }

    findUser = async (user) => {

        let found = await usuarios.findOne({
            email: user
        })
        return found ? {
                email: found.email,
                password: found.password
            } :
            undefined
    }

    logout = (req, res) => {
        req.session.destroy(err => {
            err && res.status(500)
                .send('Hubo un error en su solicitud: Ya está deslogueado')
        })
        res.clearCookie('session.with.atlas')
    }
}