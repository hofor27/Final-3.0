document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const logoutButton = document.getElementById("logoutButton");
  const todoInput = document.getElementById("todo-input");
  const todoButton = document.querySelector(".todo-button");
  const todoList = document.querySelector(".todo-list");
  const filterOption = document.querySelector(".filter-todo");

  if (!isLoggedIn || isLoggedIn !== "true") {
    // User is not logged in, redirect to login.html
    window.location.href = "login.html";
  } else {
    // User is logged in, retrieve username from localStorage
    const username = localStorage.getItem("username");
    alert(`Welcome, ${username}! You are logged in.`);

    // Load tasks from localStorage
    loadTasksFromLocalStorage();
  }

  // Logout button click event listener
  logoutButton.addEventListener("click", function () {
    // Clear data from localStorage and redirect to login.html
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  });

  // Load tasks from local storage when the page loads
  loadTasksFromLocalStorage();

  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteCheck);
  filterOption.addEventListener("change", filterTodo);

  // Initial tasks as an array of objects
  const initialTasks = [
    {
      id: 1,
      text: "1. Fundamentos",
      completed: false,
    },
    {
      id: 2,
      text: "2. Eventos",
      completed: false,
    },
    {
      id: 3,
      text: "3. DOM",
      completed: false,
    },
    {
      id: 4,
      text: "4. Salvar no navegador",
      completed: false,
    },
  ];

  // Load initial tasks
  initialTasks.forEach((task) => {
    createTodoItem(task.id, task.text, task.completed);
  });

  function addTodo(event) {
    event.preventDefault();

    const newId = Date.now(); // Generate a unique ID (you can use a more robust method)

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoDiv.setAttribute("data-id", newId); // Set the ID as a data attribute

    todoList.appendChild(todoDiv);
    todoInput.value = "";

    // Save the task to local storage
    saveTasksToLocalStorage();
  }

  function deleteCheck(event) {
    const item = event.target;
    const todo = item.parentElement;
    const taskId = todo.getAttribute("data-id"); // Get the ID from the data attribute

    if (item.classList.contains("trash-btn")) {
      todo.remove();

      // Remove the task from local storage based on its ID
      removeTaskFromLocalStorage(taskId);
    }

    if (item.classList.contains("check-btn")) {
      todo.classList.toggle("completed");

      // Update task completion status in local storage based on its ID
      updateTaskCompletionInLocalStorage(taskId);
    }
  }

  function filterTodo() {
    const todos = document.querySelectorAll(".todo");

    todos.forEach(function (todo) {
      switch (filterOption.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }

  function saveTasksToLocalStorage() {
    const todos = document.querySelectorAll(".todo");
    const tasks = [];

    todos.forEach(function (todo) {
      const taskId = todo.getAttribute("data-id");
      tasks.push({
        id: taskId,
        text: todo.querySelector(".todo-item").innerText,
        completed: todo.classList.contains("completed"),
      });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
      createTodoItem(task.id, task.text, task.completed);
    });
  }

  function createTodoItem(id, text, completed) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = text;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoDiv.setAttribute("data-id", id); // Set the ID as a data attribute

    if (completed) {
      todoDiv.classList.add("completed");
    }

    todoList.appendChild(todoDiv);
  }
});
