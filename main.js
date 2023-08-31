const readline = require('readline');
    // nos permitirá interactuar con la entrada y salida de la consola
const rdln = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];
const log = console.log;

    // f para iterar las tareas
function printTasks() {
  log('Task list:');
  tasks.forEach((task, index) => {
    log(`${index + 1}. [${task.completed ? 'x' : ' '}] ${task.description}`); //muestra la tarea completa o incompleta y "task.description" => muestra la descripción de tarea
  });
}

    // f para agregar las tareas
function addTask(description) {
  tasks.push({ description, completed: false });
  log('Added task.');
  printTasks();
}

    // f para remover tareas
function removeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    log('Deleted task.');
    printTasks();
  } else {
    log('Invalid index.');
  }
}

    // f para tarea completa
function completeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    log('Completed task.');
    printTasks();
  } else {
    log('Invalid index.');
  }
}

    //f para manejar los prompts de la consola
function promptForAction() {
  rdln.question('¿What action do you want to perform? (add/eliminate/complete/exit): ', action => {
    if (action === 'add') {
      rdln.question('Describes the task: ', description => {
        addTask(description);
        promptForAction();
      });
    } else if (action === 'eliminate') {
      rdln.question('Enter the number of the task you want to detele: ', index => {
        removeTask(index - 1);
        promptForAction();
      });
    } else if (action === 'complete') {
      rdln.question('Enter the number of the task you want to complete: ', index => {
        completeTask(index - 1);
        promptForAction();
      });
    } else if (action === 'exit') {
      rdln.close();
    } else {
      log('Invalid action.');
      promptForAction();
    }
  });
}

promptForAction();