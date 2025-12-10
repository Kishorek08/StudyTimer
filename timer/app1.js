let workTime = 25 * 60; 
let breakTime = 5 * 60;
let timeLeft = workTime;

let timerDisplay = document.getElementById("timer");
let alarmSound = document.getElementById("alarmSound");

let interval = null;
let isRunning = false;

// Buttons
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const workModeBtn = document.getElementById("workMode");
const breakModeBtn = document.getElementById("breakMode");

// Display Time
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start Timer
startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                alarmSound.play();
                clearInterval(interval);
                isRunning = false;
            }
        }, 1000);
    }
});

// Pause Timer
pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
});

// Reset Timer
resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    isRunning = false;
    if (workModeBtn.classList.contains("active")) {
        timeLeft = workTime;
    } else {
        timeLeft = breakTime;
    }
    updateDisplay();
});

// Switch to Work Mode
workModeBtn.addEventListener("click", () => {
    workModeBtn.classList.add("active");
    breakModeBtn.classList.remove("active");
    clearInterval(interval);
    isRunning = false;
    timeLeft = workTime;
    updateDisplay();
});

// Switch to Break Mode
breakModeBtn.addEventListener("click", () => {
    breakModeBtn.classList.add("active");
    workModeBtn.classList.remove("active");
    clearInterval(interval);
    isRunning = false;
    timeLeft = breakTime;
    updateDisplay();
});

// Initial Display
updateDisplay();
