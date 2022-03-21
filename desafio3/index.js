const express = require('express')

const app = express()
const port = 8080 || process.env.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen (port, () =>{
    console.log(`App listening at ${port}`)
})

module.exports = app;
