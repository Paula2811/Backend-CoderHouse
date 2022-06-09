import passportLocal from "passport-local";
import bcrypt from 'bcrypt'
import Login from "../models/Usuarios"

const LocalStrategy = passportLocal.Strategy;
const db = new Login()

export const register = new LocalStrategy({
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        const user = await db.findUser(req.body.username)
        if (user) {
            console.log('User ya registrado')
            return done(null, false);
        }
        const newUser = {
            email: username,
            password
        }
        db.register(newUser)
        return done(null, newUser);

    })

export const login = new LocalStrategy(async (username, password, done) => {

    const user = await db.findUser(username)
    if (!user || user.password !== password) {
        return done(null, false)
    }
    return done(null, user)
})

export const serialize = (user, done) => {
    done(null, user.email)
}

export const deserialize = async (username, done) => {
    const user = await db.findUser(username)
    return done(null, user)
}