import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import fs from 'fs'
import basicFiles from '../../classes/filesClass.js'


export default class Carrito extends basicFiles {

    constructor(path, category) {
        super()
        this.path = path[category]
    }

    readFile = async () => {
        return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    }

    writeFile = (file) => {
        fs.promises.writeFile(this.path, JSON.stringify(file, null, 2))
    }

    createCart = async (id) => {
        try {
            const cartList = await this.readFile()
            if (!cartList.some(prod => id === prod.id)) {
                const myCart = {
                    id: uuidv4(),
                    timestamp: moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)'),
                    productos: new Array()
                }
                let newList = [...cartList, myCart];
                this.writeFile(newList)
                return myCart
            }
        }
        catch { return ('no se encuentra la db - createCart') }
    }

    locateCart = async (id) => {
        const cartList = await this.readFile()
        const myCart = cartList.find(cart => cart.id === id)
        return myCart
    }

    addToCart = async function (carrito, producto) {

        let modProduct = await carrito.productos.find(prod => prod.id === producto.id)

        modProduct
            ? modProduct.cantidad += producto.cantidad
            : carrito.productos = [...carrito.productos, producto]

        const myNewCart = await this.readFile()
        let tempCart = myNewCart.filter(cart => cart.id !== carrito.id)
        tempCart = [...tempCart, carrito]
        this.writeFile(tempCart)
        return carrito.id
    }

    showCart = async (id) => {
        const carts = await this.readFile()
        let myCart = carts.find(cart => cart.id === id.id)
        return myCart.productos
    }

    emptyCart = async (id) => {
        const cartList = await this.readFile()
        const tempList = cartList.filter(cart => cart.id !== id.id)
        this.writeFile(tempList)
        return 'deleted'
    }

    removeProduct = async (id_cart, id_prod) => {
        const cartsList = await this.readFile()
        const myTempCart = cartsList.find(cart => cart.id === id_cart)
        let newCartsList = cartsList.filter(cart => cart.id !== myTempCart.id)
        // TempCart = Productos modificados
        if (myTempCart.productos.some(prod => prod.id === id_prod)) {
            myTempCart.productos = myTempCart.productos.filter(prod => prod.id !== id_prod)
            newCartsList = [...newCartsList, myTempCart]
            this.writeFile(newCartsList)
            return 'removed'
        }
    }

    addToCartAlt = async (id_cart, id_prod) => {

        const tempFile = await this.readFile()
        const tempCart = tempFile.find(cart => cart.id === id_cart)
        tempCart.productos.find(prod => prod.id === id_prod).cantidad++

        let newFile = tempFile.filter(cart => cart.id !== id_cart)
        newFile = [...newFile, tempCart]
        this.writeFile(newFile)
        return 'added'
    }
}



