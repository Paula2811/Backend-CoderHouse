import yargs from "yargs";

const args = yargs()
    .default({
        port: process.argv[2] || 8080
    })
    .alias({
        p: "port"
    })
    .parse(process.argv.slice(2))

export default args