const todoControl = document.querySelector(".todo-control");
const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

function loader() {
  toDoData = Array.isArray(JSON.parse(localStorage.getItem("todoTasks")))
    ? JSON.parse(localStorage.getItem("todoTasks"))
    : [];
}
loader();
const render = function () {
  todoCompleted.innerHTML = "";
  todoList.innerHTML = "";
  toDoData.forEach(function (item, index) {
    console.log(index, item);
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `<span class="text-todo">${item.text}</span>
    <div class="todo-buttons">
        <button class="todo-remove" data-item=${index}></button>
        <button class="todo-complete"></button>
    </div>`;
    switch (item.completed) {
      case true:
        todoCompleted.append(li);
        break;
      default:
        todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      localStorage.setItem("todoTasks", JSON.stringify(toDoData));
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData.splice(
        +li.querySelector(".todo-remove").getAttribute("data-item"),
        1
      );
      localStorage.setItem("todoTasks", JSON.stringify(toDoData));
      render();
    });
  });
};

render();
todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value.trim() === "") {
    alert("Пустые дела добавляться не должны!");
    return;
  }
  const newToDo = {
    text: input.value,
    completed: false,
  };
  toDoData.push(newToDo);
  render();
  localStorage.setItem("todoTasks", JSON.stringify(toDoData));
  input.value = "";
});
