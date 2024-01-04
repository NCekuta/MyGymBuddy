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
