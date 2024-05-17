const express = require('express');
const router = express.Router();

const DadosRegiao = require('../Regiao/Regiao');
const DadosUsuario = require('../Usuario/autentica')

router.get('/', (req, res) => {
    res.send("API GET");
});

router.post('/confirmaestado', DadosRegiao.confirmaEstado);
router.get('/dadosestado', DadosRegiao.dadosEstado);
router.post('/salvaSignup', DadosUsuario.salvaSignup);

module.exports = router;
