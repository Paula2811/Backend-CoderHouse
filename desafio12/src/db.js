import {connect} from "mongoose";
import {MONGODB_URI} from "./config"

export const connectDB = async ()=>{
    try{
        await connect(MONGODB_URI);
        console.log("Base de datos conectada")
    } catch(err){ 
        throw new Error("Error al conectarse a la base de datos", err)
    }

} 