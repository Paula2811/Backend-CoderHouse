const productos = [
    {
        title: 'Jabon Solido Natural', 
        price: '800', 
        thumbnail: 'https://i.pinimg.com/originals/12/e7/c5/12e7c5126d992244719b7070788c5b17.jpg',
        id: 1
    },
    {
        title: 'Shampoo', 
        price: '800', 
        thumbnail: 'https://i.pinimg.com/originals/12/e7/c5/12e7c5126d992244719b7070788c5b17.jpg',
        id: 2
    },
    {
        title: 'Jabon Solido Aromatico', 
        price: '800', 
        thumbnail: 'https://i.pinimg.com/originals/12/e7/c5/12e7c5126d992244719b7070788c5b17.jpg',
        id: 3
    }
]

function getAll(){
    return productos
}

function save(objeto){
    const nuevoProducto= {...objeto, id: productos.length + 1}
    productos.push(nuevoProducto)
    return productos
}

function getById(id){
    return productos.find(prod => prod.id === id)
}

function deleteById(id){
    const deleted = productos.filter(prod => prod.id !== id)
    console.log("Producto eliminado", deleted)
}

function updateProduct(id,productoNuevo){
        const index = productos.findIndex(prod => prod.id === id)
        if(productoNuevo.title){productos[index].title= productoNuevo.title}
        if(productoNuevo.price){productos[index].price=productoNuevo.price}
        if(productoNuevo.thumbnail){productos[index].thumbnail=productoNuevo.thumbnail}
        return `El producto ${productoNuevo.title} fue actualizado correctamente`
}

module.exports = {getAll,save,getById,deleteById,updateProduct}