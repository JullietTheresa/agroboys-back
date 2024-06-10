const conexao = require('../../db');

exports.selecao_cultura = (req, res) => {
  const selectedCulture = req.body;
  console.log('Selected culture received:', selectedCulture);

  const nomeCultura = selectedCulture.name;
  const nomeImagem = selectedCulture.image;
  const descricao = selectedCulture.description;

  console.log('Dados salvos:', nomeCultura, nomeImagem, descricao);
  // Inserir dados no banco de dados
  const query = 'INSERT INTO tb_cultura (nomeCultura, nomeImagem, descricao) VALUES (?, ?, ?)';
  conexao.query(query, [nomeCultura, nomeImagem, descricao], (error, results) => {
      if (error) {
          console.error('Erro ao salvar cultura:', error);
          return res.status(500).json({ error: 'Erro interno do servidor' });
      }
      console.log('Cultura armazenada com sucesso:', { nomeCultura, nomeImagem, descricao });
      res.status(200).json({ message: 'Cultura selecionada com sucesso!', selectedCulture: { nomeCultura, nomeImagem, descricao } });
  });
};


