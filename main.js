// animacije med login in register
// linkamo vse gumbe in container
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
// ob pritisku na gumb se doda/izbrise class active
registerBtn.addEventListener('click', () => {container.classList.add("active")});
loginBtn.addEventListener('click', () => {container.classList.remove("active")});


// Funkcionlanost, da se login odpre ob pritisku na gumb login
// linkamo login gumb in login form
const openLoginBtn = document.getElementById('openLogin');
const loginForm = document.getElementById('loginForm');

// Add click event listener to open login modal
openLoginBtn.addEventListener('click', () => {
  loginForm.style.display = 'flex';
});

// Close modal when clicking outside the content
window.addEventListener('click', (event) => {
  if (event.target === loginForm) {
    loginForm.style.display = 'none';
  }
});
