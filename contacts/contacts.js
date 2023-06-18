let contacts = [];
let letters = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
let guestUser =
{
    firstName: 'Ghost',
    surname: 'Guest',
    mail: 'test@test.test',
    background: 'rgb(133,150,22)',
    phone: 0,
    password: 'test'
};

/** loads contacts of database */
load();

/** loads the database and display the contacts */
async function renderContacts() {
    await init();
    loadContacts();
}

/** loads the contacts */
function loadContacts() {
    let contactsAdressContainer = document.getElementById('contactsAdressContainer');
    contactsAdressContainer.innerHTML = '';
    renderContactHeadline();
    checkIfLetterExist(contactsAdressContainer);
}

/**
 * checks if first letter exists in contact list and display existing letters
 * @param {container} contactsAdressContainer = container which project all contacts
 */
function checkIfLetterExist(contactsAdressContainer) {
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        for (let j = 0; j < contacts.length; j++) {
            if (letter == contacts[j]["firstName"].charAt(0).toLowerCase()) {
                if (!document.getElementById(`adressSection${i}`)) {
                    contactsAdressContainer.innerHTML += renderLettersTemplate(letter, i);
                }
                document.getElementById(`adressSection${i}`).innerHTML += renderContactsTemplate(j);
                changeContactsImg(j);
            }
        }
    }
}

/**
 * shows contact details after clicking on name
 * @param {id} j = id of contact
 */
async function showContactDetails(j) {
    loadContacts();
    let contactDetails = document.getElementById('contactDetails');
    contactDetails.innerHTML = showContactDetailsTemplate(j);
    document.getElementById(`adressField${j}`).style.background = "#2A3647";
    document.getElementById(`adressField${j}`).style.color = "#FFFFFF";
    changeContactImg(j);
    showContactDetailsIfResponsive();
}

/**
 * opens the edit contact container of current contact
 * @param {id} j = id of contact
 */
function openEditContactContainer(j) {
    document.getElementById('emailIsAlreadyExistingEditContact').classList.add('dp-none');
    document.getElementById('editContactFirstNameInput').value = `${contacts[j]["firstName"]}`;
    document.getElementById('editContactSurnameInput').value = `${contacts[j]["surname"]}`;
    document.getElementById('editContactMailInput').value = `${contacts[j]["mail"]}`;
    document.getElementById('editContactPhoneInput').value = `${contacts[j]["phone"]}`;
    changeEditImg(j);
    document.getElementById('editContactContainer').classList.remove('moveEditContainerOutMedia');
    document.getElementById('editContactContainer').classList.remove('dp-none');
    document.getElementById('bg-contacts').classList.remove('dp-none');
}

/** opens the new contact container */
function openNewContactContainer() {
    let firstName = document.getElementById('addContactFirstNameInput');
    document.getElementById('emailIsAlreadyExistingAddContact').classList.add('dp-none');
    firstName.value = '';
    document.getElementById('addContactSurnameInput').value = '';
    document.getElementById('addContactMailInput').value = '';
    document.getElementById('addContactPhoneInput').value = '';
    document.getElementById('addContactContainer').classList.remove('moveContainerOutMedia');
    document.getElementById('addContactContainer').classList.remove('dp-none');
    document.getElementById('bg-contacts').classList.remove('dp-none');

    firstName.select();
}

/** adds new contact if mail is not already existing */
async function addContact() {
    let firstName = document.getElementById('addContactFirstNameInput').value;
    let surname = document.getElementById('addContactSurnameInput').value;
    let mail = document.getElementById('addContactMailInput').value;
    let phone = document.getElementById('addContactPhoneInput').value;
    let checkIfMailExist = await contacts.find(c => c.mail == mail);

    if (checkIfMailExist) {
        document.getElementById('emailIsAlreadyExistingAddContact').classList.remove('dp-none');
    }
    else {
        await ifAddContactCorrect(firstName, surname, mail, phone);
    }
}

/**
 * adds user data to new contact
 * @param {string} firstName = first name of contact
 * @param {string} surname = surname of contact
 * @param {string} mail = mail adress of contact
 * @param {number} phone = phone number of contact
 */
