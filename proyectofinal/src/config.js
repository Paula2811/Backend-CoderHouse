import admin from 'firebase-admin'

const config = {
    mongodb: {
        url: 'mongodb+srv://paula:facundonicolas03@cluster0.atwkp.mongodb.net/?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
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

export default config;