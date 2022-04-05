const express = require('express');
const app = express();
const routerProductos = express.Router()
const {getAll,save,getById,deleteById,updateProduct} = require('./contenedor.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',routerProductos)
app.use(express.static('public'))

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
    const {id} = req.params
    let resp = getById(parseInt(id))
    ? {producto: getById(parseInt(id))}
    :{error: 'Producto no encontrado'}
    res.json(resp)
})

//3-Agrega un producto
routerProductos.post('/',(req, res)=>{
    let resp =save(req.body)
    ?{producto: save(req.body)}
    :{error: 'Producto no encontrado'}
    res.json(resp)
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

const PORT = 8080
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error',error => console.log(`Error en servidor ${error}`))

module.exports = routerProductos