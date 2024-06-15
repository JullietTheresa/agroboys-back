const conexao = require('../../db');
const { lista } = require('../Usuario/id');

// Endpoint para salvar o formulário
exports.SalvaFormulario = (req, res) => {
    const data = req.body;
    const formulario = data;

    // Inserir dados no banco de dados
    conexao.query('UPDATE tb_dadossolo SET ? WHERE idDadosSolo = ?', [formulario, lista[0]], (error, results) => {
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
    conexao.query('SELECT * FROM tb_dadossolo WHERE idDadosSolo = ?', lista[0], (error, results) => {
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
    console.log("Entrou")
    const idDadosSolo = req.body.idDadosSolo;

    // Contar quantos registros têm todos os campos relevantes como NULL para um idDadosSolo específico
    const query = `
        SELECT COUNT(*) AS total 
        FROM tb_dadossolo 
        WHERE idDadosSolo = ? 
          AND ph IS NULL
          AND fertilidade IS NULL
          AND nutrientes IS NULL
          AND saturacao IS NULL
          AND materiaOrganica IS NULL
          AND salinidade IS NULL
          AND porcentArgila IS NULL
          AND porcentSilt IS NULL
          AND porcentAreia IS NULL
          AND texturaSolo IS NULL`;

    conexao.query(query, lista[0], (error, results) => {
        console.log("Entrou no bd")
        if (error) {
            console.error('Erro ao verificar formulário:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        const total = results[0].total;
        if (total === 0) {
            console.log('Formulário preenchido');
            return res.status(200).json({ message: 'Formulário preenchido' });
        } else {
            console.log('Formulário não preenchido');
            return res.status(401).json({ error: 'Formulário vazio' });
        }
    });
};

