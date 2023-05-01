let tasks = [];
let prios = [];
let subTask = [];
let assignTo = [];
let category;
let color;
let currentPrio;
let currentId;
let currentStatusTemp;

load();

function getTasksId() {
  currentId = Math.random() + tasks.length;
}

function disableDateinput() {
  var today = new Date().toISOString().split("T")[0];
  document.getElementsByName("input-date")[0].setAttribute("min", today);
}

function disableDateInputTemplate() {
  var today = new Date().toISOString().split("T")[0];
  document.getElementsByName("inputDateTemplate")[0].setAttribute("min", today);
}

function addingPrio(prio) {
  if (prios.includes(prio)) {
    checkPrio(prio);
  } else {
    prios.push(prio);
    checkPrio(prio);
  }
}

function checkPrio(newprio) {
  for (let i = 0; i < prios.length; i++) {
    let prio = prios[i];
    if (prio != newprio || currentPrio == newprio) {
      takePrio(prio);
    } else {
      getPrio(prio);
    }
  }
  currentPrio = newprio;
}

function getPrio(prio) {
  document.getElementById(prio).classList.add(prio);
  document.getElementById(
    `${prio}-img`
  ).src = `../addtask/assets/img/${prio}-white.svg`;
}

function takePrio(prio) {
  document.getElementById(prio).classList.remove(prio);
  document.getElementById(
    `${prio}-img`
  ).src = `../addtask/assets/img/prio-${prio}.svg`;
}

function mustFields() {
  if (!category && !currentPrio) {
    document.getElementById("categoryInput").classList.add("error");
    document.getElementById("prios").classList.add("error");
    setTimeout(() => {
      document.getElementById("prios").classList.remove("error");
      document.getElementById("categoryInput").classList.remove("error");
    }, 1500);
  }
  else if (!category && currentPrio) {
    document.getElementById("categoryInput").classList.add("error");
    setTimeout(() => {
      document.getElementById("categoryInput").classList.remove("error");
    }, 1500);
  }
  else if (!currentPrio && category) {
    document.getElementById("prios").classList.add("error");
    setTimeout(() => {
      document.getElementById("prios").classList.remove("error");
    }, 1500);
  }
  else {
    getValuesFromInputs();
  }
}

function getValuesFromInputs() {
  let title = document.getElementById("input-title");
  let description = document.getElementById("input-description");
  let date = document.getElementById("input-date");
  createTask(title, description, date);
}

function createTask(title, description, date) {
  tasks.push({
    title: title.value,
    description: description.value,
    date: date.value,
    prio: currentPrio,
    category: category,
    color: color,
    subTask: subTask,
    contact: assignTo,
    status: "to do",
    subTaskFinish: 0,
    id: currentId,
  });
  addTasks();
  linkToBoard();
  title.value = "";
  description.value = "";
  date.value = "";
}

function linkToBoard() {
  document.getElementById("addedToBoard").innerHTML = linkToBoardHtml();
  setTimeout(function () {
    window.location.href = "../board/board.html";
  }, 3000);
}

function addNewSubtask() {
  document.getElementById("addNewSubtask").innerHTML = addNewSubtaskHtml();
  document.getElementById("new-subTask").select();
}

function clearSubtask() {
  document.getElementById("emptySubtask").classList.add("d-none");
  document.getElementById("addNewSubtask").innerHTML = clearSubtaskHtml();
}

function createNewSubtask() {
  if (document.getElementById("new-subTask").value.length < 1) {
    document.getElementById("emptySubtask").classList.remove("d-none");
  } else {
    document.getElementById("emptySubtask").classList.add("d-none");
    let newSubtask = document.getElementById("new-subTask").value;
    subTask.push(newSubtask);
    document.getElementById("newSubtask").innerHTML +=
      createNewSubtaskHtml(newSubtask);
    clearSubtask();
  }
}

function openCategoryList() {
  closeAssignList();
  document.getElementById("categoryListContainer").innerHTML =
    openCategoryListHtml();
  document
    .getElementById("closedCategoryInput")
    .classList.add("border-drop-down");
  document.getElementById("categoryList").classList.remove("d-none");
  document.getElementById("categoryList").style = `border-top: none`;
}

function openAssignToList() {
  closeCategoryList();
  document.getElementById("assignToContainer").innerHTML =
    openAssignToListHtml();
  document.getElementById("AssignToList").classList.remove("d-none");
  document
    .getElementById("closedAssingToInput")
    .classList.add("border-drop-down");
  renderAddTaskContacts();
}

function closeAssignList() {
  document.getElementById("assignToContainer").innerHTML =
    closeAssignListHtml();
}

function closeCategoryList() {
  document.getElementById("categoryListContainer").innerHTML =
    closeCategoryListHtml();
}

function newCategory() {
  document.getElementById("categoryListContainer").innerHTML =
    newCategoryHtml();
}

function createNewCategory() {
  let createdCategory = document.getElementById("newCategory").value;
  document.getElementById("newCategoryInput").innerHTML +=
    newCreatedCategory(createdCategory);
  getCategory(createdCategory, color);
}

function getCategory(name, newcolor) {
  category = name;
  color = newcolor;
  closeCategoryList();
  document.getElementById(
    "colorContainer"
  ).innerHTML += `<div class="${color} color-container"></div>`;
  document.getElementById("category").value = `${name} `;
}

