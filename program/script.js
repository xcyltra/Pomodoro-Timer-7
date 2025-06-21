// ini untuk ambil dari localStorage kalau ada, kalau tidak pakai default
const storedDurations = localStorage.getItem("durations");
const durations = storedDurations
  ? JSON.parse(storedDurations)
  : {
      pomodoro: 25 * 60,
      short: 5 * 60,
      long: 15 * 60,
    };

let mode = 'pomodoro';
let reps = 0;
let timeLeft = durations[mode];
let timerInterval = null;
let taskList = [];

const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");
const checkmarksDisplay = document.getElementById("checkmarks");
const loopCheckbox = document.getElementById("loopMode");

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setMode(newMode) {
  mode = newMode;
  clearInterval(timerInterval);
  timeLeft = durations[mode];
  updateTimerDisplay();

  // Update tombol aktif (pomodoro, short long break)
  document.querySelectorAll(".mode-buttons button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`btn-${mode}`).classList.add("active");

  if (mode === "pomodoro") {
    statusDisplay.textContent = "Waktu kerja";
  } else if (mode === "short") {
    statusDisplay.textContent = "Istirahat pendek";
  } else {
    statusDisplay.textContent = "Istirahat panjang";
  }
}

function startTimer() {
  clearInterval(timerInterval);

  if (mode === "pomodoro") {
    reps++;
    statusDisplay.textContent = "Waktu kerja";
  } else if (mode === "short") {
    statusDisplay.textContent = "Istirahat pendek";
  } else {
    statusDisplay.textContent = "Istirahat panjang";
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      if (mode === "pomodoro") {
        checkmarksDisplay.textContent += "✔";
      }

      if (loopCheckbox.checked) {
        // Ganti mode otomatis
        if (mode === "pomodoro") {
          mode = reps % 8 === 0 ? "long" : "short";
        } else {
          mode = "pomodoro";
        }
        setMode(mode);
        startTimer();
      } else {
        statusDisplay.textContent = "Selesai!";
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  reps = 0;
  checkmarksDisplay.textContent = "";
  setMode("pomodoro");
}

document.getElementById("settingsBtn").addEventListener("click", () => {
  document.getElementById("modalOverlay").style.display = "flex";
});

document.getElementById("closeSettings").addEventListener("click", () => {
  document.getElementById("modalOverlay").style.display = "none";
});

document.getElementById("saveSettings").addEventListener("click", () => {
  const pomodoroVal = parseInt(document.getElementById("pomodoroInput").value);
  const shortVal = parseInt(document.getElementById("shortInput").value);
  const longVal = parseInt(document.getElementById("longInput").value);

  if (pomodoroVal > 0 && shortVal > 0 && longVal > 0) {
  durations.pomodoro = pomodoroVal * 60;
  durations.short = shortVal * 60;
  durations.long = longVal * 60;

  // Simpan ke localStorage
  const savedDurations = {
    pomodoro: durations.pomodoro,
    short: durations.short,
    long: durations.long
  };
  localStorage.setItem("durations", JSON.stringify(savedDurations));

  timeLeft = durations[mode];
  updateTimerDisplay();

  document.getElementById("modalOverlay").style.display = "none";
  } else { alert("Durasi harus lebih dari 0.");
  }
});

setMode("pomodoro"); // inisialisasi awal

function saveTasks() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function loadTasks() {
  const saved = localStorage.getItem("taskList");
  if (saved) {
    taskList = JSON.parse(saved);
    taskList.forEach(task => renderTask(task));
  }
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    judul: taskText,
    selesai: false
  };

  taskList.push(task);
  saveTasks();
  renderTask(task);

  input.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.selesai;
  checkbox.addEventListener("change", () => {
    task.selesai = checkbox.checked;
    if (checkbox.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
    saveTasks();
  });

  const span = document.createElement("span");
  span.textContent = task.judul;
  span.style.marginLeft = "10px";
  span.style.marginRight = "auto";
  if (task.selesai) span.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontSize = "1rem";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    taskList = taskList.filter(t => t !== task);
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
}

window.addEventListener("load", loadTasks);
