const express = require('express');
const router = express.Router();

const DadosRegiao = require('../Controllers/Regiao/Regiao');
const DadosUsuario = require('../Controllers/Usuario/autentica')
const DadosCultura = require('../Controllers/selecao_cultura/cultura');
const DadosSolo = require('../Controllers/Solo/VerificaFormulario');
const DadosControle = require('../Controllers/Controle/controle');

router.get('/', (req, res) => {
    res.send("API GET");
});

router.post('/confirmaestado', DadosRegiao.confirmaEstado);
router.get('/dadosestado', DadosRegiao.dadosEstado);
router.post('/salvaSignup', DadosUsuario.salvaSignup);
router.post('/verificaLogin', DadosUsuario.verificaLogin);
router.post('/selecao_cultura', DadosCultura.selecao_cultura);
router.get('/VerificaFormulario', DadosSolo.VerificaFormulario);
router.post('/SalvaFormulario', DadosSolo.SalvaFormulario);
router.get('/EnviarDadosSolo', DadosSolo.EnviarDadosSolo);

router.post('/controle', DadosControle.createTask)
router.get('/controleGet'), DadosControle.getTasks

module.exports = router;