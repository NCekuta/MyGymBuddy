//my profile
const btnAddFriends = document.getElementById("btnAddFrineds");
btnAddFriends.addEventListener('click', () => {
    window.location.href = 'AddFriends.html';
});

// Edit button click event
const btnEdit = document.getElementById("btnEdit");
btnEdit.addEventListener('click', () => {
    // Remove 'active' class from all tabs
    $('.nav ul li').removeClass('active');
    
    // Make the 'Personal Info' tab active
    $('.user-info').addClass('active');

    // Display the content of the 'Personal Info' tab
    const panelIndex = $('.user-info').index(); // Get the index of the 'Personal Info' tab
    tabs(panelIndex);
});

function tabs(panelIndex) {
    const tab = document.querySelectorAll('.tab');

    // Hide all tabs
    tab.forEach(function(node) {
        node.style.display = 'none';
    });

    // Show the selected tab
    tab[panelIndex].style.display = 'block';
}



//nav bar
$(document).ready(function() {
    
    $('.nav ul li').click(function() {
        $(this).addClass("active").siblings().removeClass('active');
    });
});



//razlicni tabi majo razlicno vsebino k je prkazana samo ko je določen activ

// Wait for the DOM to be ready before executing JavaScript
$(document).ready(function() {
    const tabBtn = document.querySelectorAll('.nav ul li');
    const tab = document.querySelectorAll('.tab');

    // Initial setup
    tabs(0);

    // Add a click event listener to each tab button
    $('.nav ul li').click(function() {
        const index = $(this).index(); // Get the index of the clicked tab button
        tabs(index);
    });

    function tabs(panelIndex) {
        // Hide all tabs
        tab.forEach(function(node) {
            node.style.display = 'none';
        });

        // Show the selected tab
        tab[panelIndex].style.display = 'block';
    }
});


//da updejta iz info na profil
document.getElementById('saveButton').addEventListener('click', function () {
    // Get values from the form using IDs
    const firstName = document.getElementById('firstNameInput').value;
    const lastName = document.getElementById('lastNameInput').value;
    const email = document.getElementById('emailInput').value;
    const birthday = document.getElementById('birthdayInput').value;
    const weight = document.getElementById('weightInput').value;
    const bio = document.getElementById('bioInput').value;

    // Update values in the left column
    document.getElementById('fullName').textContent = `${firstName} ${lastName}`;
    document.getElementById('personal_mail').textContent = email;
    document.getElementById('age').textContent = calculateAge(birthday);
    document.getElementById('weight').textContent = weight;
    document.getElementById('bio').textContent = bio;
});

// Function to calculate age based on the birthday
function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        return age - 1;
    }

    return age;
}


//za sliko
document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('fileInput').click();
  });
  
  document.getElementById('fileInput').addEventListener('change', function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const profilePicture = document.getElementById('profilePicture').querySelector('img');
        profilePicture.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }
  });
  
  document.getElementById('saveButton').addEventListener('click', function () {
    const profilePicture = document.getElementById('profilePicture').querySelector('img');
    const mainImage = document.getElementById('mainImage');
  
    // Copy the new photo source to the main area
    mainImage.src = profilePicture.src;
  
    // Close the file input (optional)
    document.getElementById('fileInput').value = '';
  });
  


