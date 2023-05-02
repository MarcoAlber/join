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

load();

async function renderContacts() {
    await init();
    loadContacts();
}

function loadContacts() {
    let contactsAdressContainer = document.getElementById('contactsAdressContainer');
    contactsAdressContainer.innerHTML = '';
    renderContactHeadline();
    checkIfLetterExist(contactsAdressContainer);
}

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

async function showContactDetails(j) {
    loadContacts();
    let contactDetails = document.getElementById('contactDetails');
    contactDetails.innerHTML = showContactDetailsTemplate(j);
    document.getElementById(`adressField${j}`).style.background = "#2A3647";
    document.getElementById(`adressField${j}`).style.color = "#FFFFFF";
    changeContactImg(j);
    showContactDetailsIfResponsive();
}

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

async function ifAddContactCorrect(firstName, surname, mail, phone) {
    contacts.push({
        "firstName": firstName.charAt(0).toUpperCase() + firstName.slice(1),
        "surname": surname.charAt(0).toUpperCase() + surname.slice(1),
        "mail": mail,
        "background": randomBgColor(),
        "phone": phone,
        "password": firstName.toLowerCase() + surname.charAt(0).toUpperCase()
    });
    contactCreatedAnimation();
    closeNewContactContainer();
    await save();
    await renderContacts();
}

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

async function deleteContact(j) {
    if (contacts[j]["mail"] == user["mail"]) {
        changeUserToGuestUser();
    }
    await checkIfTaskIncludeContact(j);
    contacts.splice(j, 1);
    contactDeletedAnimation();
    closeEditSaveDeleteContactContainer();
    await save();
    await renderContacts();
    renderContactHeadline();
    closeContactDetails();
}

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

function closeNewContactContainer() {
    document.getElementById('addContactContainer').classList.add('moveContainerOutMedia');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

function closeEditContactContainer() {
    document.getElementById('editContactContainer').classList.add('moveEditContainerOutMedia');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

function closeEditSaveDeleteContactContainer() {
    document.getElementById('editContactContainer').classList.add('dp-none');
    document.getElementById('bg-contacts').classList.add('dp-none');
}

function openAddTaskContainer(status) {
    currentStatusTemp = status;
    subTask = [];
    document.getElementById("newSubtask").innerHTML = '';
    ifPrioSet();
    document.getElementById('taskBoard').classList.remove('d-none');
    document.getElementById('addTaskContainerContacts').classList.remove('dp-none');
    document.getElementById('taskBoard').classList.remove('moveContainerOutMedia');
}

function ifPrioSet() {
    if (document.getElementById('urgent').classList.contains("urgent")) {
        document.getElementById('urgent').classList.remove("urgent");
        document.getElementById('urgent-img').src = `../addtask/assets/img/prio-urgent.svg`;
    }
    else if (document.getElementById('medium').classList.contains("medium")) {
        document.getElementById('medium').classList.remove("medium");
        document.getElementById('medium-img').src = `../addtask/assets/img/prio-medium.svg`;
    }
    else if (document.getElementById('low').classList.contains("low")) {
        document.getElementById('low').classList.remove("low");
        document.getElementById('low-img').src = `../addtask/assets/img/prio-low.svg`;
    }
    prios = [];
}

function closeAddTaskContainer() {
    document.getElementById('taskBoard').classList.add('moveContainerOutMedia');
    setTimeout(function () {
        document.getElementById('addTaskContainerContacts').classList.add('dp-none');
        document.getElementById('taskBoard').classList.remove('moveContainerOutMedia');
    }, 400);
}

function changeContactImg(j) {
    let image = document.getElementById('adressDetailsImg');
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById('adressDetailsImg').style.background = `${contacts[j]["background"]}`;
}

function changeContactsImg(j) {
    let image = document.getElementById(`adressImg${j}`);
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById(`adressImg${j}`).style.background = `${contacts[j]["background"]}`;
}

function changeEditImg(j) {
    let image = document.getElementById('addContactProfileImg');
    image.innerHTML = `${contacts[j]["firstName"].charAt(0).toUpperCase()}${contacts[j]["surname"].charAt(0).toUpperCase()}`;
    document.getElementById('addContactProfileImg').style.background = `${contacts[j]["background"]}`;
}

function renderContactHeadline() {
    let headline = document.getElementById('contactDetails');
    headline.innerHTML = headlineTemplate();
}

function contactCreatedAnimation() {
    document.getElementById('contactCreated').classList.remove('dp-none');
    setTimeout(function () {
        document.getElementById('contactCreated').classList.add('contactCreatedButton');
    }, 2000);
}

function contactDeletedAnimation() {
    document.getElementById('contactDeleted').classList.remove('dp-none');
    setTimeout(function () {
        document.getElementById('contactDeleted').classList.add('contactCreatedButton');
    }, 2000);
}

function showContactDetailsIfResponsive() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById('contactsAdressContainer').classList.add("dp-none");
        document.getElementById('contactsNewContact').classList.add("dp-none");
        document.getElementById('contactDetails').style.display = "flex";
    }
}

function closeContactDetails() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById('contactsAdressContainer').classList.remove("dp-none");
        document.getElementById('contactsNewContact').classList.remove("dp-none");
        document.getElementById('contactDetails').style.display = "none";
    }
}

function randomBgColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
}

async function save() {
    let contactsASText = JSON.stringify(contacts);
    await backend.setItem('contactsASText', contactsASText);
}

async function load() {
    let contactsASText = await backend.getItem('contactsASText');

    if (contactsASText) {
        contacts = JSON.parse(contactsASText);
    }
}