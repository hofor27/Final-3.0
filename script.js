document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const todoButton = document.querySelector('.todo-button');
  const todoList = document.querySelector('.todo-list');
  const filterOption = document.querySelector('.filter-todo');

  // Load tasks from local storage when the page loads
  loadTasksFromLocalStorage();

  todoButton.addEventListener('click', addTodo);
  todoList.addEventListener('click', deleteCheck);
  filterOption.addEventListener('change', filterTodo);

  function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; // Corrected to display the text
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('check-btn');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = '';

    // Save the task to local storage
    saveTasksToLocalStorage();
  }

  function deleteCheck(event) {
    const item = event.target;
    const todo = item.parentElement;

    if (item.classList.contains('trash-btn')) {
      todo.remove();

      // Remove the task from local storage
      saveTasksToLocalStorage();
    }

    if (item.classList.contains('check-btn')) {
      todo.classList.toggle('completed');

      // Update task completion status in local storage
      saveTasksToLocalStorage();
    }
  }

  function filterTodo() {
    const todos = document.querySelectorAll('.todo');

    todos.forEach(function (todo) {
      switch (filterOption.value) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'completed':
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case 'uncompleted':
          if (!todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
      }
    });
  }

  function saveTasksToLocalStorage() {
    const todos = document.querySelectorAll('.todo');
    const tasks = [];

    todos.forEach(function (todo) {
      tasks.push({
        text: todo.querySelector('.todo-item').innerText,
        completed: todo.classList.contains('completed')
      });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (task) {
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      const newTodo = document.createElement('li');
      newTodo.innerText = task.text; // Corrected to display the text
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);

      if (task.completed) {
        todoDiv.classList.add('completed');
      }

      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('check-btn');
      todoDiv.appendChild(completedButton);

      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);

      todoList.appendChild(todoDiv);
    });
  }
});
