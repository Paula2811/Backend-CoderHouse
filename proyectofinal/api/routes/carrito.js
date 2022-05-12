// Carrito Controler
import express from 'express';
import * as controller from '../../controllers/carritoController.js'

const api = express.Router();

//? Rutas API/CARRITO/

//Crear carrito y agregar producto
api.post('/', controller.newItem)

// Borrar Carrito
api.delete('/:id', controller.delCart)


api.route('/:id/productos')

    .get(controller.listItems) // Listar productos
    .post(controller.addItem) // Agregar producto

// Borrar producto
api.delete('/:id/productos/:id_prod', controller.delItems)

export { api as carrito }