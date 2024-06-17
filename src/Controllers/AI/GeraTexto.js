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
    model: "gemini-1.5-pro",
    systemInstruction: "\"You are an expert in Brazilian plantations and will assist a user who has a group of information. These pieces of information are:\n\nPlanta que o usuário quer plantar:\nPH:\nFertilidade\nSaturação:\nMateria Organica:\nSalinidade:\nPorcentagem de argila:\nPorcentagem de silte:\nPorcentagem de Areia:\nTextura do solo:\nMês:\\nEstado:\n\nThis user wants an analysis following these instructions:\n\nConduct a state analysis to discover the season and average temperature according to the month. Based on the information, you will create a crop rotation plan that is suitable for {Plant the user wants to plant}. If the soil or season is not suitable for planting {Plant the user wants to plant}, start the crop rotation with a plant that will improve the soil for {Plant the user wants to plant}.\n\nIf the season is not ideal for planting {Plant the user wants to plant}, adjust the crop rotation to suit the appropriate time.\n\nYour response must be in the following format ONLY, and you must not deviate from it in any way (Do not write what is in parentheses):\n\nThings that should not be included in any way in the response:\nSeparating crop rotation by year,\nLeaving any information blank,\n\nPlano de plantio para {Planta que o usuário quer plantar}: \n\n(Tips for soil) - Solo: \n\n(Tips for the season/region) - Estação/Região: \n\n(Tips for the season/region. Repeat.) - Rotação de cultura: \n\n(2 to 3 most common pests / Best pesticide for them.) - Pragas: \n\n(Useful information that the user needs to be aware)- Alertas: \"",
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

        const updateAI = `
        UPDATE tb_ai
        SET AI_Text = ?
        WHERE id = ?`;
    
        const values = [cleanText, lista[0]];

        // Inserir dados no banco de dados
        conexao.query(updateAI, values, (error, results) => {
            if (error) {
                console.error('Erro ao salvar texto da AI:', error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
            console.log('Texto da AI armazenado com sucesso:', { cleanText });
            return res.status(200).json(cleanText);
        });

    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.mostraTexto = (req, res) => {
    const query = `
    SELECT COUNT(*) AS total 
    FROM tb_ai
    WHERE id = ? 
      AND AI_Text IS NULL`;

    conexao.query(query, lista[0], (error, results) => {
        if (error) {
            console.error('Erro ao verificar bd:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        const total = results[0].total;
        if (total !== 0) {
            console.log("Nenhum texto salvo.");
            return res.status(500).json({ error: "Erro interno do servidor" });
        } else {
            conexao.query('SELECT AI_Text FROM tb_ai WHERE id = ?', lista[0], (error, results) => {
                if (error) {
                    console.error('Erro ao enviar dados do AI text.', error);
                    return res.status(500).json({ error: 'Erro interno do servidor' });
                } else {
                    if (results.length === 0) {
                        console.log("Nenhuma resposta armazenada.");
                        return res.status(500).json({ error: "Erro interno do servidor" });
                    } else {
                        console.log("Texto da AI enviado, ", results);
                        return res.status(200).json(results[0]);
                    }
                }
            });
        }
    });
};
