import { Router } from 'express';
import controllerCarito from '../controller/controllerCarito.js'
const carritoRouter = Router();


carritoRouter.post('/', controllerCarito.newCarrito)

carritoRouter.delete('/:id', controllerCarito.deleteCarrito)

carritoRouter.get('/:id/productos', controllerCarito.productosCarrito)

carritoRouter.post('/:id/productos', controllerCarito.addNewProduct)

carritoRouter.delete('/:id/productos/:idProducto', controllerCarito.deleteProduct)

export default carritoRouter;