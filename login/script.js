/** sets the website before the login */
async function initIndex() {
    await includeHTMLLogin();
    setURL('https://marco-alber.developerakademie.net/join/smallest_backend_ever');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contactsASText')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

/** sets the website after the login */
async function init() {
    await includeHTML();
    setURL('https://marco-alber.developerakademie.net/join/smallest_backend_ever');
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contactsASText')) || [];
    tasks = await JSON.parse(backend.getItem('tasks')) || [];
    subTasksFinish = await JSON.parse(backend.getItem('subTasks')) || [];
}

/** loads database from server before the login */
async function includeHTMLLogin() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/** loads database from server after the login */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    changeProfileImage();
    changeFocusNav();
}

/** checks for login user profile picture settings */
function changeProfileImage() {
    let profileImage = document.getElementById('profileImage');
    let userImg = JSON.parse(localStorage.getItem("user")) || [];
    profileImage.innerHTML = `${userImg["firstName"].charAt(0).toUpperCase()}${userImg["surname"].charAt(0).toUpperCase()}`;
    document.getElementById('profileImage').style.background = `${userImg["background"]}`;
}

/** changes background of current page */
function changeFocusNav() {
    if (window.location.href.includes("contacts.html")) {
        document.getElementById('contactsNav').style.background = "#091931";
    }
    else if (window.location.href.includes("summary.html")) {
        document.getElementById('summaryNav').style.background = "#091931";
    }
    else if (window.location.href.includes("legal.html")) {
        document.getElementById('legalNav').style.background = "#091931";
    }
    else if (window.location.href.includes("add_task.html")) {
        document.getElementById('addTaskNav').style.background = "#091931";
    }
    else if (window.location.href.includes("board.html")) {
        document.getElementById('boardNav').style.background = "#091931";
    }
}

/** changes logout options if screen width is smaller than 900px */
function openLogoutOption() {
    if (window.matchMedia("(max-width: 900px)").matches) {
        document.getElementById('legalButton').classList.remove('dp-none');
        document.getElementById('helpButton').classList.remove('dp-none');
    }
    if (document.getElementById('logoutContainer').classList.contains('dp-none')) {
        document.getElementById('logoutContainer').classList.remove('dp-none');
    }
    else {
        document.getElementById('logoutContainer').classList.add('dp-none');
    }
}

/** logouts user */
function logOut() {
    localStorage.removeItem("user");
    window.location = '../index.html'
}