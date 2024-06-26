const conexao = require('../../db');
const { lista } = require('./id'); // Importando a lista do arquivo data.js

exports.salvaSignup = (req, res) => {
    const { cpf, email, senha } = req.body; // Supondo que os dados estejam sendo enviados via POST
    console.log(cpf, email, senha);

    // Verificar se já existe um usuário com o mesmo email
    const queryVerificaUsuario = 'SELECT * FROM tb_usuario WHERE email = ?';
    conexao.query(queryVerificaUsuario, [email], (err, results) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            return res.status(500).json({ error: 'Erro ao verificar usuário.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'Este email já está em uso.' });
        }

        // Se tudo estiver correto, salvar os dados do usuário
        const queryInsereUsuario = `INSERT INTO tb_usuario (cpf, nomeUsuario, email, senha) VALUES (?, ?, ?, ?)`;
        conexao.query(queryInsereUsuario, [cpf, email, email, senha], (err, results) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
            }
            const queryDadosSolo = 'INSERT INTO tb_dadossolo () VALUES ()'
            conexao.query(queryDadosSolo)
    
            const queryRegiao = 'INSERT INTO tb_regiao () VALUES ()'
            conexao.query(queryRegiao)
    
            const queryCultura = 'INSERT INTO tb_cultura () VALUES ()'
            conexao.query(queryCultura)

            const queryAI = 'INSERT INTO tb_ai () VALUES ()'
            conexao.query(queryAI)

            console.log('Usuário cadastrado com sucesso:', results);
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
        });


    });
};

exports.verificaLogin = (req, res) => {
    const { email, senha } = req.body;

    // Validar os dados recebidos
    if (!email || !senha) {
        console.log("Nenhum dado foi recebido na tentativa de login");
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    console.log(`Tentativa de login - Email: ${email}`);

    // Buscar o usuário no banco de dados
    const queryVerificaUsuario = 'SELECT * FROM tb_usuario WHERE email = ?';
    conexao.query(queryVerificaUsuario, [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ error: 'Erro ao buscar usuário.' });
        }

        if (results.length === 0) {
            console.log("Usuário não encontrado no BD");
            return res.status(401).json({ error: "Email ou senha incorretos." });
        }

        const usuario = results[0];
        
        // Verificar a senha
        if (usuario.senha !== senha) {
            console.log("Senha incorreta para o usuário encontrado");
            return res.status(401).json({ error: "Email ou senha incorretos." });
        }

        // Se o login for bem-sucedido
        console.log("Usuário encontrado e senha correta");
        const id = usuario.idUsuario
        console.log(id)
        lista.length = 0;
        lista.push(id)
        console.log(lista)
        return res.status(200).json({ message: "Login bem-sucedido" });
    });
};

exports.confereLogin = (req, res) => {
    if (lista.length === 0) {
      console.log("Nenhum usuario logado.");
      return res.status(401).json({ error: 'Nenhum usuario logado' }); // Use 401 para indicar que não está autorizado
    } else {
      console.log("Usuario logado: ", lista[0]);
      return res.status(200).json({ message: 'Usuario logado', usuario: lista[0] }); // Envie uma resposta positiva
    }
};

exports.enviaUsuario = (req, res) => {
    conexao.query('select nomeUsuario from tb_usuario where idUsuario = ?;', lista[0], (error, results) => {
        if (error) {
          console.error("Erro ao buscar usuario.", error);
          return res.status(500).json({ error: "Erro interno do servidor"});
        }
        console.log("Usuario encontrado", results);
        return res.status(200).json(results);
      });
}