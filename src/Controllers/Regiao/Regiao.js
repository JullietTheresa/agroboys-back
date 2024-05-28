let DadosRegiao = [];

exports.confirmaEstado = (req, res) => {
    const { cidade, regiao, bioma } = req.body;
    console.log('Dados recebidos do frontend:', cidade, regiao, bioma);
    DadosRegiao = [{ cidade, regiao, bioma }];
    console.log('Dados na lista DadosRegião:', DadosRegiao);
    res.send('Cidade recebida e armazenada com sucesso pelo backend');
};

exports.dadosEstado = (req, res) => {
    res.send({ cidade: DadosRegiao[0], regiao: DadosRegiao[1], bioma: DadosRegiao[2] });
};