async function ifAddContactCorrect(firstName, surname, mail, phone) {
    contacts.push({
        "firstName": firstName.charAt(0).toUpperCase() + firstName.slice(1),
        "surname": surname.charAt(0).toUpperCase() + surname.slice(1),
        "mail": mail,
        "background": randomBgColor(),
        "phone": phone,
        "password": firstName.toLowerCase() + surname.charAt(0).toUpperCase()
    });
    contactCreatedOrDeletedAnimation("Created");
    closeNewContactContainer();
    await save();
    await renderContacts();
}

/**
 * saves the edited contact details if mail adress dont match another mail adress
 * @param {id} j = id of contact
 */
async function saveEdit(j) {
    let firstName = document.getElementById('editContactFirstNameInput').value;
    let surname = document.getElementById('editContactSurnameInput').value;
    let mail = document.getElementById('editContactMailInput').value;
    let phone = document.getElementById('editContactPhoneInput').value;
    let checkIfMailExist = await contacts.find(c => c.mail == mail);
    if (checkIfMailExist && checkIfMailExist.mail == contacts[j]["mail"]) {
        await ifMailDoesNotExist(firstName, surname, mail, phone, j);
    }
    else if (checkIfMailExist && checkIfMailExist.mail) {
        document.getElementById('emailIsAlreadyExistingEditContact').classList.remove('dp-none');
    }
    else {
        await ifMailDoesNotExist(firstName, surname, mail, phone, j);
    }
}

/**
 * saves edit contact
 * @param {string} firstName = first name of contact
 * @param {string} surname = surname of contact
 * @param {string} mail = mail adress of contact
 * @param {number} phone = phone number of contact
 * @param {id} j = id of contact
 */
async function ifMailDoesNotExist(firstName, surname, mail, phone, j) {
    contacts[j]["firstName"] = firstName;
    contacts[j]["surname"] = surname;
    contacts[j]["mail"] = mail;
    contacts[j]["phone"] = phone;

    closeEditSaveDeleteContactContainer();
    await save();
    await renderContacts();
    showContactDetails(j);
}

/**
 * deletes contact of contacts
 * @param {id} j = id of contact
 */
async function deleteContact(j) {
    if (contacts[j]["mail"] == user["mail"]) {
        changeUserToGuestUser();
    }
    await checkIfTaskIncludeContact(j);
    contacts.splice(j, 1);
    contactCreatedOrDeletedAnimation("Deleted");
    closeEditSaveDeleteContactContainer();
    await save();
    await renderContacts();
    renderContactHeadline();
    closeContactDetails();
}

/** if user deleted his own contact, current user changes to guest user */
function changeUserToGuestUser() {
    user = {
        firstName: 'Ghost',
        surname: 'Guest',
        mail: 'test@test.test',
        background: 'rgb(133,150,22)',
        phone: 0,
        password: 'test'
    };
    let userAsText = JSON.stringify(user);
    localStorage.setItem("user", userAsText);
}

/**
 * checks if task included deleted contact and deletes contact out of task
 * @param {id} j = id of contact
 */
async function checkIfTaskIncludeContact(j) {
    for (let t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        for (let k = 0; k < task["contact"].length; k++) {
            let contact = task["contact"][k];
            if (contact["firstName"] == contacts[j]["firstName"] && contact["surname"] == contacts[j]["surname"]) {
                task["contact"].splice(k, 1);
            }
        }
        await addTasks();
    }
}

