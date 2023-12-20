// Messages tab ------------------------------------------------------------------------------------------------------------
const messagesReceived = [];
const messagesSent = [];

function populateMessages() {
    
    messagesReceived.push(
        { 
            id: 4, 
            messageDate: '2023-12-12',
            subject: 'Greetings from MyGymBuddy', 
            content: 'Hello Nejc,<br><br>We hope you are enjoying your fitness journey with MyGymBuddy. Keep up the great work!<br><br>Best regards,<br>The MyGymBuddy Team',
            replies: []
        }, 
        { 
            id: 5, 
            messageDate: '2023-12-15',
            subject: 'Important Update: New Features Added', 
            content: 'Dear Nejc,<br><br>We are excited to announce new features added to MyGymBuddy. Explore the app to discover the latest enhancements!<br><br>Best regards,<br>The MyGymBuddy Team',
            replies: [
                {
                    id: 6,
                    messageDate: getCurrentDate(), 
                    sender: 'John Doe', // Add the sender's name or identifier
                    content: 'Thank you for the update! I can t wait to try out the new features.'
                },
                {
                    id: 7,
                    messageDate: getCurrentDate(),
                    sender: 'Jane Smith',
                    content: 'The new features sound great! Keep up the good work!',
                },
            ]
        },
        { 
            id: 6, 
            messageDate: '2023-12-18',
            subject: 'Congratulations on Your Milestone', 
            content: 'Hi Nejc,<br><br>Congratulations on reaching a new fitness milestone! Your dedication and hard work are truly inspiring. Keep pushing towards your goals!<br><br>Best regards,<br>The MyGymBuddy Team',
            replies: []
        } 
    )
   
  
    messagesSent.push(
        { 
            id: 1, 
            messageDate: '2023-12-10',
            subject: 'Confirmation: Gym Session Tomorrow', 
            content: 'Hi John,<br><br>This is a confirmation of our gym session tomorrow at 14:30. Looking forward to working out together!<br><br>Best regards,<br>Nejc'
        },
        { 
            id: 2, 
            messageDate: '2023-12-13',
            subject: 'Invitation: Join My Fitness Challenge', 
            content: 'Hi John,<br><br>I am organizing a fitness challenge and would love for you to join! Let me know if you are interested.<br><br>Best regards,<br>Nejc'
        },
        { 
            id: 3, 
            messageDate: '2023-12-18',
            subject: 'Reminder: Fitness Challenge Tomorrow', 
            content: 'Hi John,<br><br>Just a friendly reminder that our fitness challenge is tomorrow. Get ready for an exciting and rewarding experience!<br><br>Best regards,<br>Nejc'
        }    
    )
  
   
    // Select elements
    const receivedMessagesContainer = document.querySelector('.receivedMessages');
    const sentMessagesContainer = document.querySelector('.sentMessages');
    const buttonReceived = document.getElementById('buttonReceived');
    const buttonSent = document.getElementById('buttonSent');
  
    // Sample functions for replying and forwarding messages
    window.replyToMessage = function (messageId, date, subject, content) {
        mainContent.innerHTML = `
        <h2>${subject}</h2> 
        <p>${content}</p>
        <textarea id="replyToMessage" placeholder="Enter reply text"></textarea> <br>
        <button onclick="SendReplyMessage(${messageId}, '${date}', '${subject}', '${content}')">Send</button>
      `;
    };
    
    window.SendReplyMessage = function (messageIndex, date, subject, content) {
        const textareaReply = document.getElementById('replyToMessage');
        const replyValue = textareaReply.value;
    
        const newReply = {
            id: generateUniqueId(),
            messageDate: date,
            subject: "Reply",
            content: replyValue,
        };
    
        // Ensure messagesReceived[messageIndex] is an object and has a replies property
        if (!messagesReceived[messageIndex]) {
            messagesReceived[messageIndex] = { replies: [] };
        } else if (!messagesReceived[messageIndex].replies) {
            messagesReceived[messageIndex].replies = [];
        }
    
        messagesReceived[messageIndex].replies.push(newReply);
        displayReplies(messagesReceived[messageIndex]); // Display the replies for the specific message

        textareaReply.value = " ";
    };
    
    // Replace this with your unique ID generation logic
    function generateUniqueId() {
        return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    }
    
    window.showForwardInput = function (messageId, subject, content) {
        mainContent.innerHTML = `
          <h2>${subject}</h2> 
          <p>${content}</p>
          <label for="forwardEmail">Forward to: </label>
          <input type="email" id="forwardEmail" placeholder="Enter recipient email">
          <button onclick="forwardMessage(${messageId}, '${subject}', '${content}')">Send</button>
        `;
    };

    window.forwardMessage = function (messageId, subject, content) {
        const newMessage = [];
        const forwardedSubject = "Forwarded message: " + subject;

        newMessage.push(
            {
                id: messagesSent.length + 1,
                messageDate: getCurrentDate(),
                subject: forwardedSubject,
                content: content,
            }
        )

        messagesSent.push(newMessage);
        populateMessageList(newMessage, 'sentMessages');

        mainContent.innerHTML = `
        <h2>${subject}</h2> 
        <p>${content}</p>
      `;
    }
  
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

    // Call the function for sent messages
    populateMessageList(messagesSent, 'sentMessages');
    
    // Call the function for received messages
    populateMessageList(messagesReceived, 'receivedMessages');
  }

  const mainContent = document.querySelector('.messageRightContent');
  
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
        <button onclick="replyToMessage(${message.id}, '${message.messageDate}', '${message.subject}', '${message.content}', this.parentNode)">Reply</button>
        <button onclick="showForwardInput(${message.id}, '${message.subject}', '${message.content}', this.parentNode)">Forward</button>
    `;
  }

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
      listItem.addEventListener('click', () => displayReplies(message, listItem));
  
      // Append the listItem to the messagesList
      messagesList.appendChild(listItem);
    });
  
    // Clear existing content of the message container
    const container = document.querySelector(`.${containerClass}`);

    // Append the messagesList to the container
    container.appendChild(messagesList);
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
  
  
  //add new message to sent messages --------------------------------------------------------
  const sendMessageBtn = document.getElementById("sendMessageButton");
  const receivedMessagesContainer = document.querySelector('.receivedMessages');
  const sentMessagesContainer = document.querySelector('.sentMessages');
  
  sendMessageBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevents the form from submitting and refreshing the page
  
    // Get form input values
    const subject = document.getElementById("contact_subject").value;
    const messageContent = document.getElementById("contact_message").value;
  
    // Create a new message object
    const newMessage = [];
    newMessage.push(
        {
            id: messagesSent.length + 1,
            messageDate: getCurrentDate(),
            subject: subject,
            content: messageContent,
        }
    )
  
    // Add the new message to the messagesSent array
    messagesSent.push(newMessage);
  
    // clear the form fields
    document.getElementById("contact_email").value = "";
    document.getElementById("contact_subject").value = "";
    document.getElementById("contact_message").value = "";
  
    newMessageForm.style.display = 'none';
    populateMessageList(newMessage, 'sentMessages');
  });
  
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
// ------------------------------------------------------------------------------------------

//reply to message
function displayReplies(message) {
    const repliesContainer = document.querySelector('.messageReply');

    // Clear previous content
    repliesContainer.innerHTML = '';
    
    // Display replies
    if (message.replies && message.replies.length > 0) {
        // Create a container for each reply
        message.replies.forEach(reply => {
            const replyContainer = document.createElement('div');
            replyContainer.classList.add('reply');

            const replyContentHTML = `
                <h2>Reply</h2>
                <p>${reply.content}</p>
                <p>${reply.messageDate}</p>
            `;
            replyContainer.innerHTML = replyContentHTML;

            // Append each reply container to the main container
            repliesContainer.appendChild(replyContainer);
        });
    } else {
        // Display a message if there are no replies
        repliesContainer.innerHTML = '<p>No replies yet.</p>';
    }

    // Show the container
    repliesContainer.style.display = 'block';
}

