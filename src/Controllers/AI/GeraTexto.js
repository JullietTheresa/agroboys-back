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
    console.log("Chamou");
    try {
        const prompt = "Quero plantar milho.\n\nInformações:\nPH: 4\nFertilidade: Alta\nSaturação: Bem drenado\nMateria Organica: 4.8%\nSalinidade: 2%\nPorcentagem de argila: 20%\nPorcentagem de silte: 10%\nPorcentagem de Areia: 30%\nTextura do solo: Argiloso pesado\nMês: Junho\nEstado: Brasilia"

        console.log("Aguardando resposta");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const unwantedCharsRegex = /[*#]/g;
        const cleanText = text.replace(unwantedCharsRegex, '');

        console.log(text);
        console.log(cleanText);
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).send("Internal Server Error");
    }
};
