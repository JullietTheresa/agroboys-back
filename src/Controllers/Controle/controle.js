const conexao = require('../../db');
// Função para criar uma nova tarefa
let tasks = [];

exports.loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) tasks = JSON.parse(storedTasks);
};

exports.updateTaskColumn = (req, res) => {
  const { taskId, newColumnId } = req.body;

  console.log('Update Task Column:', taskId, newColumnId);

  if (!taskId || !newColumnId) {
    return res.status(400).json({ message: 'ID da tarefa e nova coluna são obrigatórios.' });
  }

  const taskIndex = tasks.findIndex(task => task.newTaskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  tasks[taskIndex].columnId = newColumnId;

  console.log('Tasks after column update:', tasks);
  return res.status(200).json({ message: 'Coluna da tarefa atualizada com sucesso.', task: tasks[taskIndex] });
};

exports.createTask = (req, res) => {
  const { newTaskId, titulo, descricao, detalhes, columnId } = req.body;
  console.log('Create Task:', newTaskId, titulo, descricao, detalhes, columnId);

  if (!newTaskId || !titulo || !descricao || !columnId) {
    return res.status(400).json({ message: 'ID, título, descrição e coluna são obrigatórios.' });
  }

  const query = 'INSERT INTO tb_tarefa (idTarefa, titulo, descricao, detalhes, coluna) VALUES (?, ?, ?, ?, ?)';
  conexao.query(query, [newTaskId, titulo, descricao, detalhes, columnId], (err, result) => {
    if (err) {
      console.error('Erro ao criar tarefa:', err);
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    } else {
      const newTask = { newTaskId: result.insertId, titulo, descricao, detalhes, columnId };
      console.log('Tasks after creation:', newTask);
      res.status(201).json({ message: 'Tarefa criada com sucesso.', task: newTask });
    }
  });
};

exports.getTasks = (req, res) => {
  console.log('Get Tasks');
  return res.status(200).json(tasks);
};

exports.updateTask = (req, res) => {
  const { taskId, titulo, descricao, detalhes, columnId } = req.body;
  console.log('Update Task:', taskId, titulo, descricao, detalhes, columnId);

  if (!taskId || !titulo || !descricao || !columnId) {
    return res.status(400).json({ message: 'ID, título, descrição e coluna são obrigatórios.' });
  }

  const query = 'UPDATE tb_tarefa SET titulo = ?, descricao = ?, detalhes = ?, coluna = ? WHERE idTarefa = ?';
  conexao.query(query, [titulo, descricao, detalhes, columnId, taskId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar tarefa:', err);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    } else {
      const updatedTask = { taskId, titulo, descricao, detalhes, columnId };
      console.log('Tasks after update:', updatedTask);
      res.status(200).json({ message: 'Tarefa atualizada com sucesso.', task: updatedTask });
    }
  });
};

exports.deleteTask = (req, res) => {
  const { taskId } = req.params;
  console.log('Delete Task:', taskId);

  if (taskId === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  const query = 'DELETE FROM tb_tarefa WHERE idTarefa = ?';
  conexao.query(query, [taskId], (err, result) => {
    if (err) {
      console.error('Erro ao deletar tarefa:', err);
      res.status(500).json({ error: 'Erro ao deletar tarefa' });
    } else {
      console.log('Tasks after deletion:', taskId);
      res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
    }
  });
};