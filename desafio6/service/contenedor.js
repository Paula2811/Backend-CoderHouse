const fs = require ('fs')

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }

    save(objeto){
        try{
            let data = this.getAll();
            const nuevoProducto= {...objeto, id: data.length + 1}
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
            console.table(idencontrado)
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
    updateProduct(id,productoNuevo){
        const contenido = this.getAll()
        const index = contenido.findIndex(prod => prod.id === id)
        if(productoNuevo.title){contenido[index].title= productoNuevo.title}
        if(productoNuevo.price){contenido[index].price=productoNuevo.price}
        if(productoNuevo.thumbnail){contenido[index].thumbnail=productoNuevo.thumbnail}
        return `El producto ${productoNuevo.title} fue actualizado correctamente`
}
}

module.exports = Contenedor;