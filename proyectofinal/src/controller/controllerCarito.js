import {carritoDao} from '../daos/index.js'
const c = carritoDao

let newCarrito =async function (req, res){
    let carrito =await c.createCarrito()
    res.json( {
        carrito: carrito,
        code: 200
    })

}

//Vacia un carrito y lo elimina
let deleteCarrito =async function (req, res){
    await c.deleteCarrito(parseInt(req.params.id))
    res.json( {
        message: "Carrito eliminado", 
        code: 200
    })
}

//Lista todos los productos del carrito
let productosCarrito =async function (req, res){
    let carrito =await c.getCarrito(parseInt(req.params.id))
    res.json( {
        carrito : carrito,
        code: 200 
    })
}

//Incorpora productos
let addNewProduct =async function (req, res){
    const {id} = req.params
    const producto = req.body
    const data =await c.addProductInCarrito(id, producto)
    res.json({
        carrito: data,
        code:200
    })
}

//Elimina un producto
let deleteProduct =async function (req, res){
    const { id } = req.params
    const { idProducto } = req.params
    let data =await  c.deleteProductInCarrito(id,idProducto)
    res.json({
        carro: data,
        code:200
    })
}

export default{
    deleteProduct,
    newCarrito,
    deleteCarrito,
    productosCarrito,
    addNewProduct,
}