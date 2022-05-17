import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js'
import config from '../../config.js'
import mongoose from "mongoose";

try {
    mongoose.connect(config.mongodb.url, config.mongodb.options)
    console.log("Connected to MongoDB Carrito");
} catch (error) {
    console.log(error);
};

const prodSchema = new mongoose.Schema({
    title: {type:String, required: true},
    price: {type:String, required: true},
    thumbnail: {type:String, required: true},
    stock: {type: Number, required:true},
    timestamp:{type: Number, required:true, default:Date.now()},
    descripcion: {type:String, required:true},
    id:{type: Number,required:true}
})

const schema = new mongoose.Schema({
    timestamp: { type: Number },
    productos: { type: Array },
})

class CarritoDaoMongo extends ContenedorMongoDb{
    constructor(){
        super('carrito',schema)
    }
    async carritos() {
        const items = await this.coleccion.find();
        return items
    }
    async createCarrito() {
        const carrito = {id: 1, timestamp: Date.now(),productos: []}
        await this.save(carrito)
        return carrito
    }

    async getCarrito(id) {
        const carritoId = await this.collection.findOne({_id: id})
        return id
    }

    async deleteCarrito(id) {
        try {
            let carrito = await this.collection.deleteOne({_id: id});
            return carrito.id;
        } catch (error) {
            throw new Error("No se pudo elimianar el carrito");
        }
    }

    async addProductInCarrito(id, producto) {
        try {

            const cart = await this.carritos();
            const cartIndex = cart.findIndex((e) => e.id === Number(id));
            const productsInCart = cart[cartIndex].productos;
            if (cart[cartIndex].productos.length === 0) {
                producto.id = 1;
            } else {
                producto.id = cart[cartIndex].productos.length + 1;
            }
            producto.timestamp = Date.now();
            productsInCart.push(producto);
            await this.collection.updateOne(
                { id: id },
                {
                    $set: { productos: productsInCart },
                }
            )
        } catch (error) {
            console.log(error);
            throw new Error('Error adding product');
        }
    }
    
    async deleteProductInCarrito(id, prodId) {
        try {
            const carts = await this.carritos()
            const cartIndex = carts.findIndex((e) => e.id == id)

            if (cartIndex >= 0) {
                const productsOnCart = carts[cartIndex].productos
                const prodToDeleteIndex = productsOnCart.findIndex((e) => e.id == prodId)
                if (prodToDeleteIndex >= 0) {
                    productsOnCart.splice(prodToDeleteIndex, 1)
                    await this.collection.updateOne(
                        { id: id },
                        {
                            $set: { productos: productsOnCart },
                        }
                    )
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch {
            throw new Error('Error borrando el producto')
        }
    }
    


}

export default CarritoDaoMongo;