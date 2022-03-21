const Contenedor = require('./desafio2.js')
const productos = require('./productos.js')


const producto = new Contenedor("./produstos.txt")
producto.save(productos) 
//producto.getById(1)
//producto.getAll()
//producto.deleteById(1)
//producto.deleteAll()
