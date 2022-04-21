const express = require('express')
const app = express()
const port = 8080 || process.env.port
const productosRouter = require('./routes/rutaProductos.js')
const  carritoRouter = require('./routes/rutaCarrito')



app.use(express.json());
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);


const server = app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error',error => console.log(`Error en servidor ${error}`))

module.exports = app;