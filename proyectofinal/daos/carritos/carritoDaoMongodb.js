import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import basicMongoDb from "../../classes/dbMongoDbClass.js";

const prodSchema = new mongoose.Schema({
    id: { type: String, required: true, max: 50 },
    timestamp: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 400 },
    codigo: { type: Number, required: true },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    cantidad: { type: Number, required: true },
}, { _id: false })

const schema = new mongoose.Schema({
    _id: { type: String, required: true, max: 50 },
    timestamp: { type: String, required: true, max: 50 },
    productos: [prodSchema]
})

const cart = mongoose.model('carritos', schema)

export default class Carrito extends basicMongoDb {
    constructor(connection) {
        super(connection)
    }

    createCart = async (storageId) => {

        const id = storageId || uuidv4()
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)')
        const cartToSave = new cart({ _id: id, timestamp: timestamp, productos: [] })
        await cartToSave.save()
        return id
    }

    locateCart = async (id) => {
        const verifyId = await cart.find({ _id: id })
        if (verifyId.length > 0) return id
        else return this.createCart(id)
    }

    addToCart = async (carrito_id, producto) => {

        const result = await cart.findOne({
            $and: [{ _id: carrito_id }, { "productos.id": producto.id }]
        })

        if (result) {
            let oldQant = result.productos
                .find(prod => prod.id === producto.id).cantidad
            const newQant = oldQant + producto.cantidad

            await cart.findOneAndUpdate(
                { $and: [{ _id: carrito_id }, { "productos.id": producto.id }] },
                { $set: { "productos.$.cantidad": newQant } })
        }
        else {
            await cart.updateOne({ _id: carrito_id },
                { $push: { productos: producto } })
        }
        return carrito_id
    }

    showCart = async ({ id }) => {
        const myCart = await cart.findOne({ _id: id })
        return myCart.productos
    }

    emptyCart = async ({ id }) => {
        await cart.deleteOne({ _id: id })
        return 'deleted'
    }

    removeProduct = async (id_cart, id_product) => {
        await cart.updateOne({ _id: id_cart },
            { $pull: { productos: { id: id_product } } }
        )
        return 'removed'
    }

    addToCartAlt = async (id_cart, id_prod) => {

        const result = await cart.findOne({
            $and: [{ _id: id_cart }, { "productos.id": id_prod }]
        })
        let qant = result.productos
            .find(prod => prod.id === id_prod).cantidad
        qant++
        await cart.findOneAndUpdate(
            { $and: [{ _id: id_cart }, { "productos.id": id_prod }] },
            { $set: { "productos.$.cantidad": qant } })
        return 'added'
    }
}