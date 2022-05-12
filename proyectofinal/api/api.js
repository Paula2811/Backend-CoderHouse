const router = async function (express, app) {

    let { login } = await import('./routes/login.js')
    let { productos } = await import('./routes/productos.js')
    let { carrito } = await import('./routes/carrito.js')

    app.use('/login', login)
    app.use('/api/productos', productos)
    app.use('/api/carrito', carrito)
}

export default router