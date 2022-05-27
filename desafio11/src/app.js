import express from "express"
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'

import path from "path"

import routerProducto from './routes/routes.js'

const app = express()
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routerProducto);

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
        maxAge: 60000
    }
}))

app.get('/',(req, res)=>{
    try{
        if(req.session.user){
            res.sendFile(path.join(process.cwd(), 'src/views/index.html'))
        } else{
            res.sendFile(path.join(process.cwd(), 'src/views/login.html'))
        }
    } catch(e){
        console.log(e)
    }
})

app.post('/setUserName',(req, res)=>{
    req.session.user = req.body.user
    process.env.USER= req.session.user
    res.redirect('/')
})

app.get('/getUserName', (req, res) => {
    try {
        if (req.session.user) {
            const user = process.env.USER;
            res.send({
                user
            })
        } else {
            res.send({
                userName: 'no existe'
            })
        }
    } catch (err) {
        console.log(err);
    }
})

app.get('/getUserNameEnv', (req, res) => {
    const user = process.env.USER;
    res.send({
        user
    })
})

app.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/logout');
            }
        })
    } catch (err) {
        console.log(err);
    }
})

app.get('/logoutMensaje', (req, res) => {
    try {
        const user = process.env.USER;
        res.sendFile(path.join(process.cwd(), 'src/views/logout.html'));
    }
    catch (err) {
        console.log(err);
    }
})


export default app