export const daos = {

    files: {
        productos: async () => await import('./productos/productosDaoFiles.js'),
        carrito: async () => await import('./carritos/carritoDaoFiles.js.js.js')
    },
    mongodb: {
        productos: async () => await import('./productos/productosDaoMongoDb.js'),
        carrito: async () => await import('./carritos/carritoDaoMongoDb.js')
    },
    firebase: {
        productos: async () => await import('./productos/productosDaoFirebase.js'),
        carrito: async () => await import('./carritos/carritoDaoFirebase.js')
    }
}
