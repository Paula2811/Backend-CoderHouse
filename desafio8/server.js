const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const productosRouter = require('./routes');
const  { engine } = require('express-handlebars');
const fs = require('fs')
const { optionsSqlite } = require('./options/sqlite');
const { Databases } = require('./options/DB/Database');
const { optionsMaria } = require('./options/mariadb');
const dbMaria = new Databases(optionsMaria, 'productos')
const dbSqlite = new Databases(optionsSqlite, 'chat')


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
io.on("connection", async (socket) => {
    let datas = await dbMaria.getAll();
    io.emit("productos", datas);

    socket.on("addNewProduct", async (data) => {
        dbMaria.save(data);
        let datas = await dbMaria.getAll();
        io.emit("productos", datas);
    });
    socket.on("deleteById", async (data) => {
        await dbMaria.deleteById(data);
        let datas = await dbMaria.getAll();
        io.emit("productos", datas);
    });

    //chat room
    let data = await dbSqlite.getAll();
    io.emit("message", data);
    socket.on("newMessage", async (data) => {
        await dbSqlite.save(data);
        let datadb = await dbSqlite.getAll();
        io.emit("message", datadb);
    });
});

server.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080')
}).on('error', (err) => console.log(err))