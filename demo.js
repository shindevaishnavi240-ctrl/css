const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const ageField = document.getElementById("age");
const passwordField = document.getElementById("password");
const form = document.getElementById("form");

function setError(field, msg, id) {
    field.classList.add("invalid");
    field.classList.remove("valid");
    document.getElementById(id).innerText = msg;
}

function setSuccess(field, id) {
    field.classList.remove("invalid");
    field.classList.add("valid");
    document.getElementById(id).innerText = "";
}

/* NAME VALIDATION (ONLY LETTERS ALLOWED) */
nameField.addEventListener("keypress", function(e) {
    let char = String.fromCharCode(e.keyCode);
    if(!/[A-Za-z ]/.test(char)){
        e.preventDefault();
        document.getElementById("nameError").innerText="Only characters allowed";
    }
});

/* EMAIL VALIDATION */
function validateEmail() {
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if(!pattern.test(emailField.value)){
        setError(emailField,"Enter valid email (example@gmail.com)","emailError");
        return false;
    }
    setSuccess(emailField,"emailError");
    return true;
}

/* AGE VALIDATION */
function validateAge(){
    let age = ageField.value;
    if(age<18 || age>60){
        setError(ageField,"Age must be between 18 and 60","ageError");
        return false;
    }
    setSuccess(ageField,"ageError");
    return true;
}

/* PASSWORD STRENGTH */
passwordField.addEventListener("input",function(){
    let pass = passwordField.value;
    let msg = document.getElementById("strengthMsg");
    let strength = 0;

    if(pass.length>=6) strength++;
    if(/[A-Z]/.test(pass)) strength++;
    if(/[0-9]/.test(pass)) strength++;
    if(/[!@#$%^&*]/.test(pass)) strength++;

    if(pass.length==0){
        msg.innerText="";
        return;
    }

    if(strength<=1){
        msg.innerText="Weak Password";
        msg.style.color="red";
    } else if(strength==2 || strength==3){
        msg.innerText="Medium Password";
        msg.style.color="orange";
    } else{
        msg.innerText="Strong Password";
        msg.style.color="green";
    }
});

/* PASSWORD VALIDATION */
function validatePassword(){
    if(passwordField.value.length<6){
        setError(passwordField,"Password must be at least 6 characters","passwordError");
        return false;
    }
    setSuccess(passwordField,"passwordError");
    return true;
}

/* FORM SUBMIT */
form.addEventListener("submit", function(e){
    e.preventDefault();

    let validEmail = validateEmail();
    let validAge = validateAge();
    let validPassword = validatePassword();

    let status = document.getElementById("formStatus");

    if(validEmail && validAge && validPassword){
        status.innerText="✅ Form Submitted Successfully";
        status.style.color="green";
    } else{
        status.innerText="❌ Form contains errors";
        status.style.color="red";
    }
});