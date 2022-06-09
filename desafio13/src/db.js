import {
    connect
} from "mongoose";
import {
    MONGODB_URI
} from "./global/config"
import MongoStore from 'connect-mongo'

export const connectDB = async () => {
    try {
        await connect(MONGODB_URI);
        console.log("Base de datos conectada")

    } catch (err) {
        throw new Error("Error al conectarse a la base de datos", err)
    }

}

export const connection = {
    cookies: {
        secret: 'coderhouse',
        resave: true,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 60000
        },
        name: 'session.with.atlas',
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        })
    }
}