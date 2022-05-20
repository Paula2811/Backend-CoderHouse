import Chat from './models/Chat'
import { saveMsjs, getMsjs } from './models/Chat'
//import Productos from './models/Productos'


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