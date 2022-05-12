import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

export function converter(data) {

    if (typeof data.codigo === 'string') { data.codigo = Number(data.codigo) }
    if (typeof data.precio === 'string') { data.precio = Number(data.precio) }
    if (typeof data.stock === 'string') { data.stock = Number(data.stock) }

    return data
}

export function nonsqldb(req) {
    req = {
        _id: uuidv4(),
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)'),
        ...req
    }
    return req
}

export function sqldb(req) {
    req = {
        id: uuidv4(),
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)'),
        ...req
    }
    return req
}