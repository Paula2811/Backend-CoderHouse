import mongoose from "mongoose";


class ContenedorMongoDb{
    constructor(nombreColeccion, esquema){
        this.coleccion = mongoose.model(nombreColeccion,esquema);
    }

    async getAll(){
        const items = await this.coleccion.find();
        return items
    }

    async getById(id){
        const item = await this.coleccion.findById(id);
        return item
    }

    async save(objeto){
        const{_id}= await this.coleccion.create(objeto)
        return _id
    }

    async update(id, data){
        const item = await this.coleccion.findByIdAndUpdate(id,data);
        if(!item) throw new Error('Item no found')
    }

    async deleteById(id){
        const item = await this.coleccion.deleteOne(id)
        if(!item) throw new Error('Item no found')
    }

    async deleteAll(){
        await this.coleccion.deleteMany()
    }
}

export default ContenedorMongoDb