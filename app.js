const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

const todoList = [
  {
    id: 1,
    todo: 'Implement a REST API',
  },
  {
    id: 2,
    todo: 'Hello World!',
  },
  {
    id: 3,
    todo: 'Welcome to the wonderful world of Node.',
  },
];

// GET /api/todos
app.get("/api/todos", (req, res) => res.send(todoList));
// GET /api/todos/:id
app.get("/api/todos/:id", (req, res) => res.send(todoList.filter(todo => todo.id == req.params.id)));
// POST /api/todos

// PUT /api/todos/:id

// DELETE /api/todos/:id

app.listen(3000, function () {
  console.log('Todo List API is now listening on port 3000...');
});