/** close new contact container */
function closeNewContactContainer() {
    document.getElementById('addContactContainer').classList.add('moveContainerOutMedia');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

/** close edit contact container */
function closeEditContactContainer() {
    document.getElementById('editContactContainer').classList.add('moveEditContainerOutMedia');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

/** close edit contact container afer save or delete contact */
function closeEditSaveDeleteContactContainer() {
    document.getElementById('editContactContainer').classList.add('dp-none');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

/** open add task container */
function openAddTaskContainer() {
    if (matchMedia('only screen and (max-width: 900px)').matches) {
        document.getElementById('closeAddTaskContainer').classList.remove('bg');
        document.getElementById('header').classList.add('dp-none');
    }
    subTask = [];
    document.getElementById("newSubtask").innerHTML = '';
    ifPrioSet();
    document.getElementById('taskBoard').classList.remove('d-none');
    document.getElementById('addTaskContainerContacts').classList.remove('dp-none');
    document.getElementById('taskBoard').classList.remove('moveContainerOutMedia');
}

/** checks if prio is set in add task container */
function ifPrioSet() {
    if (document.getElementById('urgent').classList.contains("urgent")) {
        setPrio("urgent");
    }
    else if (document.getElementById('medium').classList.contains("medium")) {
        setPrio("medium");
    }
    else if (document.getElementById('low').classList.contains("low")) {
        setPrio("low");
    }
    prios = [];
}

/**
 * sets right priority of "urgent", "medium" or "low" 
 * @param {string} prio = string of "urgent", "medium" or "low" 
 */
function setPrio(prio) {
    document.getElementById(`${prio}`).classList.remove(`${prio}`);
    document.getElementById(`${prio}-img`).src = `../addtask/assets/img/prio-${prio}.svg`;
}

/** close add task container */
function closeAddTaskContainer() {
    if (matchMedia('only screen and (max-width: 900px)').matches) {
        document.getElementById('header').classList.remove('dp-none');
        document.getElementById('addTaskContainerContacts').classList.add('dp-none');
        document.getElementById('closeAddTaskContainer').classList.add('bg');
    }
    else {
        document.getElementById('taskBoard').classList.add('moveContainerOutMedia');
        setTimeout(function () {
            document.getElementById('addTaskContainerContacts').classList.add('dp-none');
            document.getElementById('taskBoard').classList.remove('moveContainerOutMedia');
        }, 400);
    }
}

/**
 * changes the contact image of the contact in the detail contact page
 * @param {id} j = id of contact 
 */
function changeContactImg(j) {
    let image = document.getElementById('adressDetailsImg');
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById('adressDetailsImg').style.background = `${contacts[j]["background"]}`;
}

/**
 * changes the contact image of the contact in the adress section
 * @param {id} j = id of contact 
 */
function changeContactsImg(j) {
    let image = document.getElementById(`adressImg${j}`);
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById(`adressImg${j}`).style.background = `${contacts[j]["background"]}`;
}

/**
 * changes the contact image of the contact in the edit contact container
 * @param {id} j = id of contact 
 */
function changeEditImg(j) {
    let image = document.getElementById('addContactProfileImg');
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById('addContactProfileImg').style.background = `${contacts[j]["background"]}`;
}

/** display the contact headline */
function renderContactHeadline() {
    let headline = document.getElementById('contactDetails');
    headline.innerHTML = headlineTemplate();
}

/**
 * project the contact created or deleted animation
 * @param {string} action = string of "Created" or "Deleted"
 */
function contactCreatedOrDeletedAnimation(action) {
    document.getElementById(`contact${action}`).classList.remove('dp-none');
    setTimeout(function () {
        document.getElementById(`contact${action}`).classList.add('contactCreatedButton');
    }, 2000);
    setTimeout(function () {
        document.getElementById(`contact${action}`).classList.add('dp-none')
        document.getElementById(`contact${action}`).classList.remove('contactCreatedButton');
    }, 2300);
}

/** shows contact details on fullscreen if screen width is 1000px or smaller */
function showContactDetailsIfResponsive() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById('contactsAdressContainer').classList.add("dp-none");
        document.getElementById('contactsNewContact').classList.add("dp-none");
        document.getElementById('contactDetails').style.display = "flex";
    }
}


/** close contact details if screen width is 1000px or smaller */
function closeContactDetails() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById('contactsAdressContainer').classList.remove("dp-none");
        document.getElementById('contactsNewContact').classList.remove("dp-none");
        document.getElementById('contactDetails').style.display = "none";
    }
}

/**
 * creates and return a random background color for the contact profile picture
 * @returns random background color
 */
function randomBgColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
}

/** saves contacts into database */
async function save() {
    let contactsASText = JSON.stringify(contacts);
    await backend.setItem('contactsASText', contactsASText);
}

/** loads contacts of database */
async function load() {
    let contactsASText = await backend.getItem('contactsASText');

    if (contactsASText) {
        contacts = JSON.parse(contactsASText);
    }
}