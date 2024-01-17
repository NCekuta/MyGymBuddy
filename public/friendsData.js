// friendsData.js
export let friendsArray = [
    {
      id: 1,
      name: "Ayo Ogunseinde",
      email: "ayo.ogunseinde@gmail.com",
      image: "Slike/People/1. ayo-ogunseinde-6W4F62sN_yI-unsplash.jpg",
    },
    // Add other pre-defined friends here...
  ];
  

  // Load friendsArray from localStorage on script load
if (localStorage.getItem('friendsArray')) {
    friendsArray = JSON.parse(localStorage.getItem('friendsArray'));
  }
  
  // Save friendsArray to localStorage whenever it is updated
  function saveFriendsArray() {
    localStorage.setItem('friendsArray', JSON.stringify(friendsArray));
  }
  
  export function addFriend(user) {
    friendsArray.push(user);
    saveFriendsArray();
  }
  
  export function removeFriend(userId) {
    const index = friendsArray.findIndex(friend => friend.id == userId);
    
    if (index != -1) {
      friendsArray.splice(index, 1);
      saveFriendsArray();
    }
  }
  