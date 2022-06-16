import {
    Router
} from "express"
import {
    fork
} from 'child_process'

const apiRandom = Router();

apiRandom.get("/api/random", (req, res) => {
    const forked = fork('./controller/controllerRandom.js')

    forked.on('message', result => {
        forked.send(req.query)
        result !== 'start' && res.json(result)
    })
})

export default apiRandom