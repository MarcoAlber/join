let contactChar;
let currentDraggedElement;
let currentStatus;
let currentTask;
let contactColor;
let subTasksFinish;

/** render all tasks */
async function renderTasks() {
  await init();
  for (let i = 0; i < tasks.length; i++) {
    currentTask = tasks[i];
    document.getElementById(`${currentTask["status"]}`).innerHTML +=
      taskCardHtml();
    renderArrays();
  }
}

/** display add task template */
function showAddTaskTemplate() {
  document.getElementById("templateContainer").classList.remove("dp-none");
  document.getElementById("body").style = "overflow-y: hidden;";
}

/** displays the subtask & assign to length */
function renderArrays() {
  checkSubtask();
  checkAssignTo();
}

/** displays the subtask length */
function checkSubtask() {
  for (let j = 0; j < currentTask["subTask"].length; j++) {
    let calcWidth =
      currentTask["subTaskFinish"] / currentTask["subTask"].length * 100;
    document.getElementById(`subtaskContainer${currentTask["id"]}`).innerHTML =
      subtaskHtml(calcWidth);
  }
}

/** displays the assign to length */
function checkAssignTo() {
  if (currentTask["contact"].length == 0) {
    document.getElementById(`contactContainer${currentTask["id"]}`).innerHTML =
      "";
  } else {
    if (currentTask["contact"].length <= 3) {
      for (let j = 0; j < currentTask["contact"].length; j++) {
        getCharAtNull(j);
        getContactColor(j);
        document.getElementById(`contactContainer${currentTask["id"]}`).innerHTML += assignToHtml();
      }
    } else {
      assignToBigger3();
    }
  }
}

/** displays the assign to if length bigger than 3 */
function assignToBigger3() {
  for (let j = 0; j < 2; j++) {
    getCharAtNull(j);
    getContactColor(j);
    document.getElementById(`contactContainer${currentTask["id"]}`).innerHTML +=
      assignToBigger3Html(j);
  }
  document.getElementById(`contactContainer${currentTask["id"]}`).innerHTML +=
    `<p class="contact" style="background-color: #2A3647">+${currentTask["contact"].length - 2}</p>`;
}

/**
 * gets the background color of the contact profile picture
 * @param {id} j = id of contact
 */
function getContactColor(j) {
  let contact = contacts.filter(
    (c) => c.firstName == currentTask["contact"][j]["firstName"]
  );
  contactColor = contact[0]["background"];
}

/**
 * gets the first letters of the first and last name of the contact
 * @param {id} j = id of contact
 */
function getCharAtNull(j) {
  let firstName = currentTask["contact"][j]["firstName"];
  let surname = currentTask["contact"][j]["surname"];
  let firstNameChar = firstName.charAt(0).toUpperCase();
  let surnameChar = surname.charAt(0).toUpperCase();
  contactChar = firstNameChar + surnameChar;
}

/**
 * opens task card
 * @param {id} id = id of task
 */
function openCard(id) {
  document.getElementById("taskCardContainer").classList.remove("dnone");
  currentTask = tasks.find((t) => t.id == id);
  document.getElementById("openTaskCard").innerHTML = openCardHtml();
  getSubtaskForOpenedCard(id);
  for (let i = 0; i < currentTask["contact"].length; i++) {
    getCharAtNull(i);
    getContactColor(i);
    document.getElementById(`assingToCard${id}`).innerHTML +=
      openCardAssingToHtml(i);
  }
}

/** close task card */
function closeCard() {
  document.getElementById("taskCardContainer").classList.add("dnone");
}

/**
 * displays the subtasks in the task detail container
 * @param {id} id = id of task
 */
function getSubtaskForOpenedCard(id) {
  if (currentTask["subTask"].length == 0) {
    document.getElementById(`openedSubtaskContainer${id}`).innerHTML = "";
  } else {
    for (let j = 0; j < currentTask["subTask"].length; j++) {
      let currentTaskId = currentTask["id"] + j;
      document.getElementById(`openedSubtaskContainer${id}`).innerHTML +=
        openCardSubtaskToHtml(currentTaskId, j);
      getSubtaskChecked(currentTaskId, j);
    }
  }
}

/**
 * fills or emptys the checkbox of the subtask
 * @param {id} currentTaskId = id of subtask
 * @param {number} j = number from 0 to current task subtask length
 */
function getSubtaskChecked(currentTaskId, j) {
  if (subTasksFinish.length == 0) {
    document.getElementById(currentTaskId).innerHTML = subtaskAddHtml(currentTaskId, j);
  }
  if (subTasksFinish.includes(`${currentTaskId}`)) {
    document.getElementById(currentTaskId).innerHTML = subtaskFinishHtml(currentTaskId, j);
  } else {
    document.getElementById(currentTaskId).innerHTML = subtaskAddHtml(currentTaskId, j);
  }
}

/**
 * deletes the task
 * @param {id} id = id of task 
 */
async function deleteTask(id) {
  let currentTaskIndex = tasks.findIndex((t) => t.id == id);
  tasks.splice(currentTaskIndex, 1);
  await addTasks();
  await updateHtml();
  closeCard();
}

/**
 * fills the checkbox of the subtask
 * @param {id} id = id of subtask
 * @param {number} j = number from 0 to current task subtask length
 */
async function addSubtaskToFinish(id, j) {
  let subTaskFinish = currentTask["subTaskFinish"] + 1;
  currentTask["subTaskFinish"] = subTaskFinish;
  await backend.setItem("tasks", JSON.stringify(tasks));
  updateHtml();
  subTasksFinish.push(id);
  await backend.setItem("subTasks", JSON.stringify(subTasksFinish));
  closeCard();
}

/**
 * emptys the checkbox of the subtask
 * @param {id} id = id of subtask
 * @param {number} j = number from 0 to current task subtask length
 */
async function addSubtaskToDelete(id, j) {
  let subTaskFinish = currentTask["subTaskFinish"] - 1;
  currentTask["subTaskFinish"] = subTaskFinish;
  await backend.setItem("tasks", JSON.stringify(tasks));
  updateHtml();
  let deleteId = subTasksFinish.findIndex((s) => s == id);
  subTasksFinish.splice(deleteId, 1);
  await backend.setItem("subTasks", JSON.stringify(subTasksFinish));
  closeCard();
}

/**
 * display or not show the move menu for small devices
 * @param {id} id = id of task
 */
function toggleMoveMenu(id) {
  if (document.getElementById(`task-card-move-menu-${id}`).classList.contains("d-none")) {
    document.getElementById(`task-card-move-menu-${id}`).classList.remove("d-none");
    document.getElementById(`task-card-move-menu-icon-${id}`).setAttribute("src", "../assets/img/close-window-32.png");
    let status = tasks.find((t) => t.id == id)["status"].replace(/\s/g, "");
    document.getElementById(`${status}-move-menu-item-${id}`).classList.add("d-none");
  } else {
    document.getElementById(`task-card-move-menu-${id}`).classList.add("d-none");
    document.getElementById(`task-card-move-menu-icon-${id}`).setAttribute("src", "../assets/img/arrow-59-32.png");
  }
}

/** filters all tasks by input value */
function filterTasks() {
  let search = document.getElementById('searchTask').value.toLowerCase();
  let content = document.getElementById('status-container');
  let cards = content.querySelectorAll('.task-card');

  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector('.task-card-title').innerHTML;
    let description = cards[i].querySelector('.task-card-description').innerHTML;
    if (title.toLowerCase().includes(search) || description.toLowerCase().includes(search)) {
      cards[i].style.display = 'block';
    } else {
      cards[i].style.display = 'none';
    }
  }
}