//Add friends
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    
    users.forEach(user => {
      const isMatch = user.name.toLowerCase().includes(value); 
      if (value === null || value.trim() === "") {
        user.element.classList.add("hide");
      } else {
        if (isMatch) {
          user.element.classList.remove("hide");
        } else {
          user.element.classList.add("hide");
        }
      }
    });
});
  
fetch("Slike/People/AllPeople.txt")
    .then(res => res.json())
    .then(data => {
      users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const picture = card.querySelector(".friendImage");
        const manID = card.querySelector(".ID");

        manID.textContent = user.id;
        header.textContent = user.name;
        picture.src = user.image; // Set the actual image source
        userCardContainer.append(card);
  
        return { name: user.name, element: card };
      });
    });
  

// dodajanje novih prijateljev v myprofile......................................................................
import { addFriend, removeFriend, friendsArray } from './friendsData.js';

window.handleButtonClick = function(button) {
  console.log("Button clicked:", button);
  const user = getUserData(button);

  if (button.innerHTML === "Add") {
    button.innerHTML = "Remove";
    button.classList.add("removed");

    // Add the user to the friendsArray using the addFriend function
    addFriend(user);
  } else {
    button.innerHTML = "Add";
    button.classList.remove("removed");

    // Remove the user from the friendsArray using the removeFriend function
    removeFriend(user.id);
  }

  console.log("Current friendsArray:", friendsArray);
}

function getUserData(button) {
  // Retrieve user data from the data attributes of the button's parent element
  const card = button.closest('.AddFriendCard');
  return {
    id: card.querySelector('.ID').textContent,
    name: card.querySelector('.UserName').textContent,
    image: card.querySelector('.friendImage').src,
    // Add other properties as needed
  };
}



//------------------------------------------------------------------------------------------------
//icon add button
function AddIconClick(button) {
  var icon = button.querySelector('ion-icon');

  if (icon.getAttribute('name') === "person-add") {
    icon.setAttribute('name', "person-remove");
    button.classList.add("removed");
  } else {
    icon.setAttribute('name', "person-add");
    button.classList.remove("removed");
  }
}