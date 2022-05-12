import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import basicFirebase from "../../classes/dbFirebaseClass.js";
import pkg from 'firebase-admin';
const { firestore } = pkg

export default class Carrito extends basicFirebase {
    constructor(connection, collection) {
        super(connection, collection)
    }

    createCart = async (storageId) => {
        const id = storageId || uuidv4()
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)')
        await this.query.doc(id).create({ timestamp: timestamp, productos: [] })
        return id
    }

    locateCart = async (id) => {
        let query = await this.query.doc(id).get()
        return query.exists ? id : this.createCart(id)
    }

    addToCart = async (carrito_id, producto) => {
        let query = await this.query
            .doc(carrito_id)
            .collection('productos')
            .doc(producto.id).get()

        if (query.exists) {
            const qant = producto.cantidad
            this.query
                .doc(carrito_id)
                .collection('productos')
                .doc(producto.id)
                .update({ cantidad: firestore.FieldValue.increment(qant) })
        } else {
            const id = producto.id
            delete producto.id
            await this.query
                .doc(carrito_id)
                .collection('productos')
                .doc(id).create(producto)
        }
        return carrito_id
    }

    showCart = async ({ id }) => {
        const productos = await this.query
            .doc(id)
            .collection('productos')
            .get()
        return productos.docs.map(doc => this.docMap(doc))
    }

    emptyCart = async ({ id }) => {
        await this.query.doc(id).delete()
        return 'deleted'
    }

    removeProduct = async (id_cart, id_product) => {
        await this.query
            .doc(id_cart)
            .collection('productos')
            .doc(id_product)
            .delete()
        return 'removed'
    }

    addToCartAlt = async (id_cart, id_prod) => {
        await this.query
            .doc(id_cart)
            .collection('productos')
            .doc(id_prod)
            .update({ cantidad: firestore.FieldValue.increment(1) })
        return 'added'
    }
}