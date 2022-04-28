const Contenedor = require('../service/Contenedor');
const producto = new Contenedor('productos.json');
const { Databases } = require('../options/DB/Database');
const { optionsMaria } = require('../options/mariadb');
const db = new Databases(optionsMaria, 'productos')

// Listar todos los productos 

let listaProductos = async function (req, res) {
    let resp = await db.getAll().length !== 0
        ? { productos: await db.getAll() }
        : { error: 'producto no encontrado' }
    res.json(resp)

}
//Listar un producto por su id
let productoid = async function (req,res){
    const { id } = req.params;
    let resp = await db.getById(id)
    ? { productos: await db.getById(id) }
    : { error: 'producto no encontrado' }
    res.json( resp )
}

//Incorporar producto nuevo 
let nuevoProducto= async function (req, res) {
    let { price, title, thumbnail } = req.body
    let producto = {
        price: parseInt(price),
        title,
        thumbnail
    }
    await  db.save(producto)
    res.redirect("/")
}

//actualiza listaProductos
let productoActualizado = async function (req, res) {
    const { id } = req.params;
    let resp = await  db.update(parseInt(id), req.body)
    ? { productos:await db.update(parseInt(id), req.body) }
    : { error: 'error al actualizar el producto' }
    res.json( resp )
}

//Borrar un producto por su id
let eliminarProducto = async function (req, res){
    const { id } = req.params;
    res.json({
        msg:await db.deleteById(parseInt(id))
            ? 'producto eliminado'
            : 'no se pudo eliminar el producto o el producto no existe'
    })
}

module.exports = {
    listaProductos,
    nuevoProducto,
    productoActualizado,
    eliminarProducto,
    productoid
}