const Carrito = require('../service/contenedorCarrito.js')
const c = new Carrito('carrito.json')

//Crear un carrito 
let newCarrito = function (req, res){
    let carrito = c.createCarrito()
    res.json( {
        carrito: carrito,
        code: 200
    })

}

//Vacia un carrito y lo elimina
let deleteCarrito = function (req, res){
    c.deleteCarrito(parseInt(req.params.id))
    res.json( {
        message: "Carrito eliminado", 
        code: 200
    })
}

//Lista todos los productos del carrito
let productosCarrito = function (req, res){
    let carrito = c.getCarrito(parseInt(req.params.id))
    res.json( {
        carrito : carrito,
        code: 200 
    })
}

//Incorpora productos
let addNewProduct = function (req, res){
    const {id} = req.params
    const producto = req.body
    const data = c.addProductInCarrito(id, producto)
    res.json({
        carrito: data,
        code:200
    })
}

//Elimina un producto
let deleteProduct = function (req, res){
    const { id } = req.params
    const { idProducto } = req.params
    let data =  c.deleteProductInCarrito(id,idProducto)
    res.json({
        carro: data,
        code:200
    })
}

module.exports = {
    deleteProduct,
    newCarrito,
    deleteCarrito,
    productosCarrito,
    addNewProduct,
}