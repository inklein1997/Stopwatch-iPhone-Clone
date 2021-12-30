const timerEl = document.querySelector('[data-timer]');
const leftButtonEl = document.querySelector('[data-lap]');
const rightButtonEl = document.querySelector('[data-start]');
const recordsEl = document.querySelector('[data-laprecords]');
const lapRecordEl1 = document.createElement('div');

var time = 0

rightButtonEl.addEventListener('click', function() {
    startTimer();
})

function startTimer() {
    var millisecondsTime = 0
    var secondsTime = 0
    var minutesTime = 0
    
    var timeInterval = setInterval(function() {
        millisecondsTime = millisecondsTime + 1
        if (millisecondsTime >= 100) {
            secondsTime = secondsTime + 1;
            millisecondsTime = 0;
        }
        if (secondsTime >= 60) {
            minutesTime = minutesTime + 1;
            secondsTime = 0;
        }
        timerEl.textContent = minutesTime + ":" + secondsTime + "." + millisecondsTime
    },10)
} 

