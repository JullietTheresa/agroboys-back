const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const conexao = require('./db');


const PORT = 3000;


app.get('/', (req, res) => {
    let SQL = "INSERT INTO tb_estado (idEstado, nomeEstado) VALUES (1, 'Acre')" ;
    conexao.query(SQL, (err, result)=>{
        console.log(err);
    })
});


// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`App online na porta http://localhost:${PORT}`);
});


