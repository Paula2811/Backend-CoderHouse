import yargs from "yargs";

const args = yargs()
    .default({
        port: 8080,
        mode: 'fork'
    })
    .alias({
        p: "port",
        m: "mode"
    })
    .parse(process.argv.slice(2))

export default args