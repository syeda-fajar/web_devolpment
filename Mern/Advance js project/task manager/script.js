const submitBtn = document.querySelector('#submit1');
const titleInput = document.querySelector('#task-title');
const descInput = document.querySelector('#txt1');
const categoryInput = document.querySelector('#task-category');
const priorityInput = document.querySelector('#task-priority');
const priorityFilter = document.querySelector('#priority-filter');
const categoryFilter = document.querySelector('#category-filter');
const form = document.querySelector('#form');
const taskList = document.querySelector('#task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editIndex = null;
let draggedIndex = null;

// Event: Filter change
priorityFilter.addEventListener('change', displayTasks);
categoryFilter.addEventListener('change', displayTasks);

// Save tasks to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Display tasks with filters
function displayTasks() {
    taskList.innerHTML = '';

    const selectedPriority = priorityFilter?.value || 'all';
    const selectedCategory = categoryFilter?.value || 'all';

    const filteredTasks = tasks.filter(task => {
        const matchPriority = selectedPriority === 'all' || task.priority === selectedPriority;
        const matchCategory = selectedCategory === 'all' || task.category === selectedCategory;
        return matchPriority && matchCategory;
    });

    filteredTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-item');
        taskDiv.setAttribute('draggable', 'true');
        taskDiv.setAttribute('data-index', index);

        // Add class based on priority
        if (task.priority === 'High') {
            taskDiv.classList.add('priority-high');
        } else if (task.priority === 'Medium') {
            taskDiv.classList.add('priority-medium');
        } else {
            taskDiv.classList.add('priority-low');
        }

        taskDiv.innerHTML = `
            <h4>Category: ${task.category} | Priority: ${task.priority}</h4>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="startEditTask(${index})">Edit</button>
        `;

        // Drag-and-drop listeners
        taskDiv.addEventListener('dragstart', handleDragStart);
        taskDiv.addEventListener('dragover', handleDragOver);
        taskDiv.addEventListener('drop', handleDrop);
        taskDiv.addEventListener('dragenter', (e) => e.preventDefault());
        taskDiv.addEventListener('dragend', () => {
            taskDiv.classList.remove('drag-over');
        });

        taskList.appendChild(taskDiv);
    });
}

// Add or update task
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const category = categoryInput.value;
    const priority = priorityInput.value;

    if (title === '' || description === '') {
        alert('Please fill in both fields');
        return;
    }

    const task = { title, description, category, priority };

    if (editIndex !== null) {
        tasks[editIndex] = task;
        editIndex = null;
    } else {
        tasks.push(task);
    }

    saveTasksToLocalStorage();
    displayTasks();

    // Clear form
    titleInput.value = '';
    descInput.value = '';
    categoryInput.value = '';
    priorityInput.value = '';
    form.reset();
});

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    displayTasks();
}

// Start editing task
function startEditTask(index) {
    const task = tasks[index];
    titleInput.value = task.title;
    descInput.value = task.description;
    categoryInput.value = task.category;
    priorityInput.value = task.priority;
    editIndex = index;
}

// Drag and drop handlers
function handleDragStart(e) {
    draggedIndex = +this.getAttribute('data-index');
    this.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const targetIndex = +this.getAttribute('data-index');
    if (draggedIndex === targetIndex) return;

    const temp = tasks[draggedIndex];
    tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, temp);

    saveTasksToLocalStorage();
    displayTasks();
}

displayTasks(); // Initial load
