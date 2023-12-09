//dark/light mode ikona -------------------------------------------------------------------------------------------------------------------
// pogledamo uporabnikovo željeno temo v local storage
const isLightTheme = localStorage.getItem("theme") === "light";

// spremeni stran glede na temo
document.body.classList.toggle("light-theme", isLightTheme);

// spremeni ikono glede na temo
const moon_sun = document.getElementById("moon_sun");
if (isLightTheme) {
  moon_sun.innerHTML = '<ion-icon name="sunny" id="sun"></ion-icon>';
} else {
  moon_sun.innerHTML = '<ion-icon name="moon" id="moon"></ion-icon>';
}

moon_sun.onclick = function(){
  document.body.classList.toggle("light-theme");
  if(document.body.classList.contains("light-theme")){
    moon_sun.innerHTML = '<ion-icon name="sunny" id="sun"></ion-icon>';
  }
  else{
    moon_sun.innerHTML = '<ion-icon name="moon" id="moon"></ion-icon>';
  }

  // shrani temo ki je nastavljena
  const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", theme);
}


// login/registration -----------------------------------------------------------------------------------------------------

// animacije med login in register
// linkamo vse gumbe in container
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
// ob pritisku na gumb se doda/izbrise class active
registerBtn.addEventListener('click', () => {container.classList.add("active")});
loginBtn.addEventListener('click', () => {container.classList.remove("active")});


// Funkcionalnost, da se login odpre ob pritisku na gumb login
// linkamo login gumb in login form
const openLoginBtn = document.getElementById('openLogin');
const loginForm = document.getElementById('loginForm');

// Ko kliknemo na login gumb se prikaže login
openLoginBtn.addEventListener('click', () => {
  loginForm.style.display = 'flex';
});

// Če kliknemo izven login okna se okno zapre
window.addEventListener('click', (event) => {
  if (event.target === loginForm) {
    loginForm.style.display = 'none';
  }
});

//zapremo z iksom
loginCloseIcon = document.getElementById('login-close-icon');
loginCloseIcon.addEventListener('click', () => {
  loginForm.style.display = 'none';
});

// Login eye icon
function togglePasswordVisibility(icon, formType) {
  var passwordField = document.querySelector(`.${formType} .password-field`);
  
  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.innerHTML = '<ion-icon name="eye-outline"></ion-icon>';
  } else {
    passwordField.type = "password";
    icon.innerHTML = '<ion-icon name="eye-off-outline"></ion-icon>';
  }
}

//Password strength
function checkPasswordStrength(password) {
  var strengthBadge = document.getElementById("checkPassword");
  var weekIndicator = document.querySelector(".weekIndicator");
  var goodIndicator = document.querySelector(".goodIndicator");
  var strongIndicator = document.querySelector(".strongIndicator");

  // To reset the classes and width
  strengthBadge.className = "";

  // Display the password strength
  if (password.length < 8) {
    strengthBadge.innerText = "Your password is weak";
    weekIndicator.style.backgroundColor = "red";
    goodIndicator.style.backgroundColor = "hsla(208, 50%, 50%, 0.13)";
    strongIndicator.style.backgroundColor = "hsla(208, 50%, 50%, 0.13)";
  } else {
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      // Check for lowercase letters
      if (/[a-z]/.test(password)) {
        // Check for numbers
        if (/\d/.test(password)) {
          // Check for special characters
          if (/[^A-Za-z0-9]/.test(password)) {
            // The password is strong
            strengthBadge.innerText = "Your password is strong";
            strengthBadge.className = "strong";
            weekIndicator.style.backgroundColor = "red";
            goodIndicator.style.backgroundColor = "orange";
            strongIndicator.style.backgroundColor = "green";
          } else {
            // The password is good
            strengthBadge.innerText = "Your password is average";
            strengthBadge.className = "good";
            weekIndicator.style.backgroundColor = "red";
            goodIndicator.style.backgroundColor = "orange";
            strongIndicator.style.backgroundColor = "hsla(208, 50%, 50%, 0.13)";
          }
        } else {
          // The password is weak
          strengthBadge.innerText = "Password should contain numbers";
        }
      } else {
        // The password is weak
        strengthBadge.innerText = "Password should contain lowercase letters";
      }
    } else {
      // The password is weak
      strengthBadge.innerText = "Password should contain uppercase letters";
    }
  }
}

