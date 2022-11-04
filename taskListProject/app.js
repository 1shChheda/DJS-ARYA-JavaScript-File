
const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection'); // going to use: to remove the Task Items of the list
const clearBtn = document.querySelector('.clear-tasks'); // going to use: to clear out all the Task Items of the list
const filter = document.querySelector('#filter'); // going to use: to filter (search) a particular Item of the list
const taskInput = document.querySelector('#task'); // going to use: to get the Task Item's Name from the user

loadEventListeners(); // Load all event listeners

// Load all event listeners
  function loadEventListeners() {
    
    document.addEventListener('DOMContentLoaded', getTasks); // DOM Load event --> so that when the site is reloaded, the tasks show up back at their positions
    
    form.addEventListener('submit', addTask); // Add task event
    
    taskList.addEventListener('click', removeTask); // Remove task event --> remove individual tasks when clicked the x icon
    
    clearBtn.addEventListener('click', clearTasks); // Clear task event
    
    filter.addEventListener('keyup', filterTasks); // Filter tasks event
  }

// Get Tasks from LS 
  // and place them back in the same form in the ul
  function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks')); // converts the input form from string, because Local Storage stores in STRING value
    }

    tasks.forEach(function(task){
      
      const li = document.createElement('li');// Create li element
      
      li.className = 'collection-item'; // Add class
      
      li.appendChild(document.createTextNode(task)); // Create text node and append to li
      
      const link = document.createElement('a'); // Create new link element
      
      link.className = 'delete-item secondary-content'; // Add class
     
      link.innerHTML = '<i class="fa fa-remove"></i>'; // Add icon (along with its html)
      
      li.appendChild(link); // Append the link to li

      
      taskList.appendChild(li); // Append li to ul
    });
  }

// Add Task
  function addTask(e) {
    if(taskInput.value === '') {
      alert('Add a task');
    }

    const li = document.createElement('li'); // Create li element

    li.className = 'collection-item'; // Add class
    
    li.appendChild(document.createTextNode(taskInput.value)); // Create text node and append to li
    
    const link = document.createElement('a'); // Create new link element
    
    link.className = 'delete-item secondary-content'; // Add class
    
    link.innerHTML = '<i class="fa fa-remove"></i>'; // Add icon (along with its html)
    
    li.appendChild(link); // Append the link to li

    
    taskList.appendChild(li); // Append li to ul

    
    storeTaskInLocalStorage(taskInput.value); // Store in LS

    
    taskInput.value = ''; // Clear input

    e.preventDefault();
  }

// Store Task
  function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// Remove Task
  function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
    } 
  }

// Remove from LS
  function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

// Clear Tasks
function clearTasks() {

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }


  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}