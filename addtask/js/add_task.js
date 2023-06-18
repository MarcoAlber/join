let tasks = [];
let prios = [];
let subTask = [];
let assignTo = [];
let category;
let color;
let currentPrio;
let currentId;
let currentStatusTemp;

/** loads contacts of database */
load();

/** creates a random task id */
function getTasksId() {
  currentId = Math.random() + tasks.length;
}

/** disables past days in calendar */
function disableDateinput() {
  var today = new Date().toISOString().split("T")[0];
  document.getElementsByName("input-date")[0].setAttribute("min", today);
}

/** disables past days in template calendar */
function disableDateInputTemplate() {
  var today = new Date().toISOString().split("T")[0];
  document.getElementsByName("inputDateTemplate")[0].setAttribute("min", today);
}

/**
 * adds the priority to the task
 * @param {string} prio = task priority
 */
function addingPrio(prio) {
  if (prios.includes(prio)) {
    checkPrio(prio);
  } else {
    prios.push(prio);
    checkPrio(prio);
  }
}

/**
 * checks which prio is already set 
 * @param {string} newprio = task priority
 */
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

/**
 * displays current pressed priority
 * @param {string} prio = task priority
 */
function getPrio(prio) {
  document.getElementById(prio).classList.add(prio);
  document.getElementById(`${prio}-img`).src = `../addtask/assets/img/${prio}-white.svg`;
  prios = [prio];
}

/**
 * removes past pressed priority
 * @param {string} prio = task priority
 */
function takePrio(prio) {
  document.getElementById(prio).classList.remove(prio);
  document.getElementById(`${prio}-img`).src = `../addtask/assets/img/prio-${prio}.svg`;
}

/** checks if every necessary field is filled */
function mustFields() {
  if (!category && !currentPrio) {
    mustFieldsWithoutBoth();
  }
  else if (!category && currentPrio) {
    mustFieldsOnlyPrio();
  }
  else if (!currentPrio && category) {
    mustFieldsOnlyCategory();
  }
  else {
    getValuesFromInputs();
  }
}

/** displays that two fields are not filled */
function mustFieldsWithoutBoth() {
  document.getElementById("categoryInput").classList.add("error");
  document.getElementById("prios").classList.add("error");
  setTimeout(() => {
    document.getElementById("prios").classList.remove("error");
    document.getElementById("categoryInput").classList.remove("error");
  }, 1500);
}

/** displays that category field is not filled */
function mustFieldsOnlyPrio() {
  document.getElementById("categoryInput").classList.add("error");
  setTimeout(() => {
    document.getElementById("categoryInput").classList.remove("error");
  }, 1500);
}

/** displays that new category field is not filled */
function mustFieldsNewCategory() {
  document.getElementById("newCategory").classList.add("error");
  setTimeout(() => {
    document.getElementById("newCategory").classList.remove("error");
  }, 1500);
}

/** displays that priority field is not filled */
function mustFieldsOnlyCategory() {
  document.getElementById("prios").classList.add("error");
  setTimeout(() => {
    document.getElementById("prios").classList.remove("error");
  }, 1500);
}

/** gets the values of the inputfields */
function getValuesFromInputs() {
  let title = document.getElementById("input-title");
  let description = document.getElementById("input-description");
  let date = document.getElementById("input-date");
  createTask(title, description, date);
}

/**
 * creates a new task
 * @param {input} title = inputfield of the title
 * @param {input} description = inputfield of the description
 * @param {input} date = inputfield of the date
 */
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
  addTaskAndLinkToBoard(title, description, date);
}

/**
 * add the task and link to board page
 * @param {input} title = inputfield of the title
 * @param {input} description = inputfield of the description
 * @param {input} date = inputfield of the date
 */
function addTaskAndLinkToBoard(title, description, date) {
  addTasks();
  linkToBoard();
  title.value = "";
  description.value = "";
  date.value = "";
}

