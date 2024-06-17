const conexao = require('../../db');
const { lista } = require('../Usuario/id');

exports.salvaHistorico = (req, res) => {
  conexao.query('SELECT nomeCultura, nomeImagem FROM tb_cultura WHERE idCultura = ?', lista[0], (error, results) => {
      if (error) {
        console.error("Erro ao salvar plano.", error);
        return res.status(500).json({ error: "Erro interno do servidor"});
      }
      console.log("Dados salvos com sucesso");
      const historico = results[0]; // results é um array, pegamos o primeiro item

      conexao.query('SELECT AI_Text FROM tb_ai WHERE id = ?', lista[0], (error, results) => {
          if (error) {
              console.error("Erro ao selecionar AI_Text;", error);
              return res.status(500).json({ error: "Erro interno do servidor"});
          }
          console.log("AI_Text salvo com sucesso.");
          const AI_Text = results[0].AI_Text; // pegamos o campo AI_Text do primeiro resultado

          const countTasksSql = 'SELECT MAX(id) as maior FROM tb_historicoplantio WHERE Situacao = ?';
          conexao.query(countTasksSql, lista[0], (error, results) => {
              if (error) {
                  console.error('Erro ao procurar número de tarefas criadas:', error);
                  return res.status(500).json({ message: 'Erro ao criar tarefa.' });
              }
      
              let id = results[0].maior;
              if (id === null) {
                  console.log("id foi igual a NaN")
                  id = -1
              }
                id += 1
              
              console.log(`Numero de historicos do usuario ${lista[0]}: ${id}`)
            
            conexao.query('INSERT INTO tb_historicoplantio (NomeCultura, ImagemCultura, Situacao, TextoAI, id) VALUES (?, ?, ?, ?, ?);', [historico.nomeCultura, historico.nomeImagem, lista[0], AI_Text, id], (error, results) => {
              if (error) {
                  console.error("Erro ao atualizar histórico de plantio:", error);
                  return res.status(500).json({ error: "Erro interno do servidor"});
              }

              const removeAI = 'update tb_ai set AI_Text = null where id = ?'
              conexao.query(removeAI, lista[0])
              console.log("Histórico de plantio atualizado com sucesso.");
              res.status(200).json({ message: "Histórico de plantio atualizado com sucesso." });
            });
        });
      });
  });
}

exports.enviaHistorico = (req, res) => {
  conexao.query('SELECT NomeCultura, ImagemCultura, TextoAI from tb_historicoplantio WHERE Situacao = ?', lista[0], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta:', error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    } else {
      console.log("Dados enviados com sucesso: ")
      res.json(results);
    }
  });
};

exports.aiHistorico = (req, res) => {
  const { index } = req.params;
  sqlAI = 'select TextoAI from tb_historicoplantio where Situacao = ? AND id = ?'
  conexao.query(sqlAI, [lista[0], index], (error, results) => {
    if (error) {
      console.log("Erro ao buscar texto da AI", error)
    } else {
      console.log("Texto da AI enviado", results[0]);
      return res.status(200).json(results[0]);
    }
  })
}