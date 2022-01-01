const timerEl = document.querySelector('[data-timer]');
const analogEl = document.querySelector('#analog')
const leftButtonEl = document.querySelector('[data-lap]');
const rightButtonEl = document.querySelector('[data-start]');
const recordsEl = document.querySelector('[data-laprecords]');
const mainEl = document.querySelector('[data-container]');
const rightDot = document.querySelector('#rightdot');
const leftDot = document.querySelector('#leftdot');
const toggle = document.querySelector('#checkbox')

const divEl1 = document.createElement('div');
const textEl1 = document.createElement('div');
const lapEl1 = document.createElement('div');

const secondsHand = document.querySelector('[data-secondsHand]');
const minutesHand = document.querySelector('[data-minutesHand]');

var timeInterval


// for digital clock
var displayMilliseconds
var displaySeconds
var displayMinutes
var displayHours

millisecondsTime = 0
secondsTime = 0
minutesTime = 0
hoursTime = 0

// for lap number and entries
var laptime;
var lap = 1

// for analog clock 
var secondsRatio
var minutesRatio


var millisecondsAccumulate = 0 
var secondsAccumulate = 0

checkbox.addEventListener('click', function(event) {
    event.preventDefault();
    if (analogEl.classList == "hide") {
    analogEl.classList.remove('hide');
    timerEl.classList.add('hide');
    leftDot.setAttribute("style","background-color:#333333")
    rightDot.setAttribute("style","background-color:#FFFFFF")
    } else {
    analogEl.classList.add('hide');
    timerEl.classList.remove('hide');
    leftDot.setAttribute("style","background-color:#FFFFFF")
    rightDot.setAttribute("style","background-color:#333333")
    }
})


rightButtonEl.addEventListener('click', function(event) {       //start and stop button
    var element = event.target
    addLap();
    if(element.matches("button")) {
        var state = element.getAttribute("data-state");
        console.log(state)
        if (state === "Start") {                                //condition switches "start" to "stop" using data attributes
            element.setAttribute("data-state","data-stop");
            element.textContent = "Stop";
            element.setAttribute("style","background-color:#320E0B; color:#FF453A;box-shadow:0 0 0 0.5vw #320E0B");
            leftButtonEl.setAttribute("data-state","data-lap"); //switches reset button 
            leftButtonEl.textContent = "Lap";
            startTimer()                                        //starts timer if button initially said stasrt
        } else {
            element.setAttribute("data-state","Start");
            element.setAttribute("style","background-color:#082A11; color:#2ED158;box-shadow:0 0 0 0.5vw #082A11")
            element.textContent = "Start";
            leftButtonEl.setAttribute("data-state","data-reset");//switches from lap to reset button if timer has started. 
            leftButtonEl.textContent = "Reset"
            clearTimeout(timeInterval)                           //pauses timer
        }
    }
})

leftButtonEl.addEventListener('click',function(event) {     // reset and lap button
    var element = event.target

    if(element.matches("button")) {
        var state = element.getAttribute("data-state")
        if (state === "data-lap") {
            addLap();                                       //adds lap to stopwatch if button is says lap
        } else {reset()}                                    //resets timer if button says reset
    }
})

function startTimer() {     //starts analog and digital timer
    timeInterval = setInterval(function() {
        millisecondsTime = millisecondsTime + 1
        if (millisecondsTime >= 100) {                      //every 100ms adds 1 second
            secondsTime++;
            millisecondsTime = 0;

            if (secondsTime >= 60) {                        //every 60 seconds adds 1 minute
                minutesTime++;
                secondsTime = 00;
                
                if(minutesTime >= 60) {                     //every 60 minutes adds 1 hour
                    hoursTime++;
                    minutesTime = 0;
                }
            }
        }
    
    
    //FOR ANALOG TIMER
    millisecondsAccumulate = millisecondsAccumulate + 1     
    secondsRatio = millisecondsAccumulate / 6000        

    secondsAccumulate= secondsAccumulate + 0.001
    minutesRatio = secondsAccumulate / 180

    setRotation(secondsHand, secondsRatio)                  //for seconds Hand moving
    setRotation(minutesHand, minutesRatio)                  //for minutes Hand moving
    
    // FOR DIGITAL TIMER
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
    lapTime.textContent = displayMinutes+":"+displaySeconds+"."+displayMilliseconds
    },10)
} 

function reset() {      //resets timer and analog display to zero 
//Resets display for Digital Timer
millisecondsTime = 0
secondsTime = 0
minutesTime = 0
hoursTime = 0

displayMilliseconds = "00"
displaySeconds = "00"
displayMinutes = "00"
displayHours = "00"

timerEl.textContent = displayMinutes+":"+displaySeconds+"."+displayMilliseconds;

//Resets display for Analog timer
secondsRatio = 0
minutesRatio = 0
millisecondsAccumulate = 0 
secondsAccumulate = 0
setRotation(secondsHand, secondsRatio);
setRotation(minutesHand, minutesRatio);

// Resets lap display
    for (var i = 0; i < lap; i++) {
    recordsEl.removeChild(recordsEl.childNodes[i]);
    }
}

function setRotation(element, rotationRatio) {      //allows for hand rotation in analog timer
    element.style.transform = "rotate(" + (rotationRatio*360 +270) + "deg)";
}

function addLap() {
    addLapDisplay();
    lap++
}

function addLapDisplay() {
    var lapRecord = recordsEl.appendChild(document.createElement("div"));
    var lapNumber = lapRecord.appendChild(document.createElement("div"));
    lapTime = lapRecord.appendChild(document.createElement("div"));

    lapRecord.setAttribute("class","row")
    lapRecord.setAttribute("style","padding: 2vh 3vw; border-bottom: 2px solid #1B1B1B; color:#FFFFFF; font-size: 1em")

    lapNumber.textContent = "Lap " + lap;
    
}
