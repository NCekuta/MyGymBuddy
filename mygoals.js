// konstante
const addBtn = document.querySelector(".add-btn");
const newTaskInput = document.querySelector(".wrapper input");
const tasksContainer = document.querySelector(".tasks");
const erorr = document.getElementById("error");
const countValue = document.querySelector(".count-value")
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
}

const addTask = () => { // dodajanje taskov
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if(!taskName){
        setTimeout(() =>{
        error.style.display = "block";
        }, 200);
        return;
    }

const task = `<div class="task">
<input type="checkbox" class="task-check">
<span class="taskname">${taskName}</span>
<button class="edit">
<i class="fa-regular fa-pen-to-square"></i>
</button>
<button class="delete">
<i class="fa-solid fa-trash"></i>
</button>
</div>`;
tasksContainer.insertAdjacentHTML
("beforeend", task);

const deleteButtons = document.querySelectorAll(".delete");  // brisanje taskov
deleteButtons.forEach((button) => {
button.onclick = () => {
button.parentNode.remove();
taskCount = -1;
displayCount(taskCount);
};
});

const editButtons = document.querySelectorAll(".edit"); //spreminjanje taskov
editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
     let targetElement = e.target;
     if(!(e.target.className == "edit")){
        targetElement = e.target.parentElement;
     }
     newTaskInput.value = targetElement.previousElementSibling?.innerText;
     targetElement.parentNode.remove();
     taskCount -= 1;
     displayCount(taskCount);
    };
});

};

addBtn.addEventListener("click", addTask);