// contact tab --------------------------------------------------------------------------------------------------------------------
// kontakt, doda .focus class da se labeli premaknejo gor in tm ostanejo če je kej not napisano
const contactInputs = document.querySelectorAll(".contact-input");
function focusFunc(){
  let parent = this.parentNode;
  parent.classList.add("focus");
}
function blurFunc(){
  let parent = this.parentNode;
  if(this.value == ""){
  parent.classList.remove("focus");
  }
}

contactInputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
})

// omogočeno pošiljanje sporočil na mail
const contactForm = document.getElementById("form-contact");
const contactFirstName = document.getElementById("contact_firstName");
const contactLastName = document.getElementById("contact_lastName");
const contactEmail = document.getElementById("contact_email");
const contactMessage = document.getElementById("contact_message");

// Array to store attachment data
let allConvertedFiles = [];

// Contact attachments
const attachmentList = document.getElementById('attachment-list');

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

// Function to handle file selection, convert files to Base64, and display filenames
function handleFileSelect(event) {
  const fileList = event.target.files;
  attachmentList.innerHTML = ''; // Clear previous entries
  allConvertedFiles = []; // Clear previous attachments

  for (const file of fileList) {
    const listItem = document.createElement('div');
    listItem.classList.add('attachment-item');
    listItem.textContent = file.name;
    attachmentList.appendChild(listItem);

    // Read file data as Base64
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUri = "data:" + file.type + ";base64," + btoa(e.target.result);
      allConvertedFiles.push({ name: file.name, data: dataUri });
    };
    reader.readAsBinaryString(file);
  }
}

function sendEmail() {

  const bodyMessage = `First name: ${contactFirstName.value}<br> Last name: ${contactLastName.value}<br>
  Email: ${contactEmail.value}<br> Message: ${contactMessage.value}`

  Email.send({
      SecureToken : "8cf5b2c8-3193-4010-8c58-c3ed3e148081",
      To : 'mygymbuddybusiness@gmail.com',
      From : "mygymbuddybusiness@gmail.com",
      Subject : "Support",
      Body : bodyMessage,
      Attachments : allConvertedFiles
  }).then(
    message => {
      if (message == "OK"){
          Swal.fire({
            title: "Success!",
            text: "Message sent successfully!",
            icon: "success"
          });
      }
    }
  );
}

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();

    contactForm.reset();
    attachmentList.innerHTML = '';
    return false;
})

// messages tab ------------------------------------------------------------------------------------------------------------
// Function to populate messages
function populateMessages() {
  // Sample messages data
  const messagesData = [
    { id: 1, subject: 'Message 1', content: 'Content of Message 1' },
    { id: 2, subject: 'Message 2', content: 'Content of Message 2' },
    { id: 3, subject: 'Message 3', content: 'Content of Message 3' },
    // Add more messages as needed
  ];

  // Select elements
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');

  // Populate sidebar with messages
  const messagesList = document.createElement('ul');
  messagesData.forEach(message => {
    const listItem = document.createElement('li');
    listItem.textContent = message.subject;
    listItem.addEventListener('click', () => displayMessage(message));
    messagesList.appendChild(listItem);
  });
  sidebar.appendChild(messagesList);

  // Function to display message in the main content area
  function displayMessage(message) {
    mainContent.innerHTML = `
      <h2>${message.subject}</h2>
      <p>${message.content}</p>
      <button onclick="replyToMessage(${message.id})">Reply</button>
      <button onclick="forwardMessage(${message.id})">Forward</button>
    `;
  }

  // Sample functions for replying and forwarding messages
  window.replyToMessage = function (messageId) {
    alert(`Replying to message with ID ${messageId}`);
  };

  window.forwardMessage = function (messageId) {
    alert(`Forwarding message with ID ${messageId}`);
  };
}
