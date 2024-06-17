const conexao = require('../../db');
const { lista } = require('../Usuario/id');

// Função para criar uma nova tarefa
let tasks = [];

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

  const newTask = { newTaskId, titulo, descricao, detalhes, columnId };
  tasks.push(newTask);

  console.log('Tasks after creation:', tasks);
  return res.status(201).json({ message: 'Tarefa criada com sucesso.', task: newTask });
};

exports.getTasks = (req, res) => {
  console.log('Get Tasks: ', tasks);
  return res.status(200).json(tasks);
};

exports.updateTask = (req, res) => {
  const { taskId, titulo, descricao, detalhes, columnId } = req.body;
  console.log('Update Task:', taskId, titulo, descricao, detalhes, columnId);

  const taskIndex = tasks.findIndex(task => task.newTaskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  tasks[taskIndex] = { newTaskId: taskId, titulo, descricao, detalhes, columnId };
  console.log('Tasks after update:', tasks);
  return res.status(200).json({ message: 'Tarefa atualizada com sucesso.', task: tasks[taskIndex] });
};

exports.deleteTask = (req, res) => {
  const { taskId } = req.params;
  console.log('Delete Task:', taskId);

  const taskIndex = tasks.findIndex(task => task.newTaskId === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }
  tasks.splice(taskIndex, 1);
  console.log('Tasks after deletion:', tasks);
  return res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
};