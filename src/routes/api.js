const express = require('express');
const router = express.Router();

const DadosRegiao = require('../Regiao/Regiao');
const DadosUsuario = require('../Usuario/autentica')
const DadosCultura = require('../selecao_cultura/cultura');

router.get('/', (req, res) => {
    res.send("API GET");
});

router.post('/confirmaestado', DadosRegiao.confirmaEstado);
router.get('/dadosestado', DadosRegiao.dadosEstado);
router.post('/salvaSignup', DadosUsuario.salvaSignup);
router.post('/verificaLogin', DadosUsuario.verificaLogin);
router.post('/selecao_cultura', DadosCultura.selecao_cultura);

module.exports = router;
