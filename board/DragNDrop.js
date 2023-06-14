/** emptys all board containers */
async function updateHtml() {
  emptyContainerTodo();
  emptyContainerProgress();
  emptyContainerFeedback();
  emptyContainerDone();
}

/**
 * starts to drag task
 * @param {id} id = id of dragged task
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * drop task to overflying status
 * @param {event} ev = event to ondragover
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * highlights the overflying status
 * @param {container} status = container of overflying status
 */
function highlight(status) {
  document.getElementById(status).classList.add("drag-area-highlight");
}

/**
 * end highlighting the overflying status
 * @param {container} status = container of overflying status
 */
function endHighlight(status) {
  document.getElementById(status).classList.remove("drag-area-highlight");
}

/**
 * moves dragged task to dropped status 
 * @param {id} id = id of dragged task
 * @param {container} status = container of overflying status
 */
function moveTaskToStatus(id, status) {
  startDragging(id);
  moveTo(status);
}

/**
 * moves task to dropped status 
 * @param {container} status = container of overflying status
 */
function moveTo(status) {
  currentTask = tasks.find((t) => t.id == currentDraggedElement)
  currentTask["status"] = status;
  updateHtml();
  addTasks();
  endHighlight(status);
}

/** emptys "to do" container */
function emptyContainerTodo() {
  let statusContainerTodo = tasks.filter((tasks) => tasks["status"] == "to do");
  document.getElementById(`to do`).innerHTML = "";

  for (let i = 0; i < statusContainerTodo.length; i++) {
    currentTask = statusContainerTodo[i];
    document.getElementById("to do").innerHTML += taskCardHtml();
    renderArrays();
  }
}

/** emptys "progress" container */
function emptyContainerProgress() {
  let statusContainerProgress = tasks.filter(
    (tasks) => tasks["status"] == "in progress"
  );
  document.getElementById("in progress").innerHTML = "";

  for (let i = 0; i < statusContainerProgress.length; i++) {
    currentTask = statusContainerProgress[i];
    document.getElementById("in progress").innerHTML += taskCardHtml();
    renderArrays();
  }
}

/** emptys "awaiting feedback" container */
function emptyContainerFeedback() {
  let statusContainerFeedback = tasks.filter(
    (tasks) => tasks["status"] == "awaiting feedback"
  );
  document.getElementById("awaiting feedback").innerHTML = "";

  for (let i = 0; i < statusContainerFeedback.length; i++) {
    currentTask = statusContainerFeedback[i];
    document.getElementById("awaiting feedback").innerHTML += taskCardHtml();
    renderArrays();
  }
}

/** emptys "done" container */
function emptyContainerDone() {
  let statusContainerDone = tasks.filter((tasks) => tasks["status"] == "done");

  document.getElementById("done").innerHTML = "";

  for (let i = 0; i < statusContainerDone.length; i++) {
    currentTask = statusContainerDone[i];
    document.getElementById("done").innerHTML += taskCardHtml();
    renderArrays();
  }
}