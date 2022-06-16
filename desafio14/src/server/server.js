import child from 'child_process'
import cluster from 'cluster'
import { cpus } from 'os'

export default class Server {

    constructor() { }

    fork = (PORT, server) => {
        try {
            const forked = child.fork('./src/server/fork.js')
            server
                .listen(PORT, () => {
                    forked.on('message', () => {
                        forked.send({ PORT })
                        console.log(`Server listening on ${server.address().port} - http://localhost:${PORT}`)
                    })
                })
                .on('error', error => { console.log('error al fork', error) })
        }
        catch (err) { console.log(err) }
    }


    cluster = (PORT, server) => {

        const numCPUs = cpus().length

        if (cluster.isPrimary) {

            console.log('Número de clusters(procesadores) posibles:', numCPUs)
            console.log(`Master ${process.pid}: INICIALIZADO`)

            for (let i = 0; i < numCPUs; i++) { cluster.fork() }

            cluster.on('exit', worker => {
                console.log('worker', worker.process.pid, 'caído -', new Date().toLocaleString())
                cluster.fork()
            })

        } else {
            console.log(`Proceso Cluster: Puerto: ${PORT} - pid: ${process.pid}`)
            server
                .listen(PORT, () => { console.log(`Oyendo desde ${server.address().port} - http://localhost:${PORT}`) })
                .on('error', error => console.log('error hubo', error))
        }
    }
}

