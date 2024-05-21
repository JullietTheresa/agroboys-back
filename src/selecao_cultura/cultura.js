const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

exports.selecao_cultura = (req, res) => {
  const selectedCulture = req.body;
  console.log('Selected culture received:', selectedCulture);
  
  // Aqui você pode adicionar lógica para processar ou armazenar a cultura selecionada.
  // Por exemplo, salvar em um banco de dados.

  res.status(200).json({ message: 'Cultura selecionada com sucesso!', selectedCulture });
};


