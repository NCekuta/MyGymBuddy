// Friends ------------------------------------------------------------------------------------------------

const numfriends = document.getElementById("friends");
numfriends.innerText = friendsArray.length;

// da se vsi prijatelji iz arraya dinamicno prikazejo na strani --------------------------------------------------
import { addFriend, removeFriend, friendsArray } from './friendsData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Your existing code to render the HTML for each friend
  const friendsContainer = document.querySelector('.friends-container');

  friendsArray.forEach(friend => {
    const friendDiv = document.createElement('div');
    friendDiv.classList.add('friend');
    friendDiv.innerHTML = `
      <div class="friendImage"><img src="${friend.image}" alt=""></div>
      <div class="friendName"><h3 onclick="ButtonRemoveFriend(this)">${friend.name}</h3></div>
      <div class="ID"><h3>${friend.id}</h3></div>
    `;

    friendsContainer.appendChild(friendDiv);
  });

  console.log("Current friendsArray:", friendsArray);
});


// da lahko odstraniš prijatelja ------------------------------------------------------------
window.ButtonRemoveFriend = function(button) {
  const user = getUserData(button);

  removeFriend(user.id);

  // Add the "removed" class to hide the friend element
  const friendElement = button.closest('.friend');
  friendElement.classList.add('removed');
  
  numfriends.innerText = friendsArray.length;

  console.log("Current friendsArray:", friendsArray);
}


function getUserData(button) {
  // Retrieve user data from the data attributes of the button's parent element
  const card = button.closest('.friend');
  return {
    id: card.querySelector('.ID').textContent.trim(),
    name: card.querySelector('.friendName').textContent,
    image: card.querySelector('.friendImage').src,
    // Add other properties as needed
  };
}


