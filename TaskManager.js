let taskMenu = `Task Manager Menu: 
1. Add Task 
2. View Tasks 
3. Tooggle Task Completion
4. Edit Task
5. Delete Task
6. Search by name
7. Exit 
`;
console.log(taskMenu);

// data on the array
let id = 1; let description = null; let statustask = false;

let tasks = [];

let choice;
const taskManager = (message) =>{
    switch (message){
        case 1:{
            addTask(choice);
            break;
        }
        case 2:{
            viewTasks();
            break;
        }
        case 3:{
            completed(choice);         
            break;
        }
        case 4:{
            edittask(choice);
            break;
        }
        case 5:{
            deleteTask(choice);
            break;
        }
        case 6:{
            Search(choice);
            break;
        }
        case 7:{
            break;
        }
        default:{
            console.log("Invalid choice, please enter a number between 1 to 7 😊");
        }
    }
}
// get tasks from local storage
console.log(localStorage.getItem("List_Tasks"));

const addTask = (task) =>{
    task = prompt("Enter the Task description");

    tasks.push({id: id++, description: task, statustask: statustask}); //add an object on the array
    console.log(`Task added: ${task}`);
}

const viewTasks = () =>{
    tasks.forEach((task) =>{
        let allTasks = ` ${task.id} . ${task.description} [ ${task.statustask == false ? 'Not Completed' : 'Completed'} ]`;
        console.log(allTasks);
    });
}  

const completed = (num) =>{
    num = Number(prompt("Enter the task ID to toggle completion"));
            
    let task = tasks.find( (data) => data.id === num);

    if(task){
        task.statustask = !task.statustask;

        task.statustask == false ? console.log(`Task "${task.description}" is now marked as Not Completed `) : console.log(`Task "${task.description}" is now marked as Completed `);
    }else{
        console.log("Task ID not found");
    }
}

const edittask = (num) => {
    num = Number(prompt("Enter the task ID to edit"));

    let task = tasks.find((data) => data.id === num);
    
    if(task){
        let newDescription = prompt("Enter the new description");
        task.description = newDescription;

        console.log(`Task "${num}" updated to: ${newDescription}`);
    }else{
        console.log("Task ID not found");
    }
}

const deleteTask = (num) =>{
    num = Number(prompt("Enter the task ID to delete"));

    let task = tasks.find((data) => data.id === num); //find index the task

    if(task){
        console.log(task);
        
        tasks = tasks.filter(t => t.id != task.id); //Create a new array of the tasks without the selected task "task ID"
        console.log("Done ✔️");
    }
    else{
        console.log("Task ID not found");
    }
}

const Search = (name) =>{
    name = prompt("Enter name the task");

    let task = tasks.filter(data => data.description === name); //find the task by name 
    
    // if task existing in the array "Tasks"
    if(task.length > 0){
        task.forEach((tasktest) => console.log(`Task: ${tasktest.description}, id: ${JSON.stringify(tasktest.id)}, status: ${JSON.stringify(tasktest.statustask)}`));
    }
    else{
        console.log("Task not found");
    }
}

while(true){
    let message = Number(prompt("Enter your choice(1-7)"));

    // if the user exit the task manager
    if(message === 7) break;
    taskManager(message);
}

// Save array list task on local storage
localStorage.setItem("List_Tasks", JSON.stringify(tasks));