let assignUser = [];
let rightPrio;
let currentIdEdit;

function editCardHtml(id) {
  assignUser = [];
  document.getElementById("openTaskCard").innerHTML = editCardHtmlTemplate(id);
  loadCurrentTask(id);
}

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

async function renderImgEdit() {
  for (let k = 0; k < currentIdEdit["contact"].length; k++) {
    document.getElementById('profileImgEdit').innerHTML += `
        <div class="profilePictureEdit" id="profilePictureEdit${k}"></div>`;
    assignUser.push(await contacts.find(c => c.firstName == currentIdEdit["contact"][k]["firstName"]));
  }
  for (let l = 0; l < assignUser.length; l++) {
    document.getElementById(`profilePictureEdit${l}`).style.background = `${assignUser[l]["background"]}`;
    document.getElementById(`profilePictureEdit${l}`).innerHTML = `<img onclick="deleteAssignUser(${l})" src="../assets/img/cancel.png"><span>
      ${assignUser[l]["firstName"].charAt(0).toUpperCase() +
      assignUser[l]["surname"].charAt(0).toUpperCase()}</span>`;
  }
}

function deleteAssignUser(k) {
  assignUser.splice([k], 1);
  document.getElementById(`profilePictureEdit${k}`).classList.add('dp-none');
}

function loadCurrentTask(id) {
  currentIdEdit = tasks.find((t) => t.id == id);
  document.getElementById('input-title-edit').value = `${currentIdEdit["title"]}`;
  document.getElementById('input-description-edit').value = `${currentIdEdit["description"]}`;
  document.getElementById('input-date-edit').value = `${currentIdEdit["date"]}`;
  renderImgEdit();
  if (currentIdEdit["prio"] == "urgent") {
    ifPrioUrgent();
  }
  else if (currentIdEdit["prio"] == "medium") {
    ifPrioMedium();
  }
  else if (currentIdEdit["prio"] == "low") {
    ifPrioLow();
  }
}

function ifPrioUrgent() {
  document.getElementById('urgent-edit').classList.add('urgent');
  document.getElementById('urgent-img-edit').src = "../addtask/assets/img/urgent-white.svg";
  document.getElementById('low-edit').classList.remove('low');
  document.getElementById('low-img-edit').src = "../addtask/assets/img/prio-low.svg";
  document.getElementById('medium-edit').classList.remove('medium');
  document.getElementById('medium-img-edit').src = "../addtask/assets/img/prio-medium.svg";
}

function ifPrioMedium() {
  document.getElementById('medium-edit').classList.add('medium');
  document.getElementById('medium-img-edit').src = "../addtask/assets/img/medium-white.svg";
  document.getElementById('urgent-edit').classList.remove('urgent');
  document.getElementById('urgent-img-edit').src = "../addtask/assets/img/prio-urgent.svg";
  document.getElementById('low-edit').classList.remove('low');
  document.getElementById('low-img-edit').src = "../addtask/assets/img/prio-low.svg";
}

function ifPrioLow() {
  document.getElementById('low-edit').classList.add('low');
  document.getElementById('low-img-edit').src = "../addtask/assets/img/low-white.svg";
  document.getElementById('urgent-edit').classList.remove('urgent');
  document.getElementById('urgent-img-edit').src = "../addtask/assets/img/prio-urgent.svg";
  document.getElementById('medium-edit').classList.remove('medium');
  document.getElementById('medium-img-edit').src = "../addtask/assets/img/prio-medium.svg";
}

function getValuesFromInputsEdit(id) {
  let title = document.getElementById("input-title-edit");
  let description = document.getElementById("input-description-edit");
  let date = document.getElementById("input-date-edit");
  addRightPrio();
  editTask(title, description, date, id);
}

function editTask(title, description, date, id) {
  currentIdEdit.title = title.value;
  currentIdEdit.description = description.value;
  currentIdEdit.date = date.value;
  currentIdEdit.prio = rightPrio;
  currentIdEdit.contact = assignUser;

  addTasks();
  assignUser = [];
  updateHtml();
  openCard(id);
}

function addingPrioEdit(prio) {
  if (prios.includes(prio)) {
    checkPrioEdit(prio);
  }
  else {
    prios.push(prio);
    checkPrioEdit(prio);
  }
}

