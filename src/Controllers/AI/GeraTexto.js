const conexao = require('../../db');
const { lista } = require('../Usuario/id');
const plano = []

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBl6_Mr_IMMc7HbyCxbusAmkxYcZ8fgefU");

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Você é um especialista em plantações brasileiras e vai ajudar um usuário que possui um grupo de informações, essas informações são:\n\nPlanta que o usuário quer plantar:\nPH:\nFertilidade:\nSaturação:\nMateria Organica:\nSalinidade:\nPorcentagem de argila:\nPorcentagem de silte:\nPorcentagem de Areia:\nTextura do solo:\nMês:\nEstado:\n\nEste usuário quer uma analise seguindo as seguintes instruções:\n\nFaça uma analise  do estado para descobrir estação e temperatura media de acordo com o mes\nAnalisando as informações você ira fazer uma rotação de cultura que se adeque a {Planta que o usuário quer plantar}, caso o solo ou a estação não seja adequada para o plantio da {Planta que o usuário quer plantar} comece a rotação de cultura com uma planta que ira melhorar o solo para a {Planta que o usuário quer plantar}.\n\nCaso a estação não seja a ideal para plantar a {Planta que o usuário quer plantar} altere a rotação de cultura para se adequar a época.\n\nSua resposta deve ser APENAS no seguinte modelo e não poderá sair dele de forma alguma, ( Não escreva oque está entre () ):\n\nCoisas que não deve conter de modo algum na resposta:\nSeparar Rotação de cultura por ano,\nDeixar alguma informação vazia\n\nPlano de plantio para {Planta que o usuário quer plantar}:\n\n(Dicas do solo) Solo: \n\n(Dicas da Estação/Região) Estação/Região: \n\n(Ao final escreva, repita) Rotação de cultura: \n\n(2 a 3 Pragas mais comum / Melhor Agrotóxico para ela) Pragas: \n\nAlertas: ",
});

const generationConfig = {
temperature: 1,
topP: 0.95,
topK: 64,
maxOutputTokens: 8192,
responseMimeType: "text/plain",
};

exports.Geracao = async (req, res) => {
    console.log("Chamou dados da planta.");

    try {
        // Consultar dados no banco de dados para cultura
        const cultura = await new Promise((resolve, reject) => {
            conexao.query('SELECT nomeCultura FROM tb_cultura WHERE idCultura = ?', lista[0], (error, results) => {
                if (error) {
                    console.error("Erro ao buscar cultura, ou cultura não selecionada.", error);
                    return reject("Erro interno do servidor");
                }
                console.log("Dado buscado com sucesso", results);
                resolve(results[0].nomeCultura);
            });
        });

        console.log("Chamou dados do solo.");
        
        // Consultar dados no banco de dados para dados do solo
        const dadosSolo = await new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM tb_dadossolo WHERE idDadosSolo = ?', lista[0], (error, results) => {
                if (error) {
                    console.error('Erro ao enviar dados do solo:', error);
                    return reject("Erro interno do servidor");
                }
                console.log('Dados chamados:', results);
                resolve(results[0]);
            });
        });

        const { ph, fertilidade, nutrientes, saturacao, materiaOrganica, salinidade, porcentArgila, porcentSilt, porcentAreia, texturaSolo } = dadosSolo;

        const prompt = `Quero plantar ${cultura}.\n\nInformações:\nPH: ${ph}\nFertilidade: ${fertilidade}\nSaturação: ${saturacao}\nMateria Organica: ${materiaOrganica}%\nSalinidade: ${salinidade}%\nPorcentagem de argila: ${porcentArgila}%\nPorcentagem de silte: ${porcentSilt}%\nPorcentagem de Areia: ${porcentAreia}%\nTextura do solo: ${texturaSolo}\nMês: Junho\nEstado: Brasilia`;

        console.log("Aguardando resposta");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const unwantedCharsRegex = /[*#]/g;
        const cleanText = text.replace(unwantedCharsRegex, '');

        plano.push(cleanText);
        console.log(cleanText);
        res.status(200).json(cleanText);
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.mostraTexto = (req, res) => {
    if (plano.length === 0) {
        console.log("Nenhuma resposta armazenada.")
        return res.status(500).json({ error: "Erro interno do servidor"});
    } else {
        console.log("Resposta encontrada.")
        return res.status(200).json(plano[0]);
    }
}