const timerEl = document.querySelector('[data-timer]');
const leftButtonEl = document.querySelector('[data-lap]');
const rightButtonEl = document.querySelector('[data-start]');
const recordsEl = document.querySelector('[data-laprecords]');
const lapRecordEl1 = document.createElement('div');

var timeInterval

var displayMilliseconds
var displayMilliseconds
var displayMinutes
var displayHours

var millisecondsTime
var secondsTime
var minutesTime
var hoursTime

rightButtonEl.addEventListener('click', function(event) {
    var element = event.target

    if(element.matches("button")) {
        var state = element.getAttribute("data-state");
        console.log(state)
        if (state === "Start") {
            element.setAttribute("data-state","data-stop");
            element.textContent = "Stop";
            element.setAttribute("style","background-color:#320E0B; color:#FF453A;box-shadow:0 0 0 0.5vw #320E0B");
            startTimer()
        } else {
            element.setAttribute("data-state","Start");
            element.setAttribute("style","background-color:#082A11; color:#2ED158;box-shadow:0 0 0 0.5vw #082A11")
            element.textContent = "Start";
            clearTimeout(timeInterval)
        }
    }
})

function startTimer() { 
    millisecondsTime = 0
    secondsTime = 0
    minutesTime = 0
    hoursTime = 0
    timeInterval = setInterval(function() {
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

