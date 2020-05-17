$(document).ready(function () {
  updateTodoList();
});

$('.add').on('click', function(e) {
  e.preventDefault();
  $('.currentList').append(`
    <div class="todo" id="">
      <input type="text" class="newTodo" value=""></input>
      <span class="edit">📝</span>
      <span class="delete">✖️</span>
    </div>
  `);
});

$(document).keypress(function(e) {
  if (e.which == 13) {//Enter key pressed
    let textValue = $('.newTodo').val()
    if (textValue === undefined) {
      return;
    } else {
      axios.post('/api/todos', {
        todo: textValue,
      });
      updateTodoList();
    }
  };
});

$(document).on('click', '.edit', function() {
  let id = $(this).parent().attr('id');
  console.log(id);
  let textValue = $(this).prev().attr('value');
  console.log(textValue);
    // if (textValue === undefined) {
    //   return; 
  axios.put(`/api/todos/${id}`, {
    todo: textValue,
  })
  updateTodoList()
});

$(document).on('click', '.delete', function() {
  let id = $(this).parent().attr('id');
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
    <div class="todo" id="${toDo.id}">
      <input type="text" class="todoText" value="${toDo.todo}"></input>
      <span class="edit">📝</span>
      <span class="delete">✖️</span>
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