const productos = [
    {
        name: 'Jabon Solido Natural', 
        price: '800', 
        thumbnail: 'https://i.pinimg.com/originals/12/e7/c5/12e7c5126d992244719b7070788c5b17.jpg',
        id: 1
    },
    {
        name: 'Shampoo', 
        price: '800', 
        thumbnail: 'https://i.pinimg.com/originals/12/e7/c5/12e7c5126d992244719b7070788c5b17.jpg',
        id: 2
    },
    {
        name: 'Jabon Solido Aromatico', 
        price: '800', 
        thumbnail: 'https://i.pinimg.com/originals/12/e7/c5/12e7c5126d992244719b7070788c5b17.jpg',
        id: 3
    }
]

function getAll(){
    return productos
}

function save(objeto){
    let data = getAll()
    data.push(objeto)
    for(let i= 0; i< data.length; i++){
        data[i].id=  i+1
    }
    return data
}

function getById(id){
    let data = getAll()
    return data.find(prod => prod.id === id)
}

function deleteById(id){
    let data = getAll()
    const deleted = data.filter(prod => prod.id !== id)
    console.log("Producto eliminado", deleted)
}

function updateProduct(id,productoNuevo){
        const productos = this.getAll()
        const index = productos.findIndex(prod => prod.id === id)
        if(productoNuevo.name){productos[index].name= productoNuevo.name}
        if(productoNuevo.price){productos[index].price=productoNuevo.price}
        if(productoNuevo.thumbnail){productos[index].thumbnail=productoNuevo.thumbnail}
        return `El producto ${productoNuevo.name} fue actualizado correctamente`
}


module.exports = {getAll,save,getById,deleteById,updateProduct}