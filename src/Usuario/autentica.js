let DadosSignup = [];

exports.salvaSignup = (req, res) => {
    const { cpf, email, password } = req.body; // Supondo que os dados estejam sendo enviados via POST
    console.log(cpf, email, password)

    // Verificar se já existe um usuário com o mesmo email
    const usuarioExistente = DadosSignup.find((usuario) => usuario.email === email);
    if (usuarioExistente) {
    return res.status(400).json({ error: 'Este email já está em uso.' });
    }

    // Se tudo estiver correto, salvar os dados do usuário
    const novoUsuario = { cpf, email, password };
    DadosSignup.push(novoUsuario);
    console.log(DadosSignup)

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
};

exports.verificaLogin = (req, res) => {
    const {email, password} = req.body;
    console.log(`Email: ${email} Senha: ${password}`)
    const usuarioLogin = DadosSignup.find((usuario) => usuario.email === email && usuario.password === password);
    if (usuarioLogin) {
        // Usuario está salvo
        console.log("Usuario encontrado")
        return "?"
    }

    // Usuario não encontrado
    console.log("Usuario não encontrado no BD")

    return "?"
}
