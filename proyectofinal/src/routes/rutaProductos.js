import { Router } from 'express'
import controllerProducto from '../controller/controllerProducto.js'
const productosRouter = Router()

productosRouter.get('/:id?', controllerProducto.listaProductos)

productosRouter.post('/', controllerProducto.nuevoProducto)

productosRouter.put('/:id', controllerProducto.productoActualizado)

productosRouter.delete('/:id', controllerProducto.eliminarProducto)

export default productosRouter;