
import { converter, nonsqldb, sqldb } from './converterController.js'
import errors from './errorsController.js'
import { daos } from '../daos/index.js'
import { connect } from './../config.js'

//? Constructor de Contenedor ==================================================

const container = async (mode) => {
    let { default: Contenedor } = await daos[mode].productos()
    return new Contenedor(await connect[mode], 'productos')
}

//? Middleware =================================================================

export const middlewareProductos = function (req, res, next) {
    if (req.body.editMode === 'modify') { req.method = 'PUT' }
    if (req.body.editMode === 'delete') { req.method = 'DELETE' }
    req.body = converter(req.body)
    next()
}

//? Controllers ================================================================

//* Obtener Productos

export const getProducts = async (req, res) => {

    const productos = await container(process.env.PERSIST_MODE)
    // El usuario se ha logueado
    if (Number(process.env.GLOBAL_USER)) {

        req.params.id
            // Si existe un id para buscar
            ?
            productos.getById(req.params.id)
                .then(result => res.send(result))
                //.then(result => res.send(result || { error: 'Producto inexistente' }))
                .catch(() => res.send({ error: 'Hubo problemas con la DB' }))

            // Sino devuelve todo
            : productos.getAll()
                .then(result => {
                    let resWithAuth = []
                    result.map(res => {

                        res = res._doc || res
                        res = { ...res, auth: process.env.GLOBAL_USER };
                        resWithAuth.push(res)
                    })
                    res.send(resWithAuth)
                })
                .catch(() => res.send({ error: 'Hubo problemas con la ruta' }))
    }
    // El usuario no está logueado
    else { res.send(errors('auth', req.baseUrl, req.method)) }
}

//* Agregar Productos

export const postProducts = async (req, res) => {

    const productos = await container(process.env.PERSIST_MODE)
    // Si es admin
    if (process.env.GLOBAL_USER === '1') {

        process.env.PERSIST_MODE === 'mongodb'
            ? req.body = nonsqldb(req.body)
            : req.body = sqldb(req.body)

        productos.addProduct(req.body)
            .then(result => {
                result === 'ok'
                    ? res.redirect('../exito.html')
                    : res.redirect('../error.html')
            })
    }
    // Si es user o invitado
    else { res.send(errors('auth', req.baseUrl, req.method)) }
}

//* Modificar Productos

export const modifyProducts = async (req, res) => {

    const productos = await container(process.env.PERSIST_MODE)
    // Si es admin
    if (process.env.GLOBAL_USER === '1') {
        productos.modifyProduct(req.body)
            .then(result => {
                result === 'ok'
                    ? res.redirect('../../exito.html')
                    : res.redirect('../../error.html')
            })
    }
    // Si es user o invitado
    else { res.send(errors('auth', req.baseUrl, req.method)) }
}

//* Borrar Productos

export const deleteProducts = async (req, res) => {

    const productos = await container(process.env.PERSIST_MODE)
    // Si es admin
    if (process.env.GLOBAL_USER === '1') {
        productos.deleteProduct(req.body)
            .then(result => {
                result === 'ok'
                    ? res.redirect('../../exito.html')
                    : (res.redirect('../../error.html'))
            })
    }
    // Si es user o invitado
    else { res.send(errors('auth', req.baseUrl, req.method)) }
}