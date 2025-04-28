const express = require('express');
const router = express.Router();
const { addTodo, getTodos } = require('../controllers/todoController');

router.post('/addTodo', addTodo);
router.get('/getTodos', getTodos);

module.exports = router;