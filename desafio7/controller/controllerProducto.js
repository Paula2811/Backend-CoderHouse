const Contenedor = require('../service/Contenedor');
const producto = new Contenedor('productos.json');

// Listar todos los productos o un producto por su id

let listaProductos = function (req, res) {
    res.json({
        data: req.params.id
        ? producto.getById(parseInt(req.params.id)) 
        : producto.getAll()
    })
}

//Incorporar producto nuevo 
let nuevoProducto= function (req, res) {
    producto.save(req.body)
    res.json({
        data: req.body
    })
}

//actualiza listaProductos
let productoActualizado = function (req, res) {
    producto.updateProduct(parseInt(req.params.id), req.body)
    res.json( { 
        message: 'Actualizado',
        code: 200
    } )
}

//Borrar un producto por su id
let eliminarProducto = function (req, res){
    producto.deleteById(parseInt(req.params.id))
    res.json( { 
        message: 'Eliminado',
        code: 200
    } )
}

module.exports = {
    listaProductos,
    nuevoProducto,
    productoActualizado,
    eliminarProducto
}