import ContenedorMongoDb from '../../contenedores/ContenedorMongoDb.js'
import config from '../../config.js'
import mongoose from "mongoose";

try {
    mongoose.connect(config.mongodb.url, config.mongodb.options)
    console.log("Connected to MongoDB Products");
} catch (error) {
    console.log(error);
};

class ProductosDaoMongo extends ContenedorMongoDb{
    constructor(){
        super('productos',{
            title: {type:String, required: true},
            price: {type:String, required: true},
            thumbnail: {type:String, required: true},
            stock: {type: Number, required:true},
            timestamp:{type: Number, required:true, default:Date.now()},
            descripcion: {type:String, required:true}
        })
    }
}

export default ProductosDaoMongo;

