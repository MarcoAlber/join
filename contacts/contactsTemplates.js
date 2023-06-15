function renderLettersTemplate(letter, i) {
    return `<div id="adressSection${i}" class="adressSection">
    <span id="lettersAdress${i}" class="lettersAdress">${letter.toUpperCase()}</span>
    <div class="lineAdress"></div>`
}

function renderContactsTemplate(j) {
    return `
    <div class="adressField" id="adressField${j}" onclick="showContactDetails(${j})">
        <div class="adressImgField"><div id="adressImg${j}" class="adressImg"></div></div>
        <div class="adressNameContainer">
            <span class="adressName">${contacts[j]["firstName"]} ${contacts[j]["surname"]}</span>
            <span class="adressMail">${contacts[j]["mail"]}</span>
        </div>
    </div>`
}

function showContactDetailsTemplate(j) {
    return `
    <div class="contactsHeadlineContainer">
    <span class="kanbanResponsive">Kanban Project Managment Tool</span>
        <span class="contactsHeadline">Contacts</span>
        <div class="contactsTextBreakLine"></div>
        <span class="contactsBetterWithATeam">Better with a team</span>
        <div onclick="closeContactDetails()"class="arrowLeft"><img src="../assets/img/arrow_left.png"></div>
    </div>
    <div class="adressDetails">
        <div class="adressImgPlusName">
            <div><div id="adressDetailsImg" class="adressDetailsImg"></div></div>
            <div class="adressNamePlusAddTask">
                <span class="nameDetailAdress">${contacts[j]["firstName"]} ${contacts[j]["surname"]}</span>
                <div onclick="openAddTaskContainer()" class="adressAddTaskContainer">
                    <div><img src="../assets/img/addPlus.png"></div>
                    <span>Add Task</span>
                </div>
            </div>
        </div>
        <div class="contactInformationContainer">
            <span class="contactInfoHeadline">Contact Information</span>
            <div onclick="openEditContactContainer(${j})" class="editContactContainer">
                <div><img src="../assets/img/pencilContacts.png"></div>
                <span>Edit Contact</span>
            </div>
        </div>
        <div class="emailPlusPhoneContainer">
            <div class="emailContainer">
                <span class="emailHeadline">Email</span>
                <span class="emailAdress"><a href="mailto:${contacts[j]["mail"]}">${contacts[j]["mail"]}</a></span>
            </div>
            <div class="phoneContainer">
                <span class="phoneHeadline">Phone</span>
                <span class="phoneNumber"><a href="tel: ${contacts[j]["phone"]}">${contacts[j]["phone"]}</a></span>
            </div>
        </div>
    </div>
    
    <div  id="editContactContainer" class="editContactForm editContactAround dp-none">
        <div class="addContactLeftContainer">
            <div class="logoAddContact"><img src="../assets/img/logo.png"></div>
            <span class="addContactHeadline">Edit contact</span>
            <div class="addContactLine"></div>
        </div>
        <div>
            <div class="addContactProfileImg">
                <div id="addContactProfileImg"></div>
            </div>
            <div onclick="closeEditContactContainer()" class="closeAddContact"><img src="../assets/img/close.png"></div>
            <form onsubmit="saveEdit(${j}); return false">
                <div class="addContactInputContainer">
                    <input id="editContactFirstNameInput" placeholder="First name" type="text" required maxlength="10" onkeydown="return /[a-z]/i.test(event.key)"
                        style="background-image: url(../assets/img/nameInput.png); background-repeat: no-repeat; background-position: calc(100% - 19px);">
                    <input id="editContactSurnameInput" placeholder="Surname" type="text" required maxlength="12" onkeydown="return /[a-z]/i.test(event.key)"
                        style="background-image: url(../assets/img/nameInput.png); background-repeat: no-repeat; background-position: calc(100% - 19px);">
                    <input id="editContactMailInput" placeholder="Email" type="email" required maxlength="40"
                        style="background-image: url(../assets/img/emailInput.png); background-repeat: no-repeat; background-position: calc(100% - 19px);">
                    <input id="editContactPhoneInput" placeholder="Phone" onkeydown="return event.keyCode !== 69"
                            type="number" required onKeyPress="if(this.value.length==20) return false;" 
                        style="background-image: url(../assets/img/phoneInput.png); background-repeat: no-repeat; background-position: calc(100% - 19px);">
                        <span class="error dp-none" id="emailIsAlreadyExistingEditContact">Email is already existing</span>
                </div>
                <div onclick="deleteContact(${j})" title="Delete contact" class="trashIcon"><img src="../assets/img/trash.png"></div>
                <div class="saveButtonContainer">
                    <button class="saveButton">
                        <span class="saveText">Save</span>
                </div>
                </button>
            </form>
        </div>
    </div>
    `
}

function headlineTemplate() {
    return `<div class="contactsHeadlineContainer">
                <span class="contactsHeadline">Contacts</span>
                <div class="contactsTextBreakLine"></div>
                <span class="contactsBetterWithATeam">Better with a team</span>
            </div>`
}