import mongoose from "mongoose"
import { normalizeMsj } from "./normalizr.js"

const schemaChat = new mongoose.Schema({
        author: {
                id: { type: String, required: true, max: 100 },
                nombre: { type: String, required: true, max: 100 },
                apellido: { type: String, required: true, max: 50 },
                edad: { type: Number, required: true },
                alias: { type: String, required: true },
                avatar: { type: String, required: true, max: 100 },
                timestamp: { type: Date, default: Date.now }
        },
        text: { type: String, required: true, max: 400 }
});


export const msjModel=  new mongoose.model('chat',schemaChat)

export const saveMsjs = async (msj) => {
        const newMsj = new msjModel(msj);
        try {
                newMsj.save()
        } catch (error) {
                throw new Error(error);
        }
}

export const getMsjs = async () => {
        try {
                const mensajes = await msjModel.find();
                return normalizeMsj(mensajes);
        } catch (error) {
                throw new Error(error);
        }
}
