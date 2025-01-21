// Wait for the DOM to fully load before executing code
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid duplicate saving
    }

    // Function to save tasks to Local Storage
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create task element
    const createTask = (taskText, save = true) => {
        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add click handler to remove button
        removeButton.onclick = () => {
            li.remove();
            saveTasks(); // Update Local Storage after removal
        }

        // Append the button to the list item and the item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save task to Local Storage if required
        if (save) {
            saveTasks();
        }
    };

    // Function to add a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the input value

        if (taskText === "") {
            alert('Please enter a task.'); // Alert if input is empty
            return;
        }

        // Create and save the task
        createTask(taskText, true);

        // Clear the input field
        taskInput.value = "";

        // Return focus
        taskInput.focus();    
    };

    // // Function to remove a task from Local Storage
    // function removeTask(taskText) {
    //     const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    //     const updatedTasks = storedTasks.filter(task => task !== taskText);
    //     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // }

    // Add event listener for the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks using the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    })
    
    // Load existing tasks when page loads
    loadTasks();
});


