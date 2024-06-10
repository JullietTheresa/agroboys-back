let tasks = []; // Lista que funciona como banco de dados temporário

// Função para criar uma nova tarefa
exports.createTask = (req, res) => {
  const { newTaskId, titulo, descricao, detalhes } = req.body;
  console.log(newTaskId, titulo, descricao, detalhes)

  if (!newTaskId || !titulo || !descricao) {
    return res.status(400).json({ message: 'ID, título e descrição são obrigatórios.' });
  }

  const newTask = { newTaskId, titulo, descricao, detalhes };
  tasks.push(newTask);

  console.log(tasks)
  return res.status(201).json({ message: 'Tarefa criada com sucesso.', task: newTask });
};

exports.getTasks = (req, res) => {
    return res.status(200).json(tasks);
  };