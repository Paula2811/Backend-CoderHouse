const express = require('express');
const app = express();
const routerProductos = require('./routes/index.js')
const {getAll,save,getById,deleteById,updateProduct} = require('./service/contenedor.js')

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.set('views','./views')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',routerProductos)

app.get('/',(req, res)=>{
    res.render("crearProducto")
})

app.get('/productos/vista',(req, res)=>{
    const data = getAll()
    res.render("main",data.length !== 0 ? {productos: data}:{error: 'no hay productos cargados'})
})


const PORT = 8080
const server = app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error',error => console.log(`Error en servidor ${error}`))
