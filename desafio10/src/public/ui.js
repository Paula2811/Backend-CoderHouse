import { saveChats  } from "./socket.js";

//ChatRoom

const messagesList = document.querySelector('#mensajes')

export const renderMensaje = mensajes =>{
    mensajes.forEach(mensaje =>{
        messagesList.innerHTML += `
        <article>
        <span class="id">${mensaje._doc.author.id}</span><span class="time">[${mensaje._doc.author.timestamp}]:</span><span clas="text">${mensaje._doc.text}</span><img src="${mensaje._doc.author.avatar}" alt="avatar" width="30" height="24">
        </article>
        `
    })
}


export const onHandleSubmit = (e)=>{
    e.preventDefault()

    const mensaje = {
        author: {
            id: chatForm["id"].value,
            nombre: chatForm["nombre"].value,
            apellido: chatForm["apellido"].value,
            edad: chatForm["edad"].value,
            alias: chatForm["alias"].value,
            avatar: chatForm["avatar"].value,
        },
        text: chatForm["mensaje"].value
    }

    saveChats(mensaje)
    
}

export const renderComp = (msj, denormMsjs) => {
    const comp = document.getElementById("compresion");
    const denormMsjsLength = (JSON.stringify(denormMsjs)).length;
    const msjLength = (JSON.stringify(msj)).length;
    const compresion = ((msjLength - denormMsjsLength) / msjLength * 100).toFixed(2);
    comp.innerHTML = `(Compresion: ${compresion}%)`;
}


//Tabla de productos 
fetch("/api/productos-test")
    .then(response => response.json())
    .then(data => {
        renderTable(data);
    })
    .catch(error => console.log(error));

function renderTable(data) {
    const table = document.getElementById("table");
    const html = data.map(element => {
        return (`<tr>
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td><img src="${element.image}" style="height:100px"></td>
        </tr>`);
    }).join("");
        table.innerHTML += html;
}


