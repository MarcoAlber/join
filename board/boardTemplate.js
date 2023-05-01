function taskCardHtml() {
  return /*html*/ `
      <div draggable="true" ondragstart="startDragging(${currentTask['id']})" class="task-card" id="${currentTask['id']}" onclick="openCard('${currentTask['id']}')">
      <div id="task-card-move-menu-${currentTask['id']}" class='task-card-move-menu d-none'>
            <div class="task-card-move-menu-headline">
                <span>Move Task</span>
            </div>
            <div class="task-card-move-menu-item" id="todo-move-menu-item-${currentTask['id']}" onclick="event.stopPropagation(); moveTaskToStatus('${currentTask['id']}', 'to do')">
                <span>To do</span>
            </div>
            <div class="task-card-move-menu-item" id="inprogress-move-menu-item-${currentTask['id']}" onclick="event.stopPropagation(); moveTaskToStatus('${currentTask['id']}', 'in progress')">
                <span>In progress</span>
            </div>
            <div class="task-card-move-menu-item" id="awaitingfeedback-move-menu-item-${currentTask['id']}" onclick="event.stopPropagation(); moveTaskToStatus('${currentTask['id']}', 'awaiting feedback')">
                <span>Awaiting Feedback</span>
            </div>
            <div class="task-card-move-menu-item" id="done-move-menu-item-${currentTask['id']}" onclick="event.stopPropagation(); moveTaskToStatus('${currentTask['id']}', 'done')">
                <span>Done</span>
            </div>
        </div>
        <div class="task-card-header"> 
            <div class="task-card-category ${currentTask["color"]}">
                <span>${currentTask["category"]}</span>
            </div>
            <div>
                <img id="task-card-move-menu-icon-${currentTask['id']}" class="task-card-move-menu-icon" src="../assets/img/arrow-59-32.png" onclick="event.stopPropagation(); toggleMoveMenu(${currentTask['id']})">
            </div>
        </div>
          <div>
              <p class="task-card-title">${currentTask["title"]}</p>
          </div>
  
          <div>
              <p class="task-card-description" max-="22">${currentTask["description"]}</p>
          </div>
  
          <div class="task-card-subtask" id="subtaskContainer${currentTask['id']}">
          </div>
  
          <div class="space-between">
              <div class="task-card-contact" id="contactContainer${currentTask['id']}">
              </div>
  
              <div class="task-card-prio">
                  <img src="../assets/img/prio-${currentTask["prio"]}.svg" />
              </div>
          </div>
      </div>
      `;
}

function openCardHtml() {
  return /*html*/ `
    <div class="openTaskCardContainer">
        <div class="openedTaskCard" id="openedTaskCard">
            <div class="open-task-headline">
                <h2 class="open-task-card-category ${currentTask["color"]}" id="catgeory${currentTask['id']}">${currentTask["category"]}</h2>
                <img src="../assets/img/close.png" onclick="closeCard()">
            </div>
            <div class="open-task-card-title">
                <h1>${currentTask["title"]}</h1>
            </div>
            <div class="text open-task-card-description">
                <span>${currentTask["description"]}</span>
            </div>
            <div class="text open-task-card-date">
                <p><b>Due Date:</b> ${currentTask["date"]}</p>
            </div>
            <div class="text align-center">
                <p><b>Priority:</b></p> <p class="${currentTask["prio"]} open-task-card-prio">${currentTask["prio"]} <img src="../addtask/assets/img/${currentTask["prio"]}-white.svg"></p>
            </div>
            <div id="subtask">
                <p class="text"><b>Subtask:</b></p>
                <div class="flex-column scrollbar-st" id="openedSubtaskContainer${currentTask['id']}">
                </div>
            </div>
            <div class="text">
                <p><b>Assing To:</b></p>
                <div id="assingToCard${currentTask['id']}" class="scrollbar">
                    
                </div>
            </div>
            <div class="buttonsTaskCard">
                <img onclick="editCardHtml(${currentTask['id']})" class="editBtn" src="../assets/img/editResponsive.png">
                <img src="../assets/img/trash.png" alt="" onclick="deleteTask(${currentTask['id']})" class="editBtnTrash">
            </div>
        </div>
    </div>
        `;
}

function openCardAssingToHtml(i) {
  return `
        <div class="align-center">
            <div>
                <p class="contact contact-height" style="background-color:${contactColor}">${contactChar}</p>
            </div>
            <p class="open-task-card-name">${currentTask["contact"][i]["firstName"]} ${currentTask["contact"][i]["surname"]}</p>
        </div>
        `;
}

function openCardSubtaskToHtml(id, j) {
  return /*html*/ `
    <div class="align-center">
      <div id="${id}">
      </div>
        <p>${currentTask['subTask'][j]}</p>
    </div>
    `;
}

