import admin from 'firebase-admin'

export default class basicFirebe {
    constructor(connection, collection) {

        !admin.apps.length && connection()
        this.db = admin.firestore()
        this.query = this.db.collection(collection)
    }

    docMap = (doc) => { return { id: doc.id, ...(doc.data()) } }
}