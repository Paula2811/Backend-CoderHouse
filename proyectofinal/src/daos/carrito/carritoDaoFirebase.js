import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import basicFirebase from "../../classes/dbFirebaseClass.js";
import pkg from 'firebase-admin';
const { firestore } = pkg

export default class Carrito extends basicFirebase {
    constructor(connection, collection) {
        super(connection, collection)
    }

    createCarrito = async (storageId) => {
        const id = storageId 
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)')
        await this.query.doc(id).create({ timestamp: timestamp, productos: [] })
        return id
    }

    carritos = async (id) => {
        let query = await this.query.doc(id).get()
        return query.exists ? id : this.createCart(id)
    }

    addProductInCarrito = async (carrito_id, producto) => {
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


    deleteCarrito = async ({ id }) => {
        await this.query.doc(id).delete()
        return 'deleted'
    }

    deleteProductInCarrito = async (id_cart, id_product) => {
        await this.query
            .doc(id_cart)
            .collection('productos')
            .doc(id_product)
            .delete()
        return 'removed'
    }

}