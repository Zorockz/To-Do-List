import { format } from 'https://cdn.skypack.dev/date-fns';

let todos = [];

const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const todoTitle = document.getElementById('task');
const todoDescription = document.getElementById('description');
const todoDueDate = document.getElementById('due-date');
const todoPriority = document.getElementById('priority');

const newtodo = {
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    completed: false,
};

// Function to create a new todo item
function addtodo(e){
    e.preventDefault();
const todo = {
    title: todoTitle.value,
    description: todoDescription.value,
    dueDate: todoDueDate.value,
    priority: todoPriority.value,
    completed: false
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  todoForm.reset();
}; 

// Listening for form submission
todoForm.addEventListener('submit', addtodo);

// Function to render the todo list
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li  .innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
            <p>Due Date: ${format(new Date(todo.dueDate), 'dd/MM/yyyy')}</p>
            <p>Priority: ${todo.priority}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Function to delete a todo item
function deleteTodo(index){
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

// Add click handler for delete buttons
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.dataset.index);
        deleteTodo(index);
    }
});

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }


function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
      todos = JSON.parse(saved);
      renderTodos();
    }
  }
  
  loadTodos(); // Call this when the script runs
  