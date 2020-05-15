$(document).ready(function () {
  updateTodoList();
});

$('.add').on('click', function(e) {
  e.preventDefault();
  $('.currentList').append(`
    <div class="todo">
      <input type="text" class="newTodo" value=""></input>
      <span class="edit">📝</span>
      <span class="delete" id="">✖️</span>
    </div>
  `);
});

$(document).keypress(function(e) {
  if (e.which == 13) {//Enter key pressed
    let textValue = $('.newTodo').val()
    if (textValue === undefined) {
      return 
    } else {
      axios.post('/api/todos', {
        todo: textValue
      });
      updateTodoList();
    }
  };
});

$(document).on('click', '.edit', function() {
  console.log("edit clicked!")
});

$(document).on('click', '.delete', function() {
  let id = (this.id)
  axios.delete(`/api/todos/${id}`)
    .then((response) => {
      $('.currentList').html(' ');
      response.data.forEach(toDo => {
        $('.currentList').append(renderTodo(toDo));
      });
    });
});

function renderTodo(toDo) {
  let html = `
    <div class="todo">
      <input type="text" class="todoText" value="${toDo.todo}"></input>
      <span class="edit">📝</span>
      <span class="delete" id="${toDo.id}">✖️</span>
    </div>
  `
  return html;
}

function updateTodoList() {
  axios.get('/api/todos')
    .then((response) => {
      $('.currentList').html(' ');
      response.data.forEach(toDo => {
        $('.currentList').append(renderTodo(toDo));
      });
    });
}