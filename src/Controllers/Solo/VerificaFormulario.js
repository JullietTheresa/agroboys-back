DadosSolo = []

exports.SalvaFormulario = (req, res) => {
    const data = req.body;
    const formulario = data
    DadosSolo.push(formulario)
    console.log(DadosSolo)

    return res.status(201).json({ message: 'Formulario cadastrado com sucesso.' });
}

exports.EnviarDadosSolo = (req, res) => {
    console.log("Dados enviados")
    res.send(DadosSolo)
}

exports.VerificaFormulario = (req, res) => {
    if (DadosSolo.length > 0) {
        console.log("Formulario preencido")
        return res.status(200).json({ message: "Formulario Preenchido" });
    } else {
        console.log("Formulario não preechido")
        return res.status(401).json({ error: "Formulario Vazio." });
    }
};