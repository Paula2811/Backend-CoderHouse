const { Router } = require('express');
const controllerProducto = require('../controller/controllerProducto.js')
const productosRouter = Router()

productosRouter.get('/', controllerProducto.listaProductos)

productosRouter.get('/:id', controllerProducto.productoid)

productosRouter.post('/', controllerProducto.nuevoProducto)

productosRouter.put('/:id', controllerProducto.productoActualizado)

productosRouter.delete('/:id', controllerProducto.eliminarProducto)

module.exports = productosRouter;