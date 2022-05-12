const errors = (errorType, path, method) => {

    let error = {
        auth: {
            error: -1,
            ruta: path,
            metodo: method,
            descripcion: 'No autorizado'
        },
        path: {
            error: -2,
            ruta: path,
            metodo: method,
            descripcion: 'Ruta no implementada'
        },
        default: {
            error: 0,
            ruta: path,
            metodo: method,
            descripcion: 'Error desconocido'
        }
    }

    if (error[errorType]) { return error[errorType] }
    else { return error.default }
}

export default errors