function subtaskHtml(width) {
  return /*html*/ `
    <div class="align-center">
        <div class="progress">
            <div class="the-progress" style="width: ${width}px; background-color: ${currentTask["color"]}"></div>
        </div>
        <p>${currentTask['subTaskFinish']} / ${currentTask['subTask'].length}</p>
    </div>
        `;
}

function assignToHtml() {
  return /*html*/ `
        <div>
            <p class="contact"style="background-color: ${contactColor}">${contactChar}</p>
        </div>
        `;
}

function assignToBigger3Html() {
  return /*html*/`
    <div>
      <p class="contact" style="background-color: ${contactColor}">${contactChar}</p>
    </div>
    `;
}

function editCardHtmlTemplate(id) {
  return /*html*/`
    <div onclick="closeAssignListEdit()" class="editCardContainer" >
    <div onclick="closeCard()" class="closeImgEdit"><img src="../assets/img/close.png"></div>
    <div>
    <form id="desktop" class="adding-todos" onsubmit="event.preventDefault(); getValuesFromInputsEdit(${id})">
      
      <div class="adding-tasks">
        <div class="title">
          <p class="text">Title</p>
          <input class="task-board-input-fields" type="text" placeholder="Enter a Title" required id="input-title-edit"
            maxlength="22" />
        </div>
  
        <div class="description">
          <p class="text">Description</p>
          <textarea class="editDescription" id="input-description-edit" placeholder="Enter a Description" required minlength="3"></textarea>
        </div>
  
        <div class="adding-info">
        <div class="date">
          <p class="text">Due date</p>
          <input class="task-board-input-fields" type="date" id="input-date-edit" />
        </div>     
  
        <p class="text">Prio</p>
        <div class="prios">
          <div class="prio" id="urgent-edit" onclick="addingPrioEdit('urgent')">
            <div class="d-flex">
              <p>Urgent</p>
              <img id="urgent-img-edit" src="../addtask/assets/img/prio-urgent.svg" />
            </div>
          </div>
  
          <div class="prio" id="medium-edit" onclick="addingPrioEdit('medium')">
            <div class="d-flex">
              <p>Medium</p>
              <img id="medium-img-edit" src="../addtask/assets/img/prio-medium.svg" />
            </div>
          </div>
  
          <div class="prio" id="low-edit" onclick="addingPrioEdit('low')">
            <div class="d-flex">
              <p>Low</p>
              <img id="low-img-edit" src="../addtask/assets/img/prio-low.svg" />
            </div>
          </div>
        </div>
  
        <div>
          <p class="text">Assign to</p>
          <div onclick="event.stopPropagation()" id="assignToContainerEdit" class="categoryContainer">
            <div class="category" onclick="openAssignToListEdit()" id="assignToInputEdit">
              
                <input class="categoryInputField" type="text" placeholder="Assign to" readonly />
              
              <div>
                <img src="../assets/img/dropdown.svg" />
              </div>
            </div>
            <div id="assignToListEdit" class="d-none categoryList"></div>
          </div>
        </div>
      </div>
  
        <div class="profileImgEdit" id="profileImgEdit">
        
        </div>
  
        <button type="submit" class="okButton"><span>Ok</span><img src="../assets/img/create.png"></button>
      </div>
    </form>
  </div>
    </div>
      `;
}

function renderContactsEditHtml(contact, i) {
  return ` 
    <div onclick="assignContactToEdit('${contact["firstName"]}','${contact["surname"]}','${i}')" id="${i}-edit" class="assign-to-box" >
      ${contact["firstName"]} ${contact["surname"]}
      <input id="${i}-input" type="checkbox" >
    </div>`;
}

function openAssignToListEditHtml() {
  return /*html*/ `
        <div class="category" onclick="closeAssignListEdit()" id="closedAssingToInputEdit">
        <input
            class="categoryInputField"
            type="text"
            placeholder="Assign to"
          />
        <img class="rotate90deg" src="../assets/img/dropdown.svg">
      </div>
      <div id="AssignToListEdit" class="d-none categoryList">`;
}

function closeAssignListEditHtml() {
  return /*html*/ `
        <div class="category" onclick="openAssignToListEdit()" id="assignToInputEdit">
          <div>
            <input class="categoryInputField" type="text" placeholder="Assign to"/>
          </div>
          <div>
            <img src="../assets/img/dropdown.svg" />
          </div>
        </div>
        <div id="assignToListEdit" class="d-none categoryList"></div>
      </div>
      `;
}

function subtaskFinishHtml(htmlid, id) {
  return /*html*/`
    <input id="${htmlid}" type="checkbox" checked="true" onclick="addSubtaskToDelete('${htmlid}', '${id}')">
  `;
}

function subtaskAddHtml(htmlid, id) {
  return /*html*/ `
    <input id="${htmlid}" type="checkbox" onclick="addSubtaskToFinish('${htmlid}', ${id})">
  `;
}