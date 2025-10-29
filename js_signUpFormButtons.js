



//target constants
const navCreateAccount = document.getElementById("registerFormContent");
const navLoginAccount = document.getElementById("formContent");
const navAccountSecurity = document.getElementById("registerFormSecurity");
const navFinalizeRegistration = document.getElementById("registerFormSecurityQuestion");

document.querySelectorAll(".cancelRegister").forEach(btn => {
    btn.addEventListener("click", () => {
        if (confirm('Are you sure you want to cancel registration?')) {
            window.location.reload();
        }
    });
});




document.getElementById("createAccountBtn").addEventListener("click", () => {
    navLoginAccount.style.display = "none";
    navCreateAccount.style.display = "grid";
});

document.getElementById("regBackBtn").addEventListener("click", () => {
    if (confirm('This action will RESET fields and bring you back to previous page. Do you want to continue?')) {
        //document.getElementById("registerFormSecurity").reset()
        navAccountSecurity.style.display = "none";
        navCreateAccount.style.display = "grid";
    }
});
document.getElementById("regBackBtnQuestion").addEventListener("click", () => {
    if (confirm('This action will RESET fields and bring you back to previous page. Do you want to continue?')) {
        //document.getElementById("registerFormSecurity").reset()
        navFinalizeRegistration.style.display = "none";
        navAccountSecurity.style.display = "grid";
    }
});



navCreateAccount.addEventListener('submit', function (event) {
    //if (!event.target.checkValidity()) {
        event.preventDefault();
    //}
    if (confirm('Click OK to confirm information is correct.')) {
        navCreateAccount.style.display = "none";
        navAccountSecurity.style.display = "grid";
    }
});

navFinalizeRegistration.addEventListener('submit', function (event) {
    //if (!event.target.checkValidity()) {
    event.preventDefault();
    //}
    if (confirm('This action will finalize your account registration. Make sure you jot down your Account, Password, and Unique code.')) {
        navCreateAccount.style.display = "none";
        navAccountSecurity.style.display = "grid";
    }
});

//field constants
const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");
const createUserName = document.getElementById("createUserName");
const createPassWord = document.getElementById("createPassWord");
const confirmPassWord = document.getElementById("confirmPassWord");

const reviewFirstName = document.getElementById("reviewFirstName");
const reviewMiddleName = document.getElementById("reviewMiddleName");
const reviewLastName = document.getElementById("reviewLastName");
const reviewAccount = document.getElementById("reviewAccount");
const reviewPassword = document.getElementById("reviewPassword");
const reviewUniqueCode = document.getElementById("reviewUniqueCode");
const randomText = generateRandomAlphanumeric();
const reviewUniqueCodeDescription = document.   getElementById('reviewUniqueCodeDescription');

navAccountSecurity.addEventListener('submit', function (event) {
    //if (!event.target.checkValidity()) {
        event.preventDefault();
    //}

    if (confirm('Do you want to finalize the registration?')) {
        navAccountSecurity.style.display = "none";
        navFinalizeRegistration.style.display = "grid"

        console.log(firstName.value);
        console.log(middleName.value);
        console.log(lastName.value);
        console.log(createUserName.value);
        console.log(createPassWord.value);
        console.log(confirmPassWord.value);
        console.log(randomText);

        reviewFirstName.textContent = 'First Name: ' + firstName.value;
        reviewMiddleName.textContent = 'Middle Name: ' + middleName.value;
        reviewLastName.textContent = 'Last Name: ' + lastName.value;
        reviewAccount.textContent = 'Username: ' + createUserName.value;
        reviewPassword.innerHTML = 'Password: <i>*hidden*</i>';
        reviewUniqueCode.textContent = 'Unique Code: ' + randomText;
    }
});







function generateRandomAlphanumeric(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}