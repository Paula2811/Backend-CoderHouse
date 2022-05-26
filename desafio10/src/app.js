import express from "express"
import path from "path"
import routerProducto from './routes/routes.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express()

app.use("/public", express.static('./public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routerProducto);

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({ 
        mongoUrl: "mongodb+srv://paula:facundonicolas03@cluster0.atwkp.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions:{
            useNewUrlParser:true, 
            useUnifiedTopology:true
        }
    }),
    secret:'shh',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60*1000
    }
}))

app.get('/',(req, res)=>{
    try{
        if(req.session.user){
            res.sendFile(__dirname + '/views/index.html')
        } else{
            res.sendFile(__dirname + '/views/login.html')
        }
    } catch(e){
        console.log(e)
    }
})
export default app