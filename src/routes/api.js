const express = require('express');
const router = express.Router();

const DadosRegiao = require('../Controllers/Regiao/Regiao');
const DadosUsuario = require('../Controllers/Usuario/autentica');
const DadosCultura = require('../Controllers/selecao_cultura/cultura');
const DadosSolo = require('../Controllers/Solo/VerificaFormulario');
const DadosControle = require('../Controllers/Controle/controle');
const AIController = require('../Controllers/AI/GeraTexto');
const DadosHistorico = require('../Controllers/Historico/historico');

const controleBD = require('../Controllers/Controle/controlebd');

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
router.get('/envia_cultura', DadosCultura.envia_cultura);
router.get('/lipaCultura', DadosCultura.limpaCultura);

router.get('/VerificaFormulario', DadosSolo.VerificaFormulario);
router.post('/SalvaFormulario', DadosSolo.SalvaFormulario);
router.get('/EnviarDadosSolo', DadosSolo.EnviarDadosSolo);
router.get('/limpaDados', DadosSolo.limpaDados);

router.post('/controle', DadosControle.createTask);
router.get('/controleGet', DadosControle.getTasks);
// router.put('/controle', DadosControle.updateTask);
// router.delete('/controle/:taskId', DadosControle.deleteTask);
router.post('/updateTaskColumn', DadosControle.updateTaskColumn);

router.get('/geracaoAI', AIController.Geracao);
router.get('/mostraTexto', AIController.mostraTexto);

router.get('/salvaHistorico', DadosHistorico.salvaHistorico);
router.get('/enviaHistorico', DadosHistorico.enviaHistorico);
router.get('/historicoAI/:index', DadosHistorico.aiHistorico);

router.post('/controleDB', controleBD.createTaskDB);
router.get('/controleGetBD', controleBD.getTasksDB)
router.post('/updateTaskColumnBD', controleBD.updateTaskColumnDB)
router.put('/updateTaskDB', controleBD.updateTaskDB)
router.delete('/deleteTask/:taskId', controleBD.deleteTaskBD)

module.exports = router;