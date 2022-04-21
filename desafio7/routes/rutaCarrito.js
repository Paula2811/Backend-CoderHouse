const { Router } = require('express');
const controllerCarito = require('../controller/controllerCarito')
const carritoRouter = Router();


carritoRouter.post('/', controllerCarito.newCarrito)

carritoRouter.delete('/:id', controllerCarito.deleteCarrito)

carritoRouter.get('/:id/productos', controllerCarito.productosCarrito)

carritoRouter.post('/:id/productos', controllerCarito.addNewProduct)

carritoRouter.delete('/:id/productos/:idProducto', controllerCarito.deleteProduct)

module.exports = carritoRouter;