function getColorForCategory(newcolor) {
  color = newcolor;
  if (color == newcolor) {
    document.getElementById(newcolor).classList.add("active-color");
  } else {
    document.getElementById(newcolor).classList.remove("active-color");
  }
}

function clearCategory() {
  document.getElementById("newCategoryInput").classList.add("d-none");
  document.getElementById("categoryListContainer").innerHTML =
    clearCategoryHtml();
}

function clearAll() {
  window.location.href = "add_task.html";
}

function renderNoAssignToContacts(contact) {
  for (let j = 0; j < assignTo.length; j++) {
    if (
      document.getElementById(`${contact["mail"]}-add`).innerText ==
      `${assignTo[j]["firstName"]} ${assignTo[j]["surname"]}`
    ) {
      document.getElementById(`${contact["mail"]}-add`).classList.add("d-none");
    }
  }
}

let user = JSON.parse(localStorage.getItem("user")) || [];

function renderAllContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    document.getElementById("AssignToList").innerHTML += renderContactsHtml(
      contact,
      i
    );
    if (
      document.getElementById(`${contact["mail"]}-add`).innerText ==
      `${user["firstName"]} ${user["surname"]}`
    ) {
      document.getElementById(`${contact["mail"]}-add`).classList.add("d-none");
    }
    renderNoAssignToContacts(contact);
  }
}

function renderAddTaskContacts() {
  if (user["firstName"] === "Ghost" && user["surname"] === "Guest") {
    renderAllContacts();
  } else if (
    !assignTo.some((item) => item.firstName === `${user["firstName"]}`) &&
    !assignTo.some((item) => item.surname === `${user["surname"]}`)
  ) {
    document.getElementById("AssignToList").innerHTML = assignToYouTemplate();
    renderAllContacts();
  } else {
    renderAllContacts();
  }
}

function assignContactTo(firstName, surname, i) {
  if (
    document.getElementById(`${contacts[i]["mail"]}-input`).checked == false
  ) {
    document.getElementById(`${contacts[i]["mail"]}-input`).click();
    assignTo.push({
      firstName: firstName,
      surname: surname,
    });
  } else if (
    document.getElementById(`${contacts[i]["mail"]}-input`).checked == true
  ) {
    for (let j = 0; j < assignTo.length; j++) {
      if (assignTo[j]["firstName"] == firstName) {
        document.getElementById(`${contacts[i]["mail"]}-input`).click();
        assignTo.splice([j]);
      }
    }
  }
}

function assignContactToYou(firstName, surname) {
  if (document.getElementById(`${user["mail"]}-inputYou`).checked == false) {
    document.getElementById(`${user["mail"]}-inputYou`).click();
    assignTo.push({
      firstName: firstName,
      surname: surname,
    });
  } else if (
    document.getElementById(`${user["mail"]}-inputYou`).checked == true
  ) {
    for (let j = 0; j < assignTo.length; j++) {
      if (assignTo[j]["firstName"] == firstName) {
        document.getElementById(`${user["mail"]}-inputYou`).click();
        assignTo.splice([j]);
      }
    }
  }
}

function newSubTaskValue(newSubtask) {
  subTask.push(newSubtask);
}

function load() {
  let contactsASText = backend.getItem("contactsASText");

  if (contactsASText) {
    contacts = JSON.parse(contactsASText);
  }
}

async function loadTasks() {
  await init();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  getTasksId();
}

async function addTasks() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}

async function mustFieldsTemplate() {
  if (!category && !currentPrio) {
    document.getElementById("categoryInput").classList.add("error");
    document.getElementById("prios").classList.add("error");
    setTimeout(() => {
      document.getElementById("prios").classList.remove("error");
      document.getElementById("categoryInput").classList.remove("error");
    }, 1500);
  }
  else if (!category && currentPrio) {
    document.getElementById("categoryInput").classList.add("error");
    setTimeout(() => {
      document.getElementById("categoryInput").classList.remove("error");
    }, 1500);
  }
  else if (!currentPrio && category) {
    document.getElementById("prios").classList.add("error");
    setTimeout(() => {
      document.getElementById("prios").classList.remove("error");
    }, 1500);
  }
  else {
    getValuesFromInputsTemplate();
  }
}

function getValuesFromInputsTemplate() {
  let templateTitle = document.getElementById("inputTitleTemplate");
  let templateDescription = document.getElementById("inputDescriptionTemplate");
  let templateDate = document.getElementById("inputDateTemplate");
  createTaskTemplate(templateTitle, templateDescription, templateDate);
}

async function createTaskTemplate(title, description, date) {
  getTasksId();
  tasks.push({
    title: title.value,
    description: description.value,
    date: date.value,
    prio: currentPrio,
    category: category,
    color: color,
    subTask: subTask,
    contact: assignTo,
    status: currentStatusTemp,
    subTaskFinish: 0,
    id: currentId,
  });
  if (window.location.pathname == '/board/board.html') {
    addTasks();
    await updateHtml();
    title.value = "";
    description.value = "";
    date.value = "";
    closeAddTaskContainer();
  }
  else {
    addTasks();
    linkToBoard();
    title.value = "";
    description.value = "";
    date.value = "";
  }
}