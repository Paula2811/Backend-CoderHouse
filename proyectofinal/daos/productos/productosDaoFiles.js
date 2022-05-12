import fs from 'fs'
import basicFiles from './../../classes/filesClass.js'


export default class Productos extends basicFiles {

    constructor(path, category) {
        super()
        this.path = path[category]
    }
    // Leer el archivo
    async readFile() {
        return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
    }
    // Escribir archivo
    async writeFile(file) {
        fs.promises.writeFile(this.path, JSON.stringify(file, null, 2))
    }

    async getAll() {
        try {
            const products = this.readFile()
            return products
        }
        catch (error) { throw new Error('No se ha podido encontrar/leer/interpretar la DB') }
    }

    async getById(id) {
        try {
            const products = await this.readFile()
            const getProduct = products.find(prod => prod.id === id)
            return getProduct
        }
        catch (error) { throw new Error('No se ha podido encontrar/leer/interpretar la DB') }
    }

    async addProduct(newProduct) {
        try {
            let tempFile = await this.readFile()

            if (!tempFile.some(prod => prod.id === newProduct.id)) {
                const newList = [...tempFile, newProduct]
                this.writeFile(newList)
                return 'ok'
            }
            else { return ({ error: 'Producto ya existente' }) }
        }
        catch (error) { throw new Error('No se ha podido procesar la operacion') }
    }

    async deleteProduct(product) {
        try {
            const tempFile = await this.readFile()
            const newList = tempFile.filter(prod => prod.id !== product.id)
            this.writeFile(newList)
            return 'ok'
        }
        catch (err) { throw new Error('No se ha podido encontrar/leer/interpretar la DB') }
    }

    async modifyProduct(product) {
        try {
            const tempFile = await this.readFile()

            let found = tempFile.find(prod => prod.id === product.id)

            found.nombre = product.nombre
            found.descripcion = product.descripcion
            found.codigo = product.codigo
            found.precio = product.precio
            found.stock = product.stock
            found.foto = product.foto

            let newList = tempFile.filter(prod => prod.id !== product.id)

            newList = [...newList, found]
            this.writeFile(newList)
            return 'ok'
        }
        catch (error) { throw new Error('No se ha podido procesar la operacion') }
    }
}