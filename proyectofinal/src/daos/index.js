import 'dotenv/config'

let productoDao
let carritoDao
console.log(process.env.PERSISTENCIA)
switch (process.env.PERSISTENCIA) {
    case 'json':
        const {default: ProductoDaoArchivo} = await import('./productos/productoDaoArchivo.js')
        const {default: CarritoDaoArchivo} = await import('./carrito/carritoDaoArchivo.js')

        productoDao = new ProductoDaoArchivo()
        carritoDao = new CarritoDaoArchivo()
        break
    case 'mongodb':
        const {default: ProductoDaoMongo} = await import('./productos/productoDaoMongo.js')
        const {default: CarritoDaoMongo} = await import('./carrito/carritoDaoMongo.js')

        productoDao = new ProductoDaoMongo()
        carritoDao = new CarritoDaoMongo()
        break
    case 'firebase':
        const {default: ProductoDaoFirebase}= await import('./productos/productoDaoFirebase.js')
        const {default: CarritoDaoFirebase} = await import ('./carrito/carritoDaoFirebase.js')
        
        productoDao = new ProductoDaoFirebase()
        carritoDao= new CarritoDaoFirebase()
        break
}

export { productoDao, carritoDao }