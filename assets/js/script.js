const timerEl = document.querySelector('[data-timer]');
const leftButtonEl = document.querySelector('[data-lap]');
const rightButtonEl = document.querySelector('[data-start]');
const recordsEl = document.querySelector('[data-laprecords]');
const mainEl = document.querySelector('[data-container]')
const divEl1 = document.createElement('div');
const textEl1 = document.createElement('div');
const lapEl1 = document.createElement('div');

var timeInterval

var displayMilliseconds
var displaySeconds
var displayMinutes
var displayHours

millisecondsTime = 0
secondsTime = 0
minutesTime = 0
hoursTime = 0

rightButtonEl.addEventListener('click', function(event) {
    var element = event.target

    if(element.matches("button")) {
        var state = element.getAttribute("data-state");
        console.log(state)
        if (state === "Start") {
            element.setAttribute("data-state","data-stop");
            element.textContent = "Stop";
            element.setAttribute("style","background-color:#320E0B; color:#FF453A;box-shadow:0 0 0 0.5vw #320E0B");
            leftButtonEl.setAttribute("data-state","data-lap");
            leftButtonEl.textContent = "Lap";
            startTimer()
        } else {
            element.setAttribute("data-state","Start");
            element.setAttribute("style","background-color:#082A11; color:#2ED158;box-shadow:0 0 0 0.5vw #082A11")
            element.textContent = "Start";
            leftButtonEl.setAttribute("data-state","data-reset");
            leftButtonEl.textContent = "Reset"
            clearTimeout(timeInterval)
        }
    }
})

leftButtonEl.addEventListener('click',function(event) {
    var element = event.target

    if(element.matches("button")) {
        var state = element.getAttribute("data-state")
        if (state === "data-lap") {
            addLap();
        } else {reset()}
    }
})

function startTimer() { 
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
        
    },10)
    addLap()
} 

function reset() {
millisecondsTime = 0
secondsTime = 0
minutesTime = 0
hoursTime = 0

displayMilliseconds = "00"
displayMilliseconds = "00"
displayMinutes = "00"
displayHours = "00"
timerEl.textContent = displayMinutes+":"+displaySeconds+"."+displayMilliseconds;
}

function addLap() {
    addLapDisplay();
}

function addLapDisplay() {
    mainEl.setAttribute("style","border-bottom:none;")
    divEl1.setAttribute("class","row")
    divEl1.setAttribute("style","padding: 2vh 3vw; border-top: 2px solid #1B1B1B; border-bottom: 2px solid #1B1B1B; color:#FFFFFF; font-size: 3vw")
    textEl1.textContent = "Lap 1"
    lapEl1.textContent = displayMinutes+":"+displaySeconds+"."+displayMilliseconds

    recordsEl.appendChild(divEl1);
    divEl1.appendChild(textEl1);
    divEl1.appendChild(lapEl1);
}