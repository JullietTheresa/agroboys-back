const conexao = require('../../db');
const { lista } = require('../Usuario/id');

let newTask = []

exports.createTaskDB = (req, res) => {
    const { titulo, descricao, detalhes, columnId } = req.body;
    console.log('Create Task:', titulo, descricao, detalhes, columnId);

    if (!titulo || !descricao || !columnId) {
        return res.status(400).json({ message: 'ID, título, descrição e coluna são obrigatórios.' });
    }
    
    const usuarioId = lista[0];

    const countTasksSql = 'SELECT MAX(newTaskId) as maior FROM tb_tarefa WHERE usuario_id = ?';
    conexao.query(countTasksSql, usuarioId, (error, results) => {
        if (error) {
            console.error('Erro ao procurar número de tarefas criadas:', error);
            return res.status(500).json({ message: 'Erro ao criar tarefa.' });
        }

        let totalTasks = results[0].maior;
        if (totalTasks === null) {
            console.log("TotalTasks foi igual a NaN")
            totalTasks = "0"
        }
        const toINT = parseInt(totalTasks);
        console.log("toINT: ", toINT);
        
        const total = toINT + 1;
        console.log("Total: ", total);
        
        const toSTR = total.toString(); // Corrigido para chamar toString() no número total
        console.log("toSTR: ", toSTR);
        
        const newTaskId = toSTR;
        console.log(`Numero de tasks do usuario ${lista[0]}: ${newTaskId}`)

        const insertSql = 'INSERT INTO tb_tarefa (usuario_id, newTaskId, titulo, descricao, detalhes, columnId) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [usuarioId, newTaskId, titulo, descricao, detalhes, columnId];

        conexao.execute(insertSql, values, (err, results) => {
            if (err) {
                console.error('Erro ao criar tarefa:', err);
                return res.status(500).json({ message: 'Erro ao criar tarefa.' });
            }
            console.log('Tarefa criada com sucesso:', results);
            return res.status(201).json({
                message: 'Tarefa criada com sucesso.',
                task: { newTaskId, titulo, descricao, detalhes, columnId }
            });
        });
    });
};

exports.getTasksDB = (req, res) => {

    const getTaskssql = 'select columnId, descricao, detalhes, newTaskId, titulo from tb_tarefa where usuario_id = ?'

    conexao.query(getTaskssql, lista[0], (error, results) => {
        if (error) {
            console.log("Erro ao bucas tarefas no BD")
            return res.status(500).json({ message: 'Erro ao bucar tarefas.' });
        } else {
            console.log("Tarefas encontradas com sucesso: ", results)
            return res.status(200).json(results);
        }
    })
};

exports.updateTaskColumnDB = (req, res) => {
    const { taskId, newColumnId } = req.body;
  
    console.log('Update Task Column:', taskId, newColumnId);
  
    if (!taskId || !newColumnId) {
      return res.status(400).json({ message: 'ID da tarefa e nova coluna são obrigatórios.' });
    }
  
    const updateSQL = 'UPDATE tb_tarefa SET columnId = ? WHERE usuario_id = ? AND newTaskId = ?'
    
    conexao.query(updateSQL, [newColumnId, lista[0], taskId], (error, results) => {
        if (error) {
            console.log("Erro ao atualizar coluna.")
            return res.status(500).json({ message: 'Erro ao atualizar coluna.' });
        } else {
            console.log(`Tarefa atualizada para coluna: `, newColumnId)
            return res.status(200).json({ message: 'Coluna da tarefa atualizada com sucesso.'});
        }
    })
};

exports.updateTaskDB = (req, res) => {
    const { taskId, titulo, descricao, detalhes } = req.body;
    console.log('Update Task:', taskId, titulo, descricao, detalhes);

    const updateTaskSQL = 'UPDATE tb_tarefa SET titulo = ?, descricao = ?, detalhes = ? WHERE usuario_id = ? AND newTaskId = ?'
  
    conexao.query(updateTaskSQL, [titulo, descricao, detalhes, lista[0], taskId], (error, results) => {
        if (error) {
            console.log("Erro ao atualizar tarefa.")
            return res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
        } else {
            console.log("Tarefa atualizada com sucesso: ", results);
            return res.status(200).json({ message: 'Tarefa atualizada com sucesso.'});
        }
    })
};

exports.deleteTaskBD = (req, res) => {
    const { taskId } = req.params;
    console.log('Delete Task:', taskId);

    const deleteSQL = 'DELETE from tb_tarefa WHERE usuario_id = ? AND newTaskId = ?'

    conexao.query(deleteSQL, [lista[0], taskId], (error, results) => {
        if (error) {
            console.log("Erro ao deletar tarefa.");
            return res.status(401).json({ message: 'Erro ao deletar tarefa.' });
        } else {
            console.log("Tarefa delatada com sucesso: ", results);
            return res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
        }
    })
};