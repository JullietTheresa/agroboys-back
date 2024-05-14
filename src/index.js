const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Dados temporarios
let cidadeTemporaria; // Variável para armazenar temporariamente a cidade


// Middleware para analisar o corpo da solicitação JSON
app.use(bodyParser.json());

// Middleware para configurar os cabeçalhos CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir acesso de qualquer origem
  res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permitir métodos HTTP especificados
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Permitir cabeçalhos especificados
  next();
});


app.get('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app GET")
});

app.post('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app POST")
});

app.delete('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app DELETE")
});

app.put('/', (req, res) => {
    console.log("Entrou aqui")
    res.send("app PUT")
});

// Endpoint para receber a cidade e dados da cidade enviadas pelo FindCity.js
// app.post('/api/cidade', (req, res) => {
//     const { cidade, dados } = req.body;
//     console.log('Cidade recebida do frontend:', cidade);
//     // Acessando apenas a temperatura atual dos dados do clima
//     const temperaturaAtual = dados.main.temp;
//     console.log('Temperatura atual:', temperaturaAtual);
//     // Faça o que quiser com a cidade e a temperatura atual recebidas aqui
//     res.send('Cidade e temperatura atual recebidas com sucesso pelo backend');
//   });

// Recebe a Cidade da HomePage
  app.post('/confirmaestado', (req, res) => {
    const { cidade } = req.body;
    console.log('Cidade recebida do frontend:', cidade);
    cidadeTemporaria = cidade; // Armazenar temporariamente a cidade
    console.log("Cidade temporaria armazenada:", cidadeTemporaria)
    res.send('Cidade recebida e armazenada com sucesso pelo backend');
});

// Envia a cidade temporaria
app.get('/cidadearmazenada', (req, res) => {
    res.send({ cidade: cidadeTemporaria });
});


app.listen(PORT, () => {
    console.log(`App online na porta http://localhost:${PORT}`);
});