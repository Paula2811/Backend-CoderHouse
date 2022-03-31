const express = require('express');
const Contenedor = require('./contenedor.js')
const productos = require('./productos.js')



const app = express();
const routerProductos = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',routerProductos)
app.use(express.static('public'))

const producto = new Contenedor("./produstos.txt")

//1- Obtener todos los productos
routerProductos.get('/',(req, res) => {
    let resp = producto.getAll().length !=0
    ? {productos: producto.getAll()}
    : {error: 'Producto no encontrado'}
    res.json(resp)
})

//2-Obtener un producto segun la id
routerProductos.get('/:id',(req, res) => {
    const {id} = req.params
    let resp = producto.getById(parseInt(id))
    ? {producto: producto.getById(parseInt(id))}
    :{error: 'Producto no encontrado'}
    res.json(resp)
})

//3-Agrega un producto
routerProductos.post('/',(req, res)=>{
    let resp =producto.save(req.body)
    ?{producto: producto.save(req.body)}
    :{error: 'Producto no encontrado'}
    res.json(resp)
})

//4- Actualiza un producto segun id 
routerProductos.put('/:id',(req, res)=>{
    const {id} = req.params
    let productoNuevo = req.body
    let resp = producto.updateProduct(parseInt(id),productoNuevo)
    res.json(resp)
})

//5-Elimina un producto segun id
routerProductos.delete('/:id',(req, res)=>{
    const {id} = req.params
    let resp = producto.deleteById(parseInt(id))
    ? {producto: producto.deleteById(parseInt(id))}
    :{error: 'Producto no encontrado'}
    res.json(resp)
})

const PORT = 8080
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error',error => console.log(`Error en servidor ${error}`))