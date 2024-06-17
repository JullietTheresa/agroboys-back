const conexao = require('../../db');
const { lista } = require('../Usuario/id');

let historico = []

exports.salvaHistorico = (req, res) => {
    conexao.query('SELECT nomeCultura, nomeImagem FROM tb_cultura WHERE idCultura = ?', lista[0], (error, results) => {
        if (error) {
          console.error("Erro ao salvar plano.", error);
          return res.status(500).json({ error: "Erro interno do servidor"});
        }

        console.log("Dados salvos com sucesso", results);
        historico.push(results)
        console.log("Historico: ", historico)
      });
}