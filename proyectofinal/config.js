import mongoose from 'mongoose'
import admin from 'firebase-admin'

export const connect = {

    files: {
        productos: './public/productos.json',
        carrito: './public/carrito.json'
    },

    mongodb: async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log('MongoDb: conexión exitosa')
        }
        catch (err) { console.log('MongoDB: ', err) }
    },

    firebase: async () => {
        try {
            const serviceAccount = './backend-yunes-firebase-adminsdk-hvfe3-ada914fe50.json'
            admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
            console.log('Firebase: conexión exitosa')
        }
        catch (err) { console.log('Firebase: ', err) }
    }
}