function addRightPrio() {
  if (document.getElementById('low-edit').classList.contains('low')) {
    rightPrio = "low";
  }
  else if (document.getElementById('medium-edit').classList.contains('medium')) {
    rightPrio = "medium";
  }
  else if (document.getElementById('urgent-edit').classList.contains('urgent')) {
    rightPrio = "urgent";
  }
  else { rightPrio = "low" }
}

function checkPrioEdit(newprio) {
  for (let i = 0; i < prios.length; i++) {
    let prio = prios[i];
    if (prio != newprio || currentPrio == newprio) {
      takePrioEdit(prio);
    }
    else {
      getPrioEdit(prio);
    }
  }
  currentPrio = newprio;
}

function getPrioEdit(prio) {
  document.getElementById(prio + '-edit').classList.add(prio);
  document.getElementById(`${prio}-img-edit`).src = `../addtask/assets/img/${prio}-white.svg`;
  if (document.getElementById(prio + '-edit') == document.getElementById('urgent-edit')) {
    ifPrioEditSameUrgent();
  }
  else if (document.getElementById(prio + '-edit') == document.getElementById('medium-edit')) {
    ifPrioEditSameMedium();
  }
  else if (document.getElementById(prio + '-edit') == document.getElementById('low-edit')) {
    ifPrioEditSameLow();
  }
}

function ifPrioEditSameUrgent() {
  document.getElementById('low-edit').classList.remove('low');
  document.getElementById('low-img-edit').src = "../addtask/assets/img/prio-low.svg";
  document.getElementById('medium-edit').classList.remove('medium');
  document.getElementById('medium-img-edit').src = "../addtask/assets/img/prio-medium.svg";
}

function ifPrioEditSameMedium() {
  document.getElementById('low-edit').classList.remove('low');
  document.getElementById('low-img-edit').src = "../addtask/assets/img/prio-low.svg";
  document.getElementById('urgent-edit').classList.remove('urgent');
  document.getElementById('urgent-img-edit').src = "../addtask/assets/img/prio-urgent.svg";
}

function ifPrioEditSameLow() {
  document.getElementById('medium-edit').classList.remove('medium');
  document.getElementById('medium-img-edit').src = "../addtask/assets/img/prio-medium.svg";
  document.getElementById('urgent-edit').classList.remove('urgent');
  document.getElementById('urgent-img-edit').src = "../addtask/assets/img/prio-urgent.svg";
}

function takePrioEdit(prio) {
  document.getElementById(prio + '-edit').classList.remove(prio);
  document.getElementById(`${prio}-img-edit`).src = `../addtask/assets/img/prio-${prio}.svg`;
}

function openAssignToListEdit() {
  document.getElementById("assignToContainerEdit").innerHTML =
    openAssignToListEditHtml();
  document.getElementById("AssignToListEdit").classList.remove("d-none");
  document.getElementById("closedAssingToInputEdit").classList.add("border-drop-down");
  renderAddTaskContactsEdit();
}

function closeAssignListEdit() {
  document.getElementById("assignToContainerEdit").innerHTML =
    closeAssignListEditHtml();
}

function renderAddTaskContactsEdit() {
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    document.getElementById("AssignToListEdit").innerHTML +=
      renderContactsEditHtml(contact, i);
    for (let j = 0; j < assignUser.length; j++) {
      if (document.getElementById(`${i}-edit`).innerText == `${assignUser[j]["firstName"]} ${assignUser[j]["surname"]}`) {
        document.getElementById(`${i}-edit`).classList.add('dp-none');
      }
    }
  }
}

function assignContactToEdit(firstName, surname, i) {
  if (document.getElementById(`${i}-input`).checked == false) {
    ifCheckedFalse(firstName, surname, i);
  }

  else if (document.getElementById(`${i}-input`).checked == true) {
    ifCheckedTrue();
  }
}

function ifCheckedFalse(firstName, surname, i) {
  document.getElementById(`${i}-input`).click();
  assignUser.push({
    firstName: firstName,
    surname: surname
  },
  );
}

function ifCheckedTrue(firstName, surname, i) {
  for (let j = 0; j < assignUser.length; j++) {
    if (assignUser[j]["firstName"] == firstName && assignUser[j]["surname"] == surname) {
      document.getElementById(`${i}-input`).click();
      assignUser.splice([j]);
    }
  }
}

function renderTasksEdit() {
  for (let i = 0; i < tasks.length; i++) {
    for (let k = 0; k < assignUser.length; k++) {
      contactColor = assignUser[k]["background"];
      document.getElementById("to do").innerHTML += taskCardHtml(i);
      renderArrays(i);
    }
  }
}