/** link to board page */
function linkToBoard() {
  document.getElementById("addedToBoard").innerHTML = linkToBoardHtml();
  setTimeout(function () {
    window.location.href = "../board/board.html";
  }, 3000);
}

/** add a new subtask */
function addNewSubtask() {
  document.getElementById("addNewSubtask").innerHTML = addNewSubtaskHtml();
  document.getElementById("new-subTask").select();
}

/** empty subtask field */
function clearSubtask() {
  document.getElementById("emptySubtask").classList.add("d-none");
  document.getElementById("addNewSubtask").innerHTML = clearSubtaskHtml();
}

/** create new subtask after clicking on check */
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

/** opens "category" list */
function openCategoryList() {
  closeAssignList();
  document.getElementById("categoryListContainer").innerHTML = openCategoryListHtml();
  document.getElementById("closedCategoryInput").classList.add("border-drop-down");
  document.getElementById("categoryList").classList.remove("d-none");
  document.getElementById("categoryList").style = `border-top: none`;
}

/** opens "assign to" list */
function openAssignToList() {
  closeCategoryList();
  document.getElementById("assignToContainer").innerHTML = openAssignToListHtml();
  document.getElementById("AssignToList").classList.remove("d-none");
  document.getElementById("closedAssingToInput").classList.add("border-drop-down");
  renderAddTaskContacts();
}

/** close "assign to" list */
function closeAssignList() {
  document.getElementById("assignToContainer").innerHTML =
    closeAssignListHtml();
}

/** close "category" list */
function closeCategoryList() {
  document.getElementById("categoryListContainer").innerHTML =
    closeCategoryListHtml();
  if (category != undefined) {
    document.getElementById("colorContainer").innerHTML += `<div class="${color} color-container"></div>`;
    document.getElementById("category").value = `${category}`;
  }
}

/** open new category container */
function newCategory() {
  document.getElementById("categoryListContainer").innerHTML =
    newCategoryHtml();
}

/** creates a new category */
function createNewCategory() {
  let createdCategory = document.getElementById("newCategory").value;
  if (createdCategory == "" || color == undefined) {
    mustFieldsNewCategory();
  }
  else {
    document.getElementById("newCategoryInput").innerHTML +=
      newCreatedCategory(createdCategory);
    getCategory(createdCategory, color);
  }
}

/**
 * gets name and color of category
 * @param {string} name = name of category
 * @param {string} newcolor = name of color
 */
function getCategory(name, newcolor) {
  category = name;
  color = newcolor;
  closeCategoryList();
}

/**
 * checks which color is used for the category
 * @param {string} newcolor = name of color
 */
function getColorForCategory(newcolor) {
  color = newcolor;
  if (color == newcolor) {
    document.getElementById(newcolor).classList.add("active-color");
  } else {
    document.getElementById(newcolor).classList.remove("active-color");
  }
}

/** empty category container */
function clearCategory() {
  document.getElementById("newCategoryInput").classList.add("d-none");
  document.getElementById("categoryListContainer").innerHTML =
    clearCategoryHtml();
}

/** clears add task page */
function clearAll() {
  window.location.href = "add_task.html";
}

/**
 * checks if contact is already in assign to and disable the name if so
 * @param {id} contact = id of contact
 */
function renderNoAssignToContacts(contact) {
  for (let j = 0; j < assignTo.length; j++) {
    if (document.getElementById(`${contact["mail"]}-add`).innerText == `${assignTo[j]["firstName"]} ${assignTo[j]["surname"]}`) {
      document.getElementById(`${contact["mail"]}-add`).classList.add("d-none");
    }
  }
}

let user = JSON.parse(localStorage.getItem("user")) || [];

/** display all contacts in assign to list */
function renderAllContacts() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    document.getElementById("AssignToList").innerHTML += renderContactsHtml(contact, i);
    if (document.getElementById(`${contact["mail"]}-add`).innerText == `${user["firstName"]} ${user["surname"]}`) {
      document.getElementById(`${contact["mail"]}-add`).classList.add("d-none");
    }
    renderNoAssignToContacts(contact);
  }
}

