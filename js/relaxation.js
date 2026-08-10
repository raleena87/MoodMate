/*
|--------------------------------------------------------------------------
| relaxation.js
|--------------------------------------------------------------------------
| Handles the 4-7-8 breathing animation and the 20-second
| screen-break countdown timer.
*/

document.addEventListener("DOMContentLoaded", function () {
    initBreathingExercise();
    initScreenBreakTimer();
});

/*
|--------------------------------------------------------------------------
| Breathing Exercise
|--------------------------------------------------------------------------
*/

function initBreathingExercise() {
    var circle = document.getElementById("breathingCircle");
    var instruction = document.getElementById("breathingInstruction");
    var startButton = document.getElementById("startBreathing");
    var stopButton = document.getElementById("stopBreathing");

    if (!circle || !startButton || !stopButton) {
        return;
    }

    var breathingInterval = null;
    var running = false;

    var phases = [
        { label: "Breathe In", className: "expand", duration: 4000, text: "Breathe in slowly through your nose..." },
        { label: "Hold", className: "expand", duration: 7000, text: "Hold your breath..." },
        { label: "Breathe Out", className: "shrink", duration: 8000, text: "Breathe out slowly through your mouth..." }
    ];

    var phaseIndex = 0;

    startButton.addEventListener("click", function () {
        if (running) {
            return;
        }
        running = true;
        phaseIndex = 0;
        runPhase();
    });

    stopButton.addEventListener("click", function () {
        stopBreathing();
    });

    function runPhase() {
        if (!running) {
            return;
        }

        var phase = phases[phaseIndex];

        circle.classList.remove("expand", "shrink");
        // Force reflow so the transition restarts cleanly.
        void circle.offsetWidth;
        circle.classList.add(phase.className);
        circle.textContent = phase.label;
        instruction.textContent = phase.text;

        breathingInterval = window.setTimeout(function () {
            phaseIndex = (phaseIndex + 1) % phases.length;
            runPhase();
        }, phase.duration);
    }

    function stopBreathing() {
        running = false;
        if (breathingInterval) {
            window.clearTimeout(breathingInterval);
            breathingInterval = null;
        }
        circle.classList.remove("expand", "shrink");
        circle.textContent = "Breathe";
        instruction.textContent = "Press start when you're ready";
    }
}

/*
|--------------------------------------------------------------------------
| Screen Break Timer
|--------------------------------------------------------------------------
*/

function initScreenBreakTimer() {
    var display = document.getElementById("timerDisplay");
    var startButton = document.getElementById("startTimer");
    var pauseButton = document.getElementById("pauseTimer");
    var resetButton = document.getElementById("resetTimer");
    var timeChoices = document.getElementById("timeChoices");

    if (!display || !startButton || !pauseButton || !resetButton) {
        return;
    }

    var totalSeconds = 60;
    var remainingSeconds = totalSeconds;
    var timerInterval = null;
    var isPaused = false;

    updateDisplay();

    /* Screen Break: let the user pick 30 sec, 1 min, or 3 min. */
    timeChoices?.addEventListener("click", function (event) {
        var button = event.target.closest(".filter-button");
        if (!button) {
            return;
        }

        timeChoices.querySelectorAll(".filter-button").forEach(function (item) {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        window.clearInterval(timerInterval);
        timerInterval = null;
        isPaused = false;

        totalSeconds = Number(button.dataset.seconds);
        remainingSeconds = totalSeconds;
        updateDisplay();
    });

    startButton.addEventListener("click", function () {
        if (timerInterval) {
            return;
        }
        isPaused = false;
        timerInterval = window.setInterval(tick, 1000);
    });

    pauseButton.addEventListener("click", function () {
        if (!timerInterval) {
            return;
        }

        if (isPaused) {
            isPaused = false;
            timerInterval = window.setInterval(tick, 1000);
        } else {
            isPaused = true;
            window.clearInterval(timerInterval);
            timerInterval = null;
        }
    });

    resetButton.addEventListener("click", function () {
        window.clearInterval(timerInterval);
        timerInterval = null;
        isPaused = false;
        remainingSeconds = totalSeconds;
        updateDisplay();
    });

    function tick() {
        remainingSeconds -= 1;

        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
            updateDisplay();
            window.clearInterval(timerInterval);
            timerInterval = null;
            display.textContent = "Done!";
            return;
        }

        updateDisplay();
    }

    function updateDisplay() {
        var minutes = Math.floor(remainingSeconds / 60);
        var seconds = remainingSeconds % 60;
        display.textContent = pad(minutes) + ":" + pad(seconds);
    }

    function pad(value) {
        return value < 10 ? "0" + value : String(value);
    }
}
