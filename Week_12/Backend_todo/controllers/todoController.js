const db = require('../db');

exports.addTodo = (req, res) => {
  console.log('Request body:', req.body);
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  db.query('INSERT INTO todos (task) VALUES (?)', [task], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId, task });
  });
};

exports.getTodos = (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};