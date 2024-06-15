const conexao = require('../../db');
const { lista } = require('../Usuario/id'); // Importando a lista do arquivo data.js

// Endpoint para confirmar o estado e armazenar dados no banco de dados
exports.confirmaEstado = (req, res) => {
    const { cidade, regiao, bioma } = req.body;
    console.log('Dados recebidos do frontend:', cidade, regiao, bioma);
    const updateEstado = `
        UPDATE tb_regiao
        SET cidade = ?, regiao = ?, bioma = ?
        WHERE idRegião = ?
        `;
    
    const values = [cidade, regiao, bioma, lista[0]];

    // Inserir dados no banco de dados
    conexao.query(updateEstado, values, (error, results) => {
        if (error) {
            console.error('Erro ao salvar dados da região:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        console.log('Dados da região armazenados com sucesso:', { cidade, regiao, bioma });
        res.send('Cidade recebida e armazenada com sucesso pelo backend');
    });
};

// Endpoint para enviar dados do estado
exports.dadosEstado = (req, res) => {
    // Buscar o último registro inserido na tabela tb_regiao
    const query = 'SELECT * FROM tb_regiao WHERE idRegião = ?';
    conexao.query(query, lista[0], (error, results) => {
        if (error) {
            console.error('Erro ao enviar dados da região:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        if (results.length > 0) {
            const { cidade, regiao, bioma } = results[0];
            console.log('Dados da região enviados:', { cidade, regiao, bioma });
            res.send({ city: cidade, regiao, bioma });
        } else {
            console.log('Nenhum dado encontrado na tabela tb_regiao');
            res.status(404).json({ error: 'Nenhum dado encontrado' });
        }
    });
};

// Endpoint para verificar se há formulário preenchido
exports.confereRegiao = (req, res) => {
    // Contar quantos registros têm todos os campos relevantes como NULL para um idDadosSolo específico
    const query = `
        SELECT COUNT(*) AS total 
        FROM tb_regiao 
        WHERE idRegião = ? 
          AND cidade IS NULL
          AND regiao IS NULL
          AND bioma IS NULL`;

    conexao.query(query, lista[0], (error, results) => {
        if (error) {
            console.error('Erro ao verificar região:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        const total = results[0].total;
        if (total === 0) {
            console.log('Região preenchida');
            return res.status(200).json({ message: 'Região preenchida' });
        } else {
            console.log('Região não preenchida');
            return res.status(401).json({ error: 'Região não preenchida vazio' });
        }
    });
};