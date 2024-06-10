const conexao = require('../../db');

// Endpoint para salvar o formulário
exports.SalvaFormulario = (req, res) => {
    const data = req.body;
    const formulario = data;

    // Inserir dados no banco de dados
    conexao.query('INSERT INTO tb_dadossolo SET ?', formulario, (error, results) => {
        if (error) {
            console.error('Erro ao salvar formulário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        console.log('Formulário cadastrado com sucesso.');
        return res.status(201).json({ message: 'Formulário cadastrado com sucesso.' });
    });
}

// Endpoint para enviar dados do solo
exports.EnviarDadosSolo = (req, res) => {
    // Consultar dados no banco de dados
    conexao.query('SELECT * FROM tb_dadossolo', (error, results) => {
        if (error) {
            console.error('Erro ao enviar dados do solo:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        console.log('Dados enviados:', results);
        return res.status(200).json(results);
    });
}

// Endpoint para verificar se há formulário preenchido
exports.VerificaFormulario = (req, res) => {
    // Contar quantos registros existem na tabela tb_dadossolo
    conexao.query('SELECT COUNT(*) AS total FROM tb_dadossolo', (error, results) => {
        if (error) {
            console.error('Erro ao verificar formulário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        const total = results[0].total;
        if (total > 0) {
            console.log('Formulário preenchido');
            return res.status(200).json({ message: 'Formulário preenchido' });
        } else {
            console.log('Formulário não preenchido');
            return res.status(401).json({ error: 'Formulário vazio' });
        }
    });
}