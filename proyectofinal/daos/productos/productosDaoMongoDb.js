import basicMongoDb from "../../classes/dbMongoDbClass.js";
import mongoose from "mongoose";


const schema = new mongoose.Schema({
    _id: { type: String, required: true, max: 50 },
    timestamp: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 400 },
    codigo: { type: Number, required: true },
    foto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true }
})
const model = mongoose.model('productos', schema)


export default class Productos extends basicMongoDb {
    constructor(connection) {
        super(connection)
    }

    getAll = async () => await model.find({})

    getById = async (id) => {
        const result = await model.find({ _id: id }).limit(1)
        return result[0]
    }

    addProduct = async (newProduct) => {
        const productToSave = new model(newProduct)
        await productToSave.save()
        return 'ok'
    }

    deleteProduct = async ({ id }) => {
        await model.deleteOne({ _id: id })
        return 'ok'
    }

    modifyProduct = async (product) => {
        const { id, nombre, descripcion, codigo, precio, stock, foto } = product
        await model.updateOne({ _id: id }, {
            $set: {
                nombre: nombre,
                descripcion: descripcion,
                codigo: codigo,
                precio: precio,
                stock: stock,
                foto: foto,
            }
        })
        return 'ok'
    }
}