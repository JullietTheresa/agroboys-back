const conexao = require('../../db');
const { lista } = require('../Usuario/id');


exports.salvaHistorico = (req, res) => {
  conexao.query('SELECT nomeCultura, nomeImagem FROM tb_cultura WHERE idCultura = ?', lista[0], (error, results) => {
      if (error) {
        console.error("Erro ao salvar plano.", error);
        return res.status(500).json({ error: "Erro interno do servidor"});
      }
      console.log("Dados salvos com sucesso", results);
      const historico = results[0]; // results é um array, pegamos o primeiro item

      conexao.query('SELECT AI_Text FROM tb_ai WHERE id = ?', lista[0], (error, results) => {
          if (error) {
              console.error("Erro ao selecionar AI_Text;", error);
              return res.status(500).json({ error: "Erro interno do servidor"});
          }
          console.log("AI_Text salvo com sucesso.", results);
          const AI_Text = results[0].AI_Text; // pegamos o campo AI_Text do primeiro resultado

          conexao.query('UPDATE tb_historicoplantio SET NomeCultura = ?, ImagemCultura = ?, Situacao = true, TextoAI = ? WHERE idHistorico = ?', [historico.nomeCultura, historico.nomeImagem, AI_Text, lista[0]], (error, results) => {
              if (error) {
                  console.error("Erro ao atualizar histórico de plantio:", error);
                  return res.status(500).json({ error: "Erro interno do servidor"});
              }
              console.log("Histórico de plantio atualizado com sucesso.");
              res.status(200).json({ message: "Histórico de plantio atualizado com sucesso." });
          });
      });
  });
}

exports.enviaHistorico = (req, res) => {
  conexao.query('SELECT NomeCultura, ImagemCultura, Situacao, TextoAI from tb_historicoplantio WHERE idHistorico = ?', lista[0], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    } else {
      console.log("Dados enviados com sucesso: ", results)
      res.json(results);
    }
  });
};