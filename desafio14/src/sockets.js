import { saveMsjs, getMsjs } from './models/Chat.js'

export default (io)=>{
    io.on('connection', async (socket)=>{
        console.log("New user connected")


        //ChatRoom
        socket.on('enviarMensaje', (msj) => {
            saveMsjs(msj);
        })
    
        socket.emit ('mensajes', await getMsjs());
    })
}