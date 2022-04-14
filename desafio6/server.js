const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const productosRouter = require('./routes');
const  { engine } = require('express-handlebars');
const Contenedor = require('./service/Contenedor');

const fs = require('fs')
const producto = new Contenedor('productos.txt')

app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/"
}))
app.set("views", "./views")
app.set("view engine", "hbs")

app.use('/public', express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productosRouter);

app.get("/",(req, res) => {
    res.render("crearProducto")
})

app.get('/productos/vista',(req, res) => {
    res.render("main")
})

//-------------------sockets -------------------//
const messages = []

io.on('connection',  (socket) => { 

    io.emit('productos', producto.getAll())
    socket.on('addNewProduct', (data) => {
        console.log(data)
        producto.save(data)
        io.emit('productos', producto.getAll())
    }) 

    //chat
    
    socket.on('newMessage', (data) => {
        io.emit('message', data)
    })   
});


server.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080')
}).on('error', (err) => console.log(err))