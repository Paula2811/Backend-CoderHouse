const fs = require ('fs')

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }

    save(objeto){
        try {
            let data = this.getAll()
            data.push(objeto)
            for(let i= 0; i< data.length; i++){
                data[i].id= 1+ i
            }
            console.table(data)
            fs.writeFileSync(this.archivo,JSON.stringify(data))
            
        } catch (error) {
            throw new Error(error,'No se pudo guardar el producto')
        }
    }

    getById(id){
        try{
            const contenido = this.getAll()
            return contenido.find(prod => prod.id === id)
            //console.table(idencontrado)
        }catch(error){
            throw new Error(error,"Error al traer el producto")
        }
    }

    getAll(){
        try{
            let contenido = fs.readFileSync(this.archivo, "utf8");
            return JSON.parse(contenido)
        } catch(error){
            throw new Error(error,"Error al leer el archivo")
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
    
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.archivo, []);
            console.log("Contenido borrado")
        } catch(error){
            throw new Error(error,"Error al borrar todo")
        }
    }

    updateProduct(id,productoNuevo){
        try{
            const productos = this.getAll()
            const index = productos.findIndex(prod => prod.id === id)
            if(productoNuevo.name){productos[index].name= productoNuevo.name}
            if(productoNuevo.price){productos[index].price=productoNuevo.price}
            if(productoNuevo.thumbnail){productos[index].thumbnail=productoNuevo.thumbnail}
            return `El producto ${productoNuevo.name} fue actualizado correctamente`
        } catch(error){
            throw new Error(error,"Error al actualizar el producto")
        }
        
    }
}

module.exports = Contenedor;