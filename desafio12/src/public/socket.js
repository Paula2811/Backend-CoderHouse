import { renderComp, renderMensaje} from './ui.js'
let socket = io()

//Normalizacion
const authorsSchema = new normalizr.schema.Entity('authors');
const msjSchema = new normalizr.schema.Entity('mensajes', { author: authorsSchema }, { idAttribute: 'id' });
const fileSchema = [msjSchema]

socket.on('mensajes', (msj)=>{
    const denormMsjs = normalizr.denormalize(msj.result, fileSchema, msj.entities);
    renderMensaje(denormMsjs);
    renderComp(msj, denormMsjs);
})


export const saveChats= (mensaje) =>{
    socket.emit('enviarMensaje',mensaje)
}