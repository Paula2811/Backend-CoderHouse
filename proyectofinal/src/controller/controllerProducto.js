import { productoDao } from '../daos/index.js';

const producto = productoDao

// Listar todos los productos o un producto por su id

let listaProductos = async function (req, res) {
    res.json({
        data: req.params.id
        ? await producto.getById(parseInt(req.params.id)) 
        : await producto.getAll()
    })
}

//Incorporar producto nuevo 
let nuevoProducto= async function (req, res) {
    await producto.save(req.body)
    res.json({
        data: req.body
    })
}

//actualiza listaProductos
let productoActualizado = async function (req, res) {
    await producto.update(parseInt(req.params.id), req.body)
    res.json( { 
        message: 'Actualizado',
        code: 200
    } )
}

//Borrar un producto por su id
let eliminarProducto = async function (req, res){
    await producto.deleteById(parseInt(req.params.id))
    res.json( { 
        message: 'Eliminado',
        code: 200
    } )
}

export default  {
    listaProductos,
    nuevoProducto,
    productoActualizado,
    eliminarProducto
}