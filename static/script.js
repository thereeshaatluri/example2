const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Fetch tasks from the server
async function fetchTasks() {
  const response = await fetch('/tasks');
  const tasks = await response.json();
  taskList.innerHTML = '';
  tasks.forEach((task) => displayTask(task));
}

// Add task to the server
async function addTask() {
  const task = { title: taskInput.value, completed: false };
  await fetch('/add-task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  taskInput.value = '';
  fetchTasks();
}

// Delete task from the server
async function deleteTask(id) {
  await fetch(`/delete-task/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Toggle task completion
async function toggleTaskCompletion(id) {
  await fetch(`/toggle-task/${id}`, { method: 'PUT' });
  fetchTasks();
}

// Display task in the UI
function displayTask(task) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${task.completed ? 'completed' : ''}" onclick="toggleTaskCompletion(${task.id})">
      ${task.title}
    </span>
    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
  `;
  taskList.appendChild(li);
}

fetchTasks();
