import {
    Router
} from "express"
import args from "../global/yargs"

const apiInfo = Router();

apiInfo.get('/info', (req, res) => {
    res.json({
        "Argumentos de entrada": {
            "Puerto": args.port
        },
        "Nombre de la plataforma": process.platform,
        "Version de Node.js": process.version,
        "Memoria total reservada": process.memoryUsage().rss,
        "Path de ejecucion": process.argv[1],
        "Process id": process.pid,
        "Carpeta del proyecto": process.cwd()
    })
})



export default apiInfo