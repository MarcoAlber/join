let tasks = [];
let urgentTasksCount = 0;
let toDoTasksCount = 0;
let doneTasksCount = 0;
let inProgressTasksCount = 0;
let awaitingFeedbackTasksCount = 0;
let user;

/** loads the summary page */
async function initSummary() {
    await init();
    tasks = await JSON.parse(await backend.getItem('tasks')) || [];
    setContent();
}

/**
 * changes the image while hover over field
 * @param {string} id = id name
 * @param {path} src = src of image
 */
function hoverSrcChange(id, src) {
    document.getElementById(id).setAttribute("src", src);
}

/**
 * changes the color of text while hover over field
 * @param {string} id = id name
 * @param {string} color = color of text
 */
function hoverColorChange(id, color) {
    document.getElementById(id).style.color = color;
}

/** links to the board after clicking on field */
function linkToBoard() {
    window.location.href = "../board/board.html";
}

/** sets the content of the summary page */
function setContent() {
    setWelcomeText();
    setWelcomeScreen();
    countTasks();
    setTaskCounts();
    getNextDate();
}

/** counts how many tasks are in the board and on each stage */
function countTasks() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['prio'] == 'urgent') {
            urgentTasksCount++;
        }
        if (tasks[i]['status'] == 'to do') {
            toDoTasksCount++;
        }
        if (tasks[i]['status'] == 'done') {
            doneTasksCount++;
        }
        if (tasks[i]['status'] == 'in progress') {
            inProgressTasksCount++;
        }
        if (tasks[i]['status'] == 'awaiting feedback') {
            awaitingFeedbackTasksCount++;
        }
    }
}

/** project the current taks in the board */
function setTaskCounts() {
    document.getElementById('totalTaskCount').innerHTML = tasks.length;
    document.getElementById('urgentTaskCount').innerHTML = urgentTasksCount;
    document.getElementById('toDoTaskCount').innerHTML = toDoTasksCount;
    document.getElementById('doneTaskCount').innerHTML = doneTasksCount;
    document.getElementById('inProgressTaskCount').innerHTML = inProgressTasksCount;
    document.getElementById('awaitingFeedbackTaskCount').innerHTML = awaitingFeedbackTasksCount;
}

/** checks for next deadline date */
function getNextDate() {
    let dates = [];
    var today = new Date().setHours(0, 0, 0, 0);

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].date != '') {
            if (new Date(tasks[i].date) - today >= 0) {
                dates.push(tasks[i].date);
            }
        }
    }
    setNextDeadline(dates)
}

/**
 * project the next deadline
 * @param {Array} dates = array of all the deadlines
 */
function setNextDeadline(dates) {
    if (dates.length > 0) {
        dates.sort();
        document.getElementById('textUrgentDate').innerHTML = formatDate(dates[0]);
    }
    else {
        document.getElementById('textUrgentDate').innerHTML = 'No upcoming deadline';
        document.getElementById('textUrgentDescription').innerHTML = '';
    }
}

/**
 * formats the deadline date
 * @param {string} date = next deadline date
 * @returns date in different writing format
 */
function formatDate(date) {
    const dateAsString = new Date(date + 'T00:00:00.000');
    return dateAsString.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * checks which time it is and return the welcome text
 * @returns the greeting welcome text
 */
function getWelcomeText() {
    let date = new Date();
    let hour = date.getHours();
    let greeting;

    switch (true) {
        case (hour < 12):
            greeting = 'Good morning';
            break;
        case ((hour >= 12) && (hour < 18)):
            greeting = 'Good afternoon';
            break;
        case (hour >= 18):
            greeting = 'Good evening';
            break;
    }
    return greeting;
}

/** project the welcome text to current user */
function setWelcomeText() {
    let greeting = getWelcomeText();
    if (localStorage.getItem("guestLogin") == 0) {
        greeting += ','
        setWelcomeUser();
    }
    document.getElementById('textGreeting').innerHTML = greeting;
    document.getElementById('welcomeGreeting').innerHTML = greeting;
}

/** checks for current user name */
function setWelcomeUser() {
    user = JSON.parse(localStorage.getItem("user")) || [];
    document.getElementById('textUserName').innerHTML = `${user.firstName} ${user.surname}`;
    document.getElementById('welcomeUserName').innerHTML = `${user.firstName} ${user.surname}`;
}

/** enable welcome screen */
function setWelcomeScreen() {
    if (checkWelcomeScreenShouldDisplayed()) {
        displayWelcomeScreen()
    }
    else {
        document.getElementById('summary').classList.remove('invisible');
    }
}

/** shows welcome screen at small devices */
function displayWelcomeScreen() {
    let welcomeScreenClassList = document.getElementById('welcomeScreen').classList;
    welcomeScreenClassList.remove('invisible');
    document.getElementById('summary').classList.remove('invisible');
    welcomeScreenClassList.add('fadeOut');
    setTimeout(function () { welcomeScreenClassList.add('invisible') }, 2500);
}

/**
 * checks if welcome screen should be seen or not
 * @returns true or false if innerWidth smaller than 900px
 */
function checkWelcomeScreenShouldDisplayed() {
    if (document.referrer.slice(-5) == 'join/' || document.referrer.slice(-10) == 'index.html') {
        if (window.innerWidth < 900) {
            return true;
        }
    }
    return false;
}