/** checks if guest is logged in so display all users or a user is logged in and display the assign to you */
function renderAddTaskContacts() {
  if (user["firstName"] === "Ghost" && user["surname"] === "Guest") {
    renderAllContacts();
  }
  else if (!assignTo.some((item) => item.firstName === `${user["firstName"]}`) &&
    !assignTo.some((item) => item.surname === `${user["surname"]}`)) {
    document.getElementById("AssignToList").innerHTML = assignToYouTemplate();
    renderAllContacts();
  } else {
    renderAllContacts();
  }
}

/**
 * adds or remove  assign to contact
 * @param {string} firstName = first name of assign to contact
 * @param {string} surname = surname of assign to contact
 * @param {id} i = id of contact
 */
function assignContactTo(firstName, surname, i) {
  if (document.getElementById(`${contacts[i]["mail"]}-input`).checked == false) {
    document.getElementById(`${contacts[i]["mail"]}-input`).click();
    assignTo.push({
      firstName: firstName,
      surname: surname,
    });
  } else if (document.getElementById(`${contacts[i]["mail"]}-input`).checked == true) {
    for (let j = 0; j < assignTo.length; j++) {
      if (assignTo[j]["firstName"] == firstName) {
        document.getElementById(`${contacts[i]["mail"]}-input`).click();
        assignTo.splice([j]);
      }
    }
  }
}

/**
 * adds or remove  assign to you
 * @param {string} firstName = first name of assign to contact
 * @param {string} surname = surname of assign to contact
 */
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

/**
 * push new subtask to subtask array
 * @param {string} newSubtask = name of new subtask
 */
function newSubTaskValue(newSubtask) {
  subTask.push(newSubtask);
}

/** loads contacts of database */
function load() {
  let contactsASText = backend.getItem("contactsASText");

  if (contactsASText) {
    contacts = JSON.parse(contactsASText);
  }
}

/** loads tasks of database */
async function loadTasks() {
  await init();
  tasks = JSON.parse(backend.getItem("tasks")) || [];
  getTasksId();
}

/** adds task of database */
async function addTasks() {
  await backend.setItem("tasks", JSON.stringify(tasks));
}

/** checks if every necessary field in template is filled */
async function mustFieldsTemplate() {
  if (!category && !currentPrio) {
    mustFieldsWithoutBoth();
  }
  else if (!category && currentPrio) {
    mustFieldsOnlyPrio();
  }
  else if (!currentPrio && category) {
    mustFieldsOnlyCategory();
  }
  else {
    getValuesFromInputsTemplate();
  }
}

/**
* creates a new task in template
 * @param {input} title = inputfield of the title
 * @param {input} description = inputfield of the description
 * @param {input} date = inputfield of the date
 */
function pushTaskOfTemplate(title, description, date) {
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
}

/** sets current status if no status is set */
function setCurrentStatus() {
  if (currentStatusTemp == undefined) { currentStatusTemp = "to do" }
  else { currentStatusTemp };
}

/** get values of inputfields in template */
function getValuesFromInputsTemplate() {
  let templateTitle = document.getElementById("inputTitleTemplate");
  let templateDescription = document.getElementById("inputDescriptionTemplate");
  let templateDate = document.getElementById("inputDateTemplate");
  createTaskTemplate(templateTitle, templateDescription, templateDate);
}

/**
 * add the task in template and link to board page if not on board page
 * @param {input} title = inputfield of the title
 * @param {input} description = inputfield of the description
 * @param {input} date = inputfield of the date
 */
async function createTaskTemplate(title, description, date) {
  getTasksId();
  setCurrentStatus();
  pushTaskOfTemplate(title, description, date);
  if (window.location.pathname == '/join/board/board.html' ||
    window.location.pathname == '/board/board.html') {
    addTasks();
    await updateHtml();
    title.value = "";
    description.value = "";
    date.value = "";
    closeAddTaskContainer();
  }
  else {
    addTaskAndLinkToBoard(title, description, date);
  }
}