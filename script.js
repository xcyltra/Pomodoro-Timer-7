const durations = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

let mode = 'pomodoro';
let reps = 0;
let isPaused = false;
let timeLeft = durations[mode];
let timerInterval = null;

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

function setButtonState(activeId) {
  const buttons = ["btn-mulai", "btn-pause", "btn-reset"];
  buttons.forEach(id => {
    const btn = document.getElementById(id);
    if (id === activeId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function startTimer() {
  if (timerInterval) return; // jangan dobel interval

  setButtonState("btn-pause"); // tombol pause akan aktif saat timer jalan

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      if (mode === "pomodoro") checkmarksDisplay.textContent += "✔";

      if (loopCheckbox.checked) {
        mode = (mode === "pomodoro") ? (reps % 8 === 0 ? "long" : "short") : "pomodoro";
        setMode(mode);
        startTimer();
      } else {
        statusDisplay.textContent = "Selesai!";
        setButtonState("btn-reset");
      }
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    statusDisplay.textContent = "Ditunda...";
    setButtonState("btn-pause");
  } else {
    startTimer(); // lanjutkan
  }
}


function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  isPaused = false;
  reps = 0;
  checkmarksDisplay.textContent = "";
  setMode("pomodoro");
  setButtonState("btn-mulai");
  document.getElementById("btn-pause").textContent = "Pause";
}

setMode("pomodoro"); // inisialisasi awal

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  // buat ceklist task
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.classList.add("completed");
    } else {
      span.classList.remove("completed");
    }
  });

  // nambahin teks di list
  const span = document.createElement("span");
  span.textContent = taskText;
  span.style.marginLeft = "10px";
  span.style.marginRight = "auto";

  // tombol hapus list
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.border = "none";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontSize = "1rem";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
} 