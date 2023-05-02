async function updateHtml() {
  emptyContainerTodo();
  emptyContainerProgress();
  emptyContainerFeedback();
  emptyContainerDone();
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function highlight(status) {
  document.getElementById(status).classList.add("drag-area-highlight");
}

function endHighlight(status) {
  document.getElementById(status).classList.remove("drag-area-highlight");
}

function moveTaskToStatus(id, status) {
  startDragging(id);
  moveTo(status);
}

function moveTo(status) {
  currentTask = tasks.find((t) => t.id == currentDraggedElement)
  currentTask["status"] = status;
  updateHtml();
  addTasks();
  endHighlight(status);
}

function emptyContainerTodo() {
  let statusContainerTodo = tasks.filter((tasks) => tasks["status"] == "to do");
  document.getElementById(`to do`).innerHTML = "";

  for (let i = 0; i < statusContainerTodo.length; i++) {
    currentTask = statusContainerTodo[i];
    document.getElementById("to do").innerHTML += taskCardHtml();
    checkArrays();
  }
}

function emptyContainerProgress() {
  let statusContainerProgress = tasks.filter(
    (tasks) => tasks["status"] == "in progress"
  );
  document.getElementById("in progress").innerHTML = "";

  for (let i = 0; i < statusContainerProgress.length; i++) {
    currentTask = statusContainerProgress[i];
    document.getElementById("in progress").innerHTML += taskCardHtml();
    checkArrays();
  }
}

function emptyContainerFeedback() {
  let statusContainerFeedback = tasks.filter(
    (tasks) => tasks["status"] == "awaiting feedback"
  );
  document.getElementById("awaiting feedback").innerHTML = "";

  for (let i = 0; i < statusContainerFeedback.length; i++) {
    currentTask = statusContainerFeedback[i];
    document.getElementById("awaiting feedback").innerHTML += taskCardHtml();
    checkArrays();
  }
}

function emptyContainerDone() {
  let statusContainerDone = tasks.filter((tasks) => tasks["status"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let i = 0; i < statusContainerDone.length; i++) {
    currentTask = statusContainerDone[i];
    document.getElementById("done").innerHTML += taskCardHtml();
    checkArrays();
  }
}

function checkArrays() {
  checkAssignTo();
  checkSubtask();
}