const Contenedor = require('./contenedor.js')
const productos = require('./productos.js')
const app = require('./index.js')

//Desafio 2
const producto = new Contenedor("./produstos.txt")

//Desafio 3
//1- Obtener todos los productos
app.get("/productos",(req,res)=>{
    producto.getAll()
    .then(resp => res.send(resp))
})
//2-Obtener un producto Random
app.get("/productoRandom",(req,res)=>{
    producto.getAll()
    .then(resp => res.send(
        resp[
            Math.floor(Math.random()*resp.length)
        ]
    ))
})