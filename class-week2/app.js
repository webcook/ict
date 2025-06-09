const list = document.getElementById("list");
const toggleThemeBtn = document.getElementById("toggle-theme");
const clearAllBtn = document.getElementById("clear-all");

let todos = [];

function createTodoElement(item, isNew = false) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  if (item.complete) itemEl.classList.add("complete");

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = item.text;
  if (!isNew) inputEl.setAttribute("disabled", "");

  const saveBtn = document.createElement("button");
  saveBtn.classList.add('material-icons');
  saveBtn.textContent = "save";

  const removeBtn = document.createElement("button");
  removeBtn.classList.add('material-icons');
  removeBtn.textContent = "delete";

  const actionsEl = document.createElement("div");
  actionsEl.classList.add("actions");
  actionsEl.append(saveBtn, removeBtn);

  itemEl.append(checkbox, inputEl, actionsEl);

  checkbox.addEventListener("change", () => {
    item.complete = checkbox.checked;
    itemEl.classList.toggle("complete", item.complete);
    saveToLocalStorage();
  });

  // 항상 최신 값 반영
  inputEl.addEventListener("input", (e) => {
    item.text = e.target.value;
  });

  inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      finalizeInput();
    }
  });

  saveBtn.addEventListener("click", finalizeInput);

  function finalizeInput() {
    const val = inputEl.value.trim();
    if (val === "") return;
    item.text = val;
    inputEl.setAttribute("disabled", "");

    if (!todos.find(t => t.id === item.id)) {
      todos.unshift(item);
    }

    saveToLocalStorage();
    prependEmptyInput();
  }

  removeBtn.addEventListener("click", () => {
    todos = todos.filter(t => t.id !== item.id);
    itemEl.remove();
    saveToLocalStorage();
  });

  list.prepend(itemEl);
  if (isNew) inputEl.focus();
}

// 항상 맨 위에 빈 입력 생성
function prependEmptyInput() {
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false
  };
  createTodoElement(item, true);
}

function displayTodos() {
  loadFromLocalStorage();
  list.innerHTML = "";
  todos.slice().reverse().forEach(item => createTodoElement(item));
  prependEmptyInput(); // 항상 위에 빈칸
}


function saveToLocalStorage() {
  localStorage.setItem("my_todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("my_todos");
  if (data) {
    todos = JSON.parse(data);
  }
}

// 테마 초기화
function initTheme() {
  const theme = localStorage.getItem("theme") || document.documentElement.getAttribute("data-color-mode") || "light";
  document.documentElement.setAttribute("data-theme", theme);
  toggleThemeBtn.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}

// 테마 전환
toggleThemeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  toggleThemeBtn.textContent = next === "dark" ? "light_mode" : "dark_mode";
});

// 모두 삭제
clearAllBtn.addEventListener("click", () => {
  todos = [];
  list.innerHTML = "";
  prependEmptyInput();
  saveToLocalStorage();
});

initTheme();
displayTodos();
