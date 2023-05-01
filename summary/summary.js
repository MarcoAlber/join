let tasks = [];
let urgentTasksCount = 0;
let toDoTasksCount = 0;
let doneTasksCount = 0;
let inProgressTasksCount = 0;
let awaitingFeedbackTasksCount = 0;
let user;


async function initSummary() {
    await init();
    tasks = await JSON.parse(await backend.getItem('tasks')) || [];
    setContent();
}


function hoverSrcChange(id, src) {
    document.getElementById(id).setAttribute("src", src);
}


function hoverColorChange(id, color) {
    document.getElementById(id).style.color = color;
}


function linkToBoard() {
    window.location.href = "../board/board.html";
}


function setContent() {
    setWelcomeText();
    setWelcomeScreen();
    countTasks();
    setTaskCounts();
    getNextDate();
}


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


function setTaskCounts() {
    document.getElementById('totalTaskCount').innerHTML = tasks.length;
    document.getElementById('urgentTaskCount').innerHTML = urgentTasksCount;
    document.getElementById('toDoTaskCount').innerHTML = toDoTasksCount;
    document.getElementById('doneTaskCount').innerHTML = doneTasksCount;
    document.getElementById('inProgressTaskCount').innerHTML = inProgressTasksCount;
    document.getElementById('awaitingFeedbackTaskCount').innerHTML = awaitingFeedbackTasksCount;
}


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


function formatDate(date) {
    const dateAsString = new Date(date + 'T00:00:00.000');
    return dateAsString.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}


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


function setWelcomeText() {
    let greeting = getWelcomeText();
    if (localStorage.getItem("guestLogin") == 0) {
        greeting += ','
        setWelcomeUser();
    }
    document.getElementById('textGreeting').innerHTML = greeting;
    document.getElementById('welcomeGreeting').innerHTML = greeting;

}


function setWelcomeUser() {
    user = JSON.parse(localStorage.getItem("user")) || [];
    document.getElementById('textUserName').innerHTML = `${user.firstName} ${user.surname}`;
    document.getElementById('welcomeUserName').innerHTML = `${user.firstName} ${user.surname}`;
}


function setWelcomeScreen() {
    if (checkWelcomeScreenShouldDisplayed()) {
        displayWelcomeScreen()
    }
    else {
        document.getElementById('summary').classList.remove('invisible');
    }
}


function displayWelcomeScreen() {
    let welcomeScreenClassList = document.getElementById('welcomeScreen').classList;
    welcomeScreenClassList.remove('invisible');
    document.getElementById('summary').classList.remove('invisible');
    welcomeScreenClassList.add('fadeOut');
    setTimeout(function () { welcomeScreenClassList.add('invisible') }, 2500);
}


function checkWelcomeScreenShouldDisplayed() {
    if (document.referrer.slice(-5) == 'join/' || document.referrer.slice(-10) == 'index.html') {
        if (window.innerWidth < 900) {
            return true;
        }
    }
    return false;
}