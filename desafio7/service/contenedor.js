const fs = require ('fs')

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }

    save(objeto){
        try{
            let data = this.getAll();
            let timestamp = Date.now();
            let codigo = `${timestamp}/${data.length}`
            const nuevoProducto= {...objeto, id: data.length + 1, timestamp: timestamp, codigo: codigo}
            data.push(nuevoProducto)
            fs.writeFileSync(this.archivo,JSON.stringify(data))
        }catch (error) {
            throw new Error(error,'No se pudo guardar el producto')
        }
    }

    getAll(){
        try{
            let contenido =  fs.readFileSync(this.archivo,"utf-8")
            return JSON.parse(contenido)
        } catch(error){
            throw new Error(error,"Error al leer el archivo")
        }
    }

    getById(id){
        try{
            const contenido = this.getAll()
            let idencontrado = contenido.find(prod => prod.id === id)
            return idencontrado
        }catch(error){
            throw new Error(error,"Error al traer el producto")
        }
    }
    deleteById(id){
        try{
            const contenido = this.getAll()
            const deleted = contenido.filter(producto => producto.id !== id)
            fs.writeFileSync(this.archivo, JSON.stringify(deleted,null,4))
            console.log('Elemento eliminado')
            console.table(deleted)
        }catch(error){
            throw new Error(error,"Error al borrar el producto")
        }
    }

    deleteAll(){
        try{
            fs.writeFileSync(this.archivo, []);
            console.log("Contenido borrado")
        } catch(error){
            throw new Error(error,"Error al borrar todo")
        }
    }
    updateProduct(id,body){
        const data = this.getAll()
        const producto = data.find(producto => producto.id === id)
        if(producto){
            data.forEach(element =>{
                if(element.id === id){
                    element.title = body.title
                    element.price =body.price
                    element.thumbnail = body.thumbnail
                    element.descripcion = body.descripcion
                    element.stock = body.stock
                }
            })
            try{
                fs.writeFileSync(this.archivo,JSON.stringify(data,null,4))
                return producto
            } catch(error){
                throw new Error('No se pudo actualizar el producto')
            }
        } else {
            return false
        }
    }
}

module.exports = Contenedor;