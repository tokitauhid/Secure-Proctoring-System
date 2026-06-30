let violations = 0;
let tabSwitch = 0;
let copyAttempts = 0;
let focusLoss = 0;
let suspicionScore = 0;
let timeLeft = 600;
let timer;

function updateUI() {
    document.getElementById("violations").innerText = violations;
    document.getElementById("tabSwitch").innerText = tabSwitch;
    document.getElementById("copyCount").innerText = copyAttempts;
    document.getElementById("focusLoss").innerText = focusLoss;
    document.getElementById("score").innerText = suspicionScore;
}
function addLog(text) {
    let li = document.createElement("li");
    li.innerText = text;
    document.getElementById("logs").appendChild(li);
}
function violation(type) {
    violations++;
    suspicionScore += 10;
    addLog(type);
    updateUI();
}
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    violation("Right click blocked");
});
document.addEventListener("copy", function (e) {
    e.preventDefault();
    copyAttempts++;
    violation("Copy attempt detected");
});
document.addEventListener("paste", function (e) {
    e.preventDefault();
    copyAttempts++;
    violation("Paste attempt detected");
});
document.addEventListener("cut", function (e) {
    e.preventDefault();
    copyAttempts++;
    violation("Cut attempt detected");
});
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        tabSwitch++;
        violation("Tab switched");
    }
});
window.addEventListener("blur", function () {
    focusLoss++;
    violation("Window focus lost");
});
document.addEventListener("keydown", function (e) {
    if (
        e.key === "F12" ||
        (e.ctrlKey && ["c", "v", "x", "u"].includes(e.key.toLowerCase()))
    ) {
        e.preventDefault();
        violation("Blocked keyboard shortcut");
    }
});
function detectDevTools() {
    const threshold = 160;
    if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
    ) {
        violation("DevTools opened");
    }
}
setInterval(detectDevTools, 1000);
function startTimer() {
    clearInterval(timer);

    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("timer").innerText = "0:00";
            alert("Exam Finished");
            return;
        }
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        document.getElementById("timer").innerText =
            min + ":" + (sec < 10 ? "0" : "") + sec;
        timeLeft--;
    }, 1000);
}
function submitExam() {
    clearInterval(timer);
    alert("Exam Submitted Successfully");
}
document.documentElement.requestFullscreen();
startTimer();
updateUI()