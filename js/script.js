const todoControl = document.querySelector(".todo-control");
const input = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const toDoData = Array.isArray(JSON.parse(localStorage.getItem("todoTasks")))
  ? []
  : JSON.parse(localStorage.getItem("todoTasks"));

const render = function () {
  todoCompleted.innerHTML = "";
  todoList.innerHTML = "";
  toDoData.forEach(function (item, index) {
    console.log(index, item);
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `<span class="text-todo">${item.text}</span>
    <div class="todo-buttons">
        <button class="todo-remove"></button>
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
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      li.remove();
      toDoData;
    });
  });
};

render();
todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value.trim() === "") {
    alert("3. Пустые дела добавляться не должны!");
    return;
  }
  const newToDo = {
    text: input.value,
    completed: false,
  };
  toDoData.push(newToDo);
  render();
  localStorage.setItem("todoTasks", JSON.stringify(toDoData));
});
