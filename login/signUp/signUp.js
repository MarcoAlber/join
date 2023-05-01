async function signUp() {
    let firstName = document.getElementById('signUpFirstNameInput').value;
    let surname = document.getElementById('signUpSurnameInput').value;
    let mail = document.getElementById('signUpMailInput').value;
    let password = document.getElementById('signUpPasswordInput').value;
    let checkIfMailExist = await contacts.find(c => c.mail == mail);

    if (checkIfMailExist) {
        document.getElementById('emailIsAlreadyExistingSignUp').classList.remove('dp-none');
    }
    else {
        ifSignUpCorrect(firstName, surname, mail, password);
    }
}

function ifSignUpCorrect(firstName, surname, mail, password) {
    contacts.push({
        "firstName": firstName.charAt(0).toUpperCase() + firstName.slice(1),
        "surname": surname.charAt(0).toUpperCase() + surname.slice(1),
        "mail": mail,
        "background": randomBgColor(),
        "phone": "",
        "password": password
    });
    save();
    firstName = document.getElementById('signUpFirstNameInput').value = '';
    surname = document.getElementById('signUpSurnameInput').value = '';
    mail = document.getElementById('signUpMailInput').value = '';
    password = document.getElementById('signUpPasswordInput').value = '';
    goBackToLogin();
}

function goBackToLogin() {
    document.getElementById('signUpContainerContent').classList.add("dp-none");
    document.getElementById('loginBox').classList.remove("dp-none");
    document.getElementById('signUpButton').classList.remove("dp-none");
    document.getElementById('signUpButton').classList.remove("fadeIn");
    document.getElementById("loginEmail").focus();
}

function goBackToLoginOfForgot() {
    document.getElementById('forgotContainerContent').classList.add("dp-none");
    document.getElementById('loginBox').classList.remove("dp-none");
    document.getElementById('signUpButton').classList.remove("dp-none");
    document.getElementById('signUpButton').classList.remove("fadeIn");
    document.getElementById("loginEmail").focus();
}

function togglePasswordImageSignUp() {
    if (document.getElementById('signUpPasswordInput').value == '') {
        document.getElementById('signUpPasswordImage').setAttribute('src', './assets/img/lock.png');
        document.getElementById('signUpPasswordImage').classList.remove('cursorPointer');
        document.getElementById('signUpPasswordImage').classList.add('pointerEventsNone');
    }
    else {
        document.getElementById('signUpPasswordImage').setAttribute('src', './assets/img/hidePassword.png');
        document.getElementById('signUpPasswordImage').classList.add('cursorPointer');
        document.getElementById('signUpPasswordImage').classList.remove('pointerEventsNone');
    }
}

function togglePasswordVisibilitySignUp() {
    if (document.getElementById('signUpPasswordInput').getAttribute('type') == 'password') {
        document.getElementById('signUpPasswordInput').setAttribute('type', 'text');
        document.getElementById('signUpPasswordImage').setAttribute('src', './assets/img/showPassword.png');
    } else {
        document.getElementById('signUpPasswordInput').setAttribute('type', 'password');
        document.getElementById('signUpPasswordImage').setAttribute('src', './assets/img/hidePassword.png');
    }
}

async function forgotPassword(event) {
    let email = document.getElementById('forgotMailInput');
    let forgotUser = await contacts.find(c => c.mail == email.value);
    if (forgotUser) {
        emailSent();
        setForgotUser(forgotUser);
        document.getElementById('formForgot').action = "https://gruppenarbeit-494-join.developerakademie.net/Join/send_mail/send_mail.php";
    }
    else {
        event.preventDefault();
        document.getElementById('emailIsNotExisting').classList.remove("dp-none");
    }
}

function setForgotUser(forgotUser) {
    let forgotUserAsText = JSON.stringify(forgotUser);
    localStorage.setItem("forgotUser", forgotUserAsText);
}

function emailSent() {
    document.getElementById('eMailHasBeenSent').classList.remove('dp-none');
}