import express from "express"
import path from "path"
import routerProducto from './routes/routes.js'
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', routerProducto);

export default app