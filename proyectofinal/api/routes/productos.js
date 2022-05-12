import express from 'express';
const api = express.Router();

// Productos Controllers
import * as controller from '../../controllers/productosController.js'

//? Middleware =================================================================

api.use(controller.middlewareProductos)

//? Rutas API/PRODUCTOS/ =======================================================

api.get('/:id?', controller.getProducts)

api.post('/', controller.postProducts)

api.route('/:id')

    .put(controller.modifyProducts)

    .delete(controller.deleteProducts)

export { api as productos }