const express = require('express')
const routerProductos = express.Router()
const {getAll,save,getById,deleteById,updateProduct} = require('../service/contenedor.js')


//1- Obtener todos los productos
routerProductos.get('/',(req, res) => {
    res.send(getAll())
    let resp = getAll().length !=0
    ? {productos: getAll()}
    : {error: 'Producto no encontrado'}
    res.json(resp)
})

//2-Obtener un producto segun la id
routerProductos.get('/:id',(req, res) => {
    const {id} = req.params.id
    let resp = getById(parseInt(id))
    ? {producto: getById(parseInt(id))}
    :{error: 'Producto no encontrado'}
    res.json(resp)
})

//3-Agrega un producto
routerProductos.post('/',(req, res)=>{
    let resp =save(req.body)
    res.redirect('/productos/vista')
})

//4- Actualiza un producto segun id 
routerProductos.put('/:id',(req, res)=>{
    const {id} = req.params.id
    let productoNuevo = req.body
    let resp = updateProduct(parseInt(id),productoNuevo)
    res.json(resp)
})

//5-Elimina un producto segun id
routerProductos.delete('/:id',(req, res)=>{
    const {id} = req.params.id
    let resp = deleteById(parseInt(id))
    res.json(resp)
})

module.exports = routerProductos