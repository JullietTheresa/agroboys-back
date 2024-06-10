// Importação do módulo mysql
const mysql = require('mysql2');


//Configuração de conexão
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'felipe121',
    database: 'db_terra_tech'
});

//Teste de conexão
conexao.connect(function (erro) {
    if (erro) throw erro;
    console.log('Conexão com o BD efetuada com sucesso!');
});

module.exports = conexao;
