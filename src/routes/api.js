const express = require('express');
const router = express.Router();

const DadosRegiao = require('../Controllers/Regiao/Regiao');
const DadosUsuario = require('../Controllers/Usuario/autentica');
const DadosCultura = require('../Controllers/selecao_cultura/cultura');
const DadosSolo = require('../Controllers/Solo/VerificaFormulario');
const DadosControle = require('../Controllers/Controle/controle');
const AIController = require('../Controllers/AI/GeraTexto');

router.get('/', (req, res) => {
    res.send("API GET");
});

router.post('/confirmaestado', DadosRegiao.confirmaEstado);
router.get('/dadosestado', DadosRegiao.dadosEstado);
router.get('/confereRegiao', DadosRegiao.confereRegiao);

router.post('/salvaSignup', DadosUsuario.salvaSignup);
router.post('/verificaLogin', DadosUsuario.verificaLogin);
router.get('/confereLogin', DadosUsuario.confereLogin);
router.get('/enviaUsuario', DadosUsuario.enviaUsuario);

router.post('/selecao_cultura', DadosCultura.selecao_cultura);
router.get('/envia_cultura', DadosCultura.selecao_cultura);

router.get('/VerificaFormulario', DadosSolo.VerificaFormulario);
router.post('/SalvaFormulario', DadosSolo.SalvaFormulario);
router.get('/EnviarDadosSolo', DadosSolo.EnviarDadosSolo);

router.post('/controle', DadosControle.createTask);
router.get('/controleGet', DadosControle.getTasks);
router.put('/controle', DadosControle.updateTask);
router.delete('/controle/:taskId', DadosControle.deleteTask);

router.get('/GeracaoAI', AIController.Geracao);

module.exports = router;