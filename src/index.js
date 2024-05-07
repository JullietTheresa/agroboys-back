const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app GET")
})

app.post('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app POST")
})

app.delete('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app DELETE")
})

app.put('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app PUT")
})

app.listen(PORT, () => {
    console.log(`App online na porta ${PORT}`)
})