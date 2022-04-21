const { Router } = require('express');
const controllerProducto = require('../controller/controllerProducto.js')
const login = require('../middleware/middleware.js');
const productosRouter = Router()

productosRouter.get('/:id?', controllerProducto.listaProductos)

productosRouter.post('/', controllerProducto.nuevoProducto)

productosRouter.put('/:id', controllerProducto.productoActualizado)

productosRouter.delete('/:id', controllerProducto.eliminarProducto)

module.exports = productosRouter;