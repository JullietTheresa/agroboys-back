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
    const { email, password } = req.body;

    // Validar os dados recebidos
    if (!email || !password) {
        console.log("Nenhum dado foi recebido na tentativa de login")
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    console.log(`Tentativa de login - Email: ${email}`);

    // Buscar o usuário no banco de dados
    const usuarioLogin = DadosSignup.find(usuario => usuario.email === email);

    // Se o usuário não for encontrado
    if (!usuarioLogin) {
        console.log("Usuário não encontrado no BD");
        return res.status(401).json({ error: "Email ou senha incorretos." });
    }

    // Verificar a senha
    if (usuarioLogin.password !== password) {
        console.log("Senha incorreta para o usuário encontrado");
        return res.status(401).json({ error: "Email ou senha incorretos." });
    }

    // Se o login for bem-sucedido
    console.log("Usuário encontrado e senha correta");
    return res.status(200).json({ message: "Login bem-sucedido" });
};

