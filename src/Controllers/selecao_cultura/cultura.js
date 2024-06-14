const conexao = require('../../db');
const { lista } = require('../Usuario/id');

exports.selecao_cultura = (req, res) => {
  const selectedCulture = req.body;
  console.log('Selected culture received:', selectedCulture);

  const nomeCultura = selectedCulture.name;
  const nomeImagem = selectedCulture.image;
  const descricao = selectedCulture.description;

  console.log('Dados salvos:', nomeCultura, nomeImagem, descricao);
  // Inserir dados no banco de dados
  const query = 'UPDATE tb_cultura SET nomeCultura = ?, nomeImagem = ?, descricao = ? WHERE idCultura = ?';
  conexao.query(query, [nomeCultura, nomeImagem, descricao, lista[0]], (error, results) => {
      if (error) {
          console.error('Erro ao salvar cultura:', error);
          return res.status(500).json({ error: 'Erro interno do servidor' });
      }
      console.log('Cultura armazenada com sucesso:', { nomeCultura, nomeImagem, descricao });
      res.status(200).json({ message: 'Cultura selecionada com sucesso!', selectedCulture: { nomeCultura, nomeImagem, descricao } });
  });
};

exports.envia_cultura = (req, res) => {
  conexao.query('SELECT * FROM tb_cultura WHERE idCultura = ?', lista[0], (error, results) => {
    if (erro) {
      console.error("Erro ao buscar cultura, ou cultura não selecionada.", error);
      return res.status(500).json({ error: "Erro interno do servidor"});
    }
    console.log("Dado buscado com sucesso", results);
    return res.status(200).json(results);
  });
}

