import {onHandleSubmit, renderComp, renderMensaje} from './ui.js'

const chatForm = document.querySelector('#chatForm')

chatForm.addEventListener('submit', onHandleSubmit)