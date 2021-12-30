const timerEl = document.querySelector('[data-timer]');
const leftButtonEl = document.querySelector('[data-lap]');
const rightButtonEl = document.querySelector('[data-start]');
const recordsEl = document.querySelector('[data-laprecords]');
const lapRecordEl1 = document.createElement('div');

var displayMilliseconds
var displayMilliseconds
var displayMinutes
var displayHours

rightButtonEl.addEventListener('click', function() {
    startTimer();
})

function startTimer() {
    var millisecondsTime = 0
    var secondsTime = 55
    var minutesTime = 59
    var hoursTime = 0
    
    var timeInterval = setInterval(function() {
        millisecondsTime = millisecondsTime + 1
        if (millisecondsTime >= 100) {
            secondsTime++;
            millisecondsTime = 0;

            if (secondsTime >= 60) {
                minutesTime++;
                secondsTime = 0;
                
                if(minutesTime >= 60) {
                    hoursTime++;
                    minutesTime = 0;
                }
            }
        }

    if(millisecondsTime <= 9) {
        displayMilliseconds = "0" + millisecondsTime.toString();
    } else {
        displayMilliseconds = millisecondsTime
    }
    if(secondsTime <= 9) {
        displaySeconds = "0" + secondsTime.toString();
    } else {
        displaySeconds = secondsTime
    }
    if(minutesTime <= 9) {
        displayMinutes = "0" + minutesTime.toString();
    } else {
        displayMinutes = minutesTime
    }
    if(hoursTime <= 9) {
        displayHours = "0" + hoursTime.toString();
    } else {
        displayHours = hoursTime
    }
    if (hoursTime == 0) {
    timerEl.textContent = displayMinutes+":"+displaySeconds+"."+displayMilliseconds;
    } else {
        timerEl.textContent = displayHours+":"+displayMinutes+":"+displaySeconds+"."+displayMilliseconds;
        timerEl.setAttribute("style","font-size: 16.5vw")
    }
        
    },1)
} 

