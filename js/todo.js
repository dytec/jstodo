function get_todos() {
  var todos = new Array;
  var todos_str = localStorage.getItem('todo');
  if (todos_str != null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}

function add() {
  var task = document.getElementById('task').value;

  var todos = get_todos();
  todos.push(task);
  localStorage.setItem('todo', JSON.stringify(todos));

  document.getElementById('task').value = null;
  document.getElementById('task').focus();

  show();

  return false;
}

function show() {
  var todos = get_todos();

  var html = '<ul>';
  for (var i=0; i<todos.length; i++) {
    html += '<li>' + todos[i] + '<button class="remove material-icons button button-remove" id="' + i + '">remove_circle_outline</button></li>';
  };
  html += '</ul>';

  document.getElementById('todos').innerHTML = html;

  var buttons = document.getElementsByClassName('remove');
  for (var i=0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', remove);
  };
}

function remove() {
  var id = this.getAttribute('id');
  var todos = get_todos();
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));

  show();

  return false;
}

function clear() {
  var result = confirm("Are you sure?");
  if (result) {
    localStorage.clear();

    show();

    document.getElementById('task').focus();
  }
  
  return false;
}

function checkEnter(e) {
  if(e && e.keyCode == 13) {
    add();
  }
}

document.getElementById('add').addEventListener('click', add);
document.getElementById('clear').addEventListener('click', clear);
show();
