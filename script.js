document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter');

    // Function to add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task">${taskText}</span>
                <button class="delete-button">X</button>
            `;
            taskList.appendChild(li);
            taskInput.value = '';
            updateTaskList();
        }
    };

    // Function to update task list based on filter
    const updateTaskList = () => {
        const filter = document.querySelector('.filter.active').getAttribute('data-filter');
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach(task => {
            const isCompleted = task.querySelector('.task').classList.contains('completed');
            switch (filter) {
                case 'all':
                    task.style.display = '';
                    break;
                case 'active':
                    task.style.display = isCompleted ? 'none' : '';
                    break;
                case 'completed':
                    task.style.display = isCompleted ? '' : 'none';
                    break;
            }
        });
    };

    // Event listener for adding tasks
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event listener for marking tasks as completed and deleting tasks
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('task')) {
            e.target.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-button')) {
            e.target.parentElement.remove();
        }
        updateTaskList();
    });

    // Event listener for filtering tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateTaskList();
        });
    });

    // Initialize with all filter active
    filterButtons[0].classList.add('active');
});
