import {getAll,save,getById,deleteById,updateProduct} from './contenedor.js'
const routerProductos = require('./index')

//1- Obtener todos los productos
routerProductos.get('/',(req, res) => {
    let resp = getAll().length !=0
    ? {productos: getAll()}
    : {error: 'Producto no encontrado'}
    res.json(resp)
})

//2-Obtener un producto segun la id
routerProductos.get('/:id',(req, res) => {
    const {id} = req.params.id
    let resp = getById(parseInt(id))
    //? {producto: getById(parseInt(id))}
    //:{error: 'Producto no encontrado'}
    res.json(resp)
})

//3-Agrega un producto
routerProductos.post('/',(req, res)=>{
    let resp =save(req.body)
    ?{producto: save(req.body)}
    :{error: 'Producto no encontrado'}
    res.json(resp)
})

//4- Actualiza un producto segun id 
routerProductos.put('/:id',(req, res)=>{
    const {id} = req.params
    let productoNuevo = req.body
    let resp = updateProduct(parseInt(id),productoNuevo)
    res.json(resp)
})

//5-Elimina un producto segun id
routerProductos.delete('/:id',(req, res)=>{
    const {id} = req.params
    let resp = deleteById(parseInt(id))
    ? {producto: deleteById(parseInt(id))}
    :{error: 'Producto no encontrado'}
    res.json(resp)
})