let user;
let rememberedUser;

async function initLogin() {
    await initIndex();
    loadRememberedUser();
}

function loadRememberedUser() {
    if ((localStorage.getItem("rememberUser") || 0) == 1) {
        rememberedUser = JSON.parse(localStorage.getItem("rememberedUser")) || []
        document.getElementById('loginEmail').value = rememberedUser.mail;
        document.getElementById('loginPassword').value = rememberedUser.password;
        document.getElementById("loginRememberCheckbox").checked = true;
        document.getElementById('loginPasswordImage').setAttribute('src', './assets/img/hidePassword.png');
        document.getElementById('loginPasswordImage').classList.add('cursorPointer');
    }
}

function emailInputChanged() {
    if (!document.getElementById('loginEmail').classList.contains('hidden')) {
        document.getElementById('wrongEmail').classList.add("hidden");
    }
}

function pwInputChanged() {
    if (!document.getElementById('loginPassword').classList.contains('hidden')) {
        document.getElementById('wrongPassword').classList.add("hidden");
    }
    togglePasswordImage();
}

function togglePasswordImage() {
    if (document.getElementById('loginPassword').value == '') {
        document.getElementById('loginPasswordImage').setAttribute('src', './assets/img/lock.png');
        document.getElementById('loginPasswordImage').classList.add('pointerEventsNone');
        document.getElementById('loginPasswordImage').classList.remove('cursorPointer');
    }
    else {
        document.getElementById('loginPasswordImage').setAttribute('onclick', 'togglePasswordVisibility();')
        document.getElementById('loginPasswordImage').setAttribute('src', './assets/img/hidePassword.png');
        document.getElementById('loginPasswordImage').classList.remove('pointerEventsNone');
        document.getElementById('loginPasswordImage').classList.add('cursorPointer');
    }
}

function togglePasswordVisibility() {
    if (document.getElementById('loginPassword').getAttribute('type') == 'password') {
        document.getElementById('loginPassword').setAttribute('type', 'text');
        document.getElementById('loginPasswordImage').setAttribute('src', './assets/img/showPassword.png');
    } else {
        document.getElementById('loginPassword').setAttribute('type', 'password');
        document.getElementById('loginPasswordImage').setAttribute('src', './assets/img/hidePassword.png');
    }
}

function noUserPassword() {
    user = {
        background: user.background,
        firstName: user.firstName,
        mail: user.mail,
        password: "",
        phone: user.phone,
        surname: user.surname
    };
}

async function login() {
    user = await contacts.find((contact) => contact.mail == document.getElementById('loginEmail').value)
    if (user) {
        if (user.password == document.getElementById('loginPassword').value) {
            noUserPassword();
            setUser(user);
            setRememberUser();
            localStorage.setItem("guestLogin", 0);
            window.location.href = './summary/summary.html';
        }
        else {
            document.getElementById('wrongPassword').classList.remove("hidden");
        }
    }
    else {
        document.getElementById('wrongEmail').classList.remove("hidden");
    }
}

function setRememberUser() {
    if (document.getElementById("loginRememberCheckbox").checked) {
        localStorage.setItem("rememberedUser", JSON.stringify(user));
        localStorage.setItem("rememberUser", 1);
    } else {
        localStorage.setItem("rememberUser", 0);
    }
}

function openSignUp() {
    document.getElementById('emailIsAlreadyExistingSignUp').classList.add('dp-none');
    document.getElementById('signUpContainerContent').classList.remove("dp-none");
    document.getElementById('loginBox').classList.add("dp-none");
    document.getElementById('signUpButton').classList.add("dp-none");
    document.getElementById("signUpFirstNameInput").focus();
}

function openForgotPassword() {
    document.getElementById('eMailHasBeenSent').classList.add('dp-none');
    document.getElementById('forgotContainerContent').classList.remove("dp-none");
    document.getElementById('loginBox').classList.add("dp-none");
    document.getElementById('signUpButton').classList.add("dp-none");
    document.getElementById("forgotMailInput").focus();
}

function setUser(user) {
    let userAsText = JSON.stringify(user);
    localStorage.setItem("user", userAsText);
}

function guestLogin() {
    setUser(guestUser);
    localStorage.setItem("guestLogin", 1);
    window.location.href = './summary/summary.html';
}