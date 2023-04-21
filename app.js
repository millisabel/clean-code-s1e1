//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");


//New task list item
const createNewTaskElement = function (taskString) {
	const listItem = document.createElement("li");
	const checkBox = document.createElement("input");
	const label = document.createElement("label");
	const editInput = document.createElement("input");
	const editButton = document.createElement("button");
	const deleteButton = document.createElement("button");
	const deleteButtonImg = document.createElement("img");
	
	listItem.classList.add("task");
	
	checkBox.type = "checkbox";
	checkBox.classList.add("task__checkbox");

	label.innerText = taskString;
	label.classList.add("task__text");
	
	editInput.type = "text";
	editInput.classList.add("task__field");

	editButton.innerText = "Edit"; 
	editButton.classList.add("task__btn", "task__btn_edit");

	deleteButton.classList.add("task__btn", "task__btn_delete");
	
	deleteButtonImg.src = "./remove.svg";
	deleteButtonImg.alt = "remove item";
	deleteButtonImg.classList.add("task__img");
	
	deleteButton.appendChild(deleteButtonImg);
	
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}


const addTask = function () {
	console.log("Add Task...");
	
	if (!taskInput.value) return;
	const listItem = createNewTaskElement(taskInput.value);

	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

const editTask = function () {
	console.log("Edit Task...");
	console.log("Change 'edit' to 'save'");

	const listItem = this.parentNode;

	const editInput = listItem.querySelector("input[type='text']");
	const label = listItem.querySelector("label");
	const editBtn = listItem.querySelector(".task__btn_edit");
	const containsClass = listItem.classList.contains("task_edit");
	
	if (containsClass) {
		label.innerText = editInput.value;
		editBtn.innerText = "Edit";
	} else {
		editInput.value = label.innerText;
		editBtn.innerText = "Save";
	}

	listItem.classList.toggle("task_edit");
};

const deleteTask = function () {
	console.log("Delete Task...");

	const listItem = this.parentNode;
	const ul = listItem.parentNode;
	ul.removeChild(listItem);
}


//Mark task completed
const taskCompleted = function () {
	console.log("Complete Task...");

	const listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
	console.log("Incomplete Task...");

	const listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}


const ajaxRequest = function () {
	console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	console.log("bind list item events");

	const checkBox = taskListItem.querySelector("input[type=checkbox]");
	const editButton = taskListItem.querySelector(".task__btn_edit");
	const deleteButton = taskListItem.querySelector(".task__btn_delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}