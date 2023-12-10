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
const resetPasswordContainer = document.getElementById('resetPasswordContainer');

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
  resetPasswordContainer.style.display = "none";
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

// forgot passsword icon reveal
function toggleResetPassword(icon) {
  var passwordField = document.getElementById('resetPasswordInput');
  
  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.setAttribute('name', 'eye-outline');
  } else {
    passwordField.type = "password";
    icon.setAttribute('name', 'eye-off-outline');
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

const fileInput = document.getElementById('fileInput');

// Check if fileInput exists before adding the event listener
if (fileInput) {
  fileInput.addEventListener('change', handleFileSelect);
} else {
  console.warn("Element with ID 'fileInput' not found. File input functionality will be disabled.");
}

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

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();

    contactForm.reset();
    attachmentList.innerHTML = '';
    return false;
  });
} else {
  console.warn("Element with ID 'form-contact' not found. Form functionality will be disabled.");
}



// Messages tab ------------------------------------------------------------------------------------------------------------
function populateMessages() {
  // Sample messages data
  const messagesReceived = [
    { 
      id: 1, 
      messageDate: '2023-12-12',
      subject: 'Greetings from MyGymBuddy', 
      content: 'Hello Nejc,<br><br>We hope you are enjoying your fitness journey with MyGymBuddy. Keep up the great work!<br><br>Best regards,<br>The MyGymBuddy Team'
    }, 
    { 
      id: 2, 
      messageDate: '2023-12-15',
      subject: 'Important Update: New Features Added', 
      content: 'Dear Nejc,<br><br>We are excited to announce new features added to MyGymBuddy. Explore the app to discover the latest enhancements!<br><br>Best regards,<br>The MyGymBuddy Team'
    },
    { 
      id: 3, 
      messageDate: '2023-12-18',
      subject: 'Congratulations on Your Milestone', 
      content: 'Hi Nejc,<br><br>Congratulations on reaching a new fitness milestone! Your dedication and hard work are truly inspiring. Keep pushing towards your goals!<br><br>Best regards,<br>The MyGymBuddy Team'
    }    
  ];

  const messagesSent = [
    { 
      id: 4, 
      messageDate: '2023-12-10',
      subject: 'Confirmation: Gym Session Tomorrow', 
      content: 'Hi John,<br><br>This is a confirmation of our gym session tomorrow at 14:30. Looking forward to working out together!<br><br>Best regards,<br>Nejc',
    },
    { 
      id: 5, 
      messageDate: '2023-12-13',
      subject: 'Invitation: Join My Fitness Challenge', 
      content: 'Hi John,<br><br>I am organizing a fitness challenge and would love for you to join! Let me know if you are interested.<br><br>Best regards,<br>Nejc'
    },
    { 
      id: 6, 
      messageDate: '2023-12-20',
      subject: 'Reminder: Fitness Challenge Tomorrow', 
      content: 'Hi John,<br><br>Just a friendly reminder that our fitness challenge is tomorrow. Get ready for an exciting and rewarding experience!<br><br>Best regards,<br>Nejc'
    }    
  ];

 
  // Select elements
  const receivedMessagesContainer = document.querySelector('.receivedMessages');
  const sentMessagesContainer = document.querySelector('.sentMessages');
  const mainContent = document.querySelector('.messageRightContent');
  const buttonReceived = document.getElementById('buttonReceived');
  const buttonSent = document.getElementById('buttonSent');

  // Function to display message in the main content area
  function displayMessage(message, listItem) {
    // Remove the active class from all list items
    document.querySelectorAll('.receivedMessages li, .sentMessages li').forEach(item => {
      item.classList.remove('active-message');
    });

    // Add the active class to the clicked list item
    listItem.classList.add('active-message');

    document.getElementById('messageRight').style.display = "block";
    document.getElementById('iconOpenMessage').style.display = "none";
    document.getElementById('openMessage').style.border = "none";

    mainContent.style.display = 'block';
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

  // Event listener for the "Received" button
  buttonReceived.addEventListener('click', function () {
    receivedMessagesContainer.style.display = 'block';
    sentMessagesContainer.style.display = 'none';

    // Add the active class to the "Received" button
    buttonReceived.classList.add('active-button');
    // Remove the active class from the "Sent" button
    buttonSent.classList.remove('active-button');
  });

  // Event listener for the "Sent" button
  buttonSent.addEventListener('click', function () {
    receivedMessagesContainer.style.display = 'none';
    sentMessagesContainer.style.display = 'block';

    // Add the active class to the "Sent" button
    buttonSent.classList.add('active-button');
    // Remove the active class from the "Received" button
    buttonReceived.classList.remove('active-button');
  });

  // Call the event listener for the "Received" button initially to set the default view
  buttonReceived.click();

  function populateMessageList(messages, containerClass) {
    // Create an unordered list
    const messagesList = document.createElement('ul');
  
    // Iterate through the messages array
    messages.forEach(message => {
      // Create a list item for each message
      const listItem = document.createElement('li');
  
      // Create a container for the avatar and text
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message-container');
  
      // Create an icon element
      const icon = document.createElement('ion-icon');
      icon.setAttribute('name', 'person-circle-outline');
      icon.classList.add('avatar-icon'); // Add a class for styling
  
      // Create a container for the text content
      const textContainer = document.createElement('div');
      textContainer.classList.add('message-text'); // Add a class for styling
  
      // Create a date element (replace 'messageDate' with the actual date property of your message object)
      const date = document.createElement('div');
      date.textContent = message.messageDate; // Replace 'messageDate' with the actual date property of your message object
      date.classList.add('message-date'); // Add a class for styling
  
      // Create a span for the subject
      const subject = document.createElement('span');
      subject.textContent = message.subject;
      subject.classList.add('message-subject'); // Add a class for styling
  
      // Create a span for the short snippet of the message content
      const shortContent = document.createElement('p');
      // Replace line breaks with spaces and display the first 20 characters of the message content
      shortContent.innerHTML = message.content.replace(/<br>/g, ' ').slice(0, 25);
      
      // Append ellipsis to the short content
      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      shortContent.appendChild(ellipsis);
  
      // Append the date, subject, and short content to the text container
      textContainer.appendChild(subject);
      textContainer.appendChild(shortContent);
      textContainer.appendChild(date);
  
      // Append the icon and text container to the messageContainer
      messageContainer.appendChild(icon);
      messageContainer.appendChild(textContainer);
  
      // Append the messageContainer to the listItem
      listItem.appendChild(messageContainer);
  
      // Add a click event listener
      listItem.addEventListener('click', () => displayMessage(message, listItem));
  
      // Append the listItem to the messagesList
      messagesList.appendChild(listItem);
    });
  
    // Get the container element using the provided class
    const container = document.querySelector(`.${containerClass}`);
  
    // Append the messagesList to the container
    container.appendChild(messagesList);
  }
  
  // Call the function for sent messages
  populateMessageList(messagesSent, 'sentMessages');
  
  // Call the function for received messages
  populateMessageList(messagesReceived, 'receivedMessages');
}
populateMessages();

//new message---------------------------------------------------------------------------------------------------------------
const newMessageIcon = document.getElementById('newMessage');
const newMessageForm = document.getElementById('newMessageForm');

// Function to open the new message form
function openNewMessageForm() {
  newMessageForm.style.display = 'block';
}

// Function to close the new message form if clicked outside
document.body.addEventListener('click', (event) => {
  if (!newMessageForm.contains(event.target) && event.target !== newMessageIcon) {
    newMessageForm.style.display = 'none';
  }
});

// Attach the openNewMessageForm function to the click event of the new message icon
newMessageIcon.addEventListener('click', openNewMessageForm);

