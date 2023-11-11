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
