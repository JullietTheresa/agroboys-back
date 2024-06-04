const express = require('express');
// Importação do módulo mysql
const mysql = require('mysql2');

const bodyParser = require('body-parser');
const app = express();


//Configuração de conexão
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TerraTech',
    database: 'db_terra_tech'
});

//Teste de conexão
conexao.connect(function (erro) {
    if (erro) throw erro;
    console.log('Conexão com o BD efetuada com sucesso!');
});
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


