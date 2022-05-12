import basicFirebase from "../../classes/dbFirebaseClass.js";


export default class Productos extends basicFirebase {
    constructor(connection, collection) {
        super(connection, collection)
    }

    getAll = async () => {
        try {
            const query = await this.query.get()
            return query.docs.map(doc => this.docMap(doc))
        } catch (err) { console.log('Firebase error: ', err) }
    }

    getById = async (id) => {
        try {
            const query = await this.query.doc(id).get()
            return this.docMap(query)
        } catch (err) { console.log('Firebase error: ', err) }
    }

    addProduct = async (product) => {
        try {
            const doc = this.query.doc(product.id)
            delete product.id
            await doc.create(product)
            return 'ok'
        } catch (err) { console.log('Firebase error: ', err) }
    }

    deleteProduct = async ({ id }) => {
        try {
            await this.query.doc(id).delete()
            return 'ok'
        } catch (err) { console.log('Firebase error: ', err) }
    }

    modifyProduct = async (product) => {
        try {
            const id = product.id
            delete product.id; delete product.editMode
            const doc = this.query.doc(id).update(product)
            return 'ok'
        } catch (err) { console.log('Firebase error: ', err) }
    }
}
