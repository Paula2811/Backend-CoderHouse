//* El carrito tiene los métodos fuera de la clase para poder trabajar con ellos por fuera del Storage
import { daos } from './../daos/index.js'
import { connect } from './../config.js'


//? Constructor de Contenedor ==================================================

const container = async (mode) => {
    let { default: Contenedor } = await daos[mode].carrito()
    return new Contenedor(await connect[mode], 'carrito')
}

//? Controladores ==============================================================

export const newItem = async (req, res) => {

    let carrito = await container(process.env.PERSIST_MODE)

    if (!req.body.id) {
        carrito.createCart().then(myCart => {
            carrito.addToCart(myCart, req.body.producto)
                .then(idNewCart => res.send({ id: idNewCart }))
        })
    } else {
        carrito.locateCart(req.body.id).then(myCart => {
            carrito.addToCart(myCart, req.body.producto)
                .then(res.send({ task: 'complete' }))
        })
    }
}

export const listItems = async (req, res) => {

    let carrito = await container(process.env.PERSIST_MODE)

    carrito.showCart(req.params)
        .then(result => res.send(result))
        .catch(() => res.send({ error: 'no hay carrito' }))
}

export const delCart = async (req, res) => {
    let carrito = await container(process.env.PERSIST_MODE)
    carrito.emptyCart(req.params)
        .then(result => res.send({ status: result }))
}

export const addItem = async (req, res) => {
    let carrito = await container(process.env.PERSIST_MODE)
    const { id: id_cart } = req.params
    const { id: id_prod } = req.body
    carrito.addToCartAlt(id_cart, id_prod)
        .then(result => res.send({ status: result }))
}

export const delItems = async (req, res) => {
    let carrito = await container(process.env.PERSIST_MODE)
    const { id: id_cart, id_prod } = req.params
    carrito.removeProduct(id_cart, id_prod)
        .then(result => res.send({ status: result }))
}