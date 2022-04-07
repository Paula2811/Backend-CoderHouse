const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const routerProductos = require('./routes/index.js')
const {getAll,save,getById,deleteById,updateProduct} = require('./service/contenedor.js')

app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/"
}))

app.set('view engine', 'hbs');
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
