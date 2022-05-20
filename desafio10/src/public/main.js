//import {loadChats} from './socket.js'
import {onHandleSubmit, renderComp, renderMensaje} from './ui.js'


//loadChats(renderMensaje)


const chatForm = document.querySelector('#chatForm')

chatForm.addEventListener('submit', onHandleSubmit)