import express from "express"
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import passportLocal from "passport-local";
import {
    usuario
} from './models/Usuarios'
import bcrypt from 'bcrypt'
import path from "path"
import routerProducto from './routes/routes.js'
import controllerApp from './controller/controllerApp'


const app = express()
const LocalStrategy = passportLocal.Strategy;
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/', routerProducto);

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://paula:facundonicolas03@cluster0.atwkp.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 'shh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

//-----------------Passport--------------------------------------------------//

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        usuario.findOne({username},(err, user) => {
            if(err) return done(err);

            if(!user){
                console.log("User not found "+ username);
                return done(null,false)
            }
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if(!isValidPassword){
                console.log("Invalid password")
                return done(null,false)
            }

            return done(null,user)
        })
    }
))

passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        usuario.findOne({
            'username': username
        }, function (err, user) {
            if (err) {
                console.log('Error en registro ' + err);
                return done(err)
            }
            if (user) {
                console.log('User ya registrado')
                return done(null, false);
            }
            const newUser = {
                username: username,
                password: createHash(password)
            }

            usuario.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Error en guardar el usuario ' + err);
                    return done(err)
                }
                console.log(user)
                console.log('Usuario registrado correctamente')
                return done(null, userWithId)
            })
        })
    }
))

function createHash(password) {
    return bcrypt.hashSync(
        password, 
        bcrypt.genSaltSync(10),
        null
    )
}

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    usuario.findById(id, done)
})

//----------------------------------------------------------------//

app.get('/logoutMensaje', (req, res) => {
    try {
        const user = process.env.USER;
        res.sendFile(path.join(process.cwd(), 'src/views/logout.html'));
    } catch (err) {
        console.log(err);
    }
})

//Rutas de app---------------------------------------------------//

//LOGIN
app.get('/', controllerApp.getLogin)
app.post('/login', passport.authenticate('login', {
    failureRedirect: '/faillogin'
}), controllerApp.postLogin)
app.get('/faillogin', controllerApp.getFailLogin)

//SIGNUP
app.get('/signup', controllerApp.getSignup)
app.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/failsignup'
}), controllerApp.postSignup)
app.get('/failsignup', controllerApp.getFailSignup)

//LOGOUT
app.get('/logout', controllerApp.getLogout)

export default app