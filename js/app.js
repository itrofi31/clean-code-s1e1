//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

var taskInput = document.getElementById('new-task'); //Add a new task.
var addButton = document.querySelector('.btn--add'); //first button
var incompleteTaskHolder = document.querySelector('.todo__list'); //ul of #incompleteTasks
var completedTasksHolder = document.querySelector('.completed__list'); //completed-tasks

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');

  var checkBox = document.createElement('input'); //
  var label = document.createElement('label'); //label
  var editInput = document.createElement('input'); //text
  var editButton = document.createElement('button');

  var deleteButton = document.createElement('button');
  var deleteButtonImg = document.createElement('img');

  listItem.className = 'list-item';

  label.innerText = taskString;
  label.className = 'todo__label task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  checkBox.className = 'input--checkbox';
  editInput.type = 'text';
  editInput.className = 'todo__input input--text task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'btn btn--edit';

  deleteButton.className = 'btn btn--delete';
  deleteButtonImg.src = './assets/remove.svg';
  deleteButtonImg.className = 'remove-icon';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

var editTask = function () {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector('.input--text');
  var label = listItem.querySelector('label');
  var editBtn = listItem.querySelector('.btn--edit');
  var containsClass = listItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('editMode');
};

var deleteTask = function () {
  console.log('Delete Task...');

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log('AJAX Request');
};

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select ListItems children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('.btn--edit');
  var deleteButton = taskListItem.querySelector('.btn--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
