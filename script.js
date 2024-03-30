const btn_options= document.querySelectorAll('.options button')
const minutesLabel= document.querySelector('.minutes')
const secondsLabel= document.querySelector('.seconds')
const circle = document.querySelector('.circle')

const play = document.querySelector('.action')

const settings = document.getElementById('settings')
const template1 = document.getElementById('popup')

let pomodoroInterval
let time =25 
let paused = false
const modified={
    fontFamily:'Space Mono',
    backgroundColor:'default',
    pomodoro:25,
    shortBreak:5,
    longBreak:15
}
let timerValue = 60 * modified.pomodoro;
let multiplierFactor = 360 / timerValue;

const pomodorInput = document.getElementById('pomodoroTime')
const shortBreakInput = document.getElementById('shortBreakTime')
const longBreakTimeInput = document.getElementById('longBreakTime')


const incrementBtn = document.querySelectorAll('.top')
const decreaseBtn = document.querySelectorAll('.bottom')

let t2
const apply = document.querySelector('.apply')

incrementBtn.forEach(btn=>{
   btn.addEventListener('click',function(e){
      
        if(e.target.parentElement.parentElement.previousElementSibling.getAttribute('id')== 'pomodoroTime' && +document.getElementById('pomodoroTime').value < 99){
           +document.getElementById('pomodoroTime').value++
            modified.pomodoro = +document.getElementById('pomodoroTime').value
            changeValues(modified.pomodoro)
        }
        else if(e.target.parentElement.parentElement.previousElementSibling.getAttribute('id')== 'shortBreakTime' && +document.getElementById('shortBreakTime').value < 99){
            +document.getElementById('shortBreakTime').value++
            modified.shortBreak = +document.getElementById('shortBreakTime').value
            changeValues(modified.shortBreak)
        }
        else if(e.target.parentElement.parentElement.previousElementSibling.getAttribute('id')== 'longBreakTime' && +document.getElementById('longBreakTime').value < 99){
            +document.getElementById('longBreakTime').value++
            modified.longBreak = +document.getElementById('longBreakTime').value
            changeValues(modified.longBreak)
        }
    })
})
decreaseBtn.forEach(btn=>{
    btn.addEventListener('click',function(e){
       
         if(e.target.parentElement.parentElement.previousElementSibling.getAttribute('id')== 'pomodoroTime' && +document.getElementById('pomodoroTime').value > 1){
            +document.getElementById('pomodoroTime').value--
             modified.pomodoro = +document.getElementById('pomodoroTime').value
             changeValues(modified.pomodoro)
          
         }
         else if(e.target.parentElement.parentElement.previousElementSibling.getAttribute('id')== 'shortBreakTime' && +document.getElementById('shortBreakTime').value > 1){
             +document.getElementById('shortBreakTime').value--
             modified.shortBreak = +document.getElementById('shortBreakTime').value
             changeValues(modified.shortBreak)
         }
         else if(e.target.parentElement.parentElement.previousElementSibling.getAttribute('id')== 'longBreakTime' && +document.getElementById('longBreakTime').value > 1){
             +document.getElementById('longBreakTime').value--
             modified.longBreak = +document.getElementById('longBreakTime').value
             changeValues(modified.longBreak)
         }
     })
 })
 function resetTimer() {
    clearInterval(pomodoroInterval);
    paused = false;
    play.innerHTML = 'PLAY';

    // Reset time based on the currently active option
    let option = document.querySelector('.options button.active');
    if (option) {
        if (option.id === 'pomodoro') {
            time = modified.pomodoro;
        } else if (option.id === 'shortBreak') {
            time = modified.shortBreak;
        } else if (option.id === 'longBreak') {
            time = modified.longBreak;
        }
    }

    timerValue = time * 60;
    multiplierFactor = 360 / timerValue;
    t2 = Math.floor(timerValue * multiplierFactor);
    circle.setAttribute('data-currentState', t2);
    minutesLabel.innerHTML = time.toString().padStart(2, "0");
    secondsLabel.innerHTML = "00";
    circle.style.background = `conic-gradient(var(--${modified.backgroundColor}) ${+circle.getAttribute('data-currentState')}deg, var(--bg-body) 0deg)`;
}

document.addEventListener('DOMContentLoaded', function() {
    resetTimer(); // Call resetTimer when the DOM is loaded

    // Add event listener to the reset button
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', resetTimer);
});

function changeValues(value){
    clearInterval(pomodoroInterval)
    
    if(document.querySelector('.options button.active').getAttribute('id') == 'pomodoro'){
        minutesLabel.innerHTML =modified.pomodoro.toString().padStart(2,"0")
        secondsLabel.innerHTML = `00`
    }
    else if(document.querySelector('.options button.active').getAttribute('id') == 'shortBreak'){
        minutesLabel.innerHTML =modified.shortBreak.toString().padStart(2,"0")
        secondsLabel.innerHTML = `00`
    }
    else if(document.querySelector('.options button.active').getAttribute('id') == 'longBreak'){
        minutesLabel.innerHTML =modified.longBreak.toString().padStart(2,"0")
        secondsLabel.innerHTML = `00`
    }
    timerValue= value * 60
    time=value
    multiplierFactor=360/timerValue
    t2=Math.floor(timerValue * multiplierFactor)
    play.innerHTML = 'PLAY'
    paused = false 
    circle.setAttribute('data-currentState',t2)
    circle.style.background = `conic-gradient(var(--${modified.backgroundColor}) ${360}deg, var(--bg-body) 0deg)`;
}
pomodorInput.addEventListener('input',function(e){
    if(+e.target.value > 1){
        modified.pomodoro = +e.target.value
    }else{
        modified.pomodoro = 1
        e.target.value = 1
    }
  
    changeValues(modified.pomodoro)
})
shortBreakInput.addEventListener('input',function(e){

    if(+e.target.value > 1){
        modified.shortBreak = +e.target.value
    }else{
        modified.shortBreak = 1
        e.target.value = 1
    }
    changeValues(modified.shortBreak)
})
longBreakTimeInput.addEventListener('input',function(e){
    if(+e.target.value > 1){
         modified.longBreak = +e.target.value
    }else{
         modified.longBreak = 1
        e.target.value = 1
    }
   
    changeValues(modified.longBreak)
})
apply.addEventListener('click',function(){
    document.body.style.fontFamily =modified.fontFamily
    document.querySelector('.modal').classList.remove('modalActive')
    document.body.removeAttribute('class')
    document.body.classList.add(modified.backgroundColor)
    circle.style.background = `conic-gradient(var(--${modified.backgroundColor}) ${+circle.getAttribute('data-currentState')}deg, var(--bg-body) 0deg)`;
})
const close = document.querySelector('.close')
close.addEventListener('click',function(){
    document.querySelector('.modal').classList.remove('modalActive')
})
const fontBtns = document.querySelectorAll('.font__family button')

fontBtns.forEach(btn=>{
        btn.addEventListener('click',function(e){
            fontBtns.forEach(btn=>{
                if(btn.classList.contains('fontActive')){
                    btn.classList.remove('fontActive')
                }
            })
            e.target.classList.add('fontActive')

            modified.fontFamily=e.target.getAttribute('data-fontFamily')
        })
})
const colorBtns = document.querySelectorAll('.color__container button')
colorBtns.forEach(btn=>{
    btn.addEventListener('click',function(e){
        colorBtns.forEach(btn=>{
            if(btn.classList.contains('colorActive')){
                btn.classList.remove('colorActive')
            }
        })
        e.target.classList.add('colorActive')
        modified.backgroundColor=e.target.getAttribute('data-color')
    })
})
settings.addEventListener('click',function(){
    document.querySelector('.modal').classList.add('modalActive')
})
btn_options.forEach(btn=>{
    btn.addEventListener('click',function(e){
        btn_options.forEach(btn=>{
            if(btn.classList.contains('active')){
                btn.classList.remove('active')
            }
        })
        e.target.classList.add('active')
        if(e.target.classList.contains('active') && e.target.id == 'pomodoro' ){

            changeValues(modified.pomodoro)
        }
        else if(e.target.classList.contains('active') && e.target.id == 'shortBreak' ){
            changeValues(modified.shortBreak)
        }
        else if(e.target.classList.contains('active') && e.target.id == 'longBreak' ){
         
            changeValues(modified.longBreak)
        }
     
    })
})
document.addEventListener('DOMContentLoaded', function() {
    // Function to store session data in local storage
    function storeSessionData(sessionData) {
        let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
        sessions.push(sessionData);
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }

    // Function to display historical data
    function displayHistoricalData() {
        let sessions = JSON.parse(localStorage.getItem('sessions')) || [];
        let historicalList = document.getElementById('historicalList');
        historicalList.innerHTML = '';

        sessions.forEach(session => {
            let li = document.createElement('li');
            li.textContent = `Type: ${session.type}, Start Time: ${session.startTime}, End Time: ${session.endTime}, Duration: ${session.duration}ms`;
            historicalList.appendChild(li);
        });
    }

    // Example: Call this function when a session ends
    function endSession(sessionType, startTime, endTime) {
        let duration = endTime - startTime;
        let sessionData = { type: sessionType, startTime: startTime, endTime: endTime, duration: duration };
        storeSessionData(sessionData);
        displayHistoricalData();
    }

    // Example: Call this function when a Pomodoro session ends
    function pomodoroEnd(startTime, endTime) {
        console.log('Pomodoro start time:', startTime);
        console.log('Pomodoro end time:', endTime);
        endSession('Pomodoro', startTime, endTime);
    }

    // Example: Call this function when a short break session ends
    function shortBreakEnd(startTime, endTime) {
        console.log('Short break start time:', startTime);
        console.log('Short break end time:', endTime);
        endSession('Short Break', startTime, endTime);
    }

    // Example: Call this function when a long break session ends
    function longBreakEnd(startTime, endTime) {
        console.log('Long break start time:', startTime);
        console.log('Long break end time:', endTime);
        endSession('Long Break', startTime, endTime);
    }

    // Call functions to display historical data on page load
    displayHistoricalData();
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to update the session count
    function updateSessionCount() {
        let sessionCount = parseInt(localStorage.getItem('sessionCount')) || 0;
        sessionCount++;
        localStorage.setItem('sessionCount', sessionCount);
        document.getElementById('sessionCount').textContent = sessionCount;
    }

    // Call the function to update session count whenever a session ends
    function onSessionEnd() {
        // Call updateSessionCount function
        updateSessionCount();
    }

    // Example: Assume there's a function called endSession() that is called when a session ends
    // Replace this with your actual implementation of ending a session
    function endSession() {
        // Call onSessionEnd() when a session ends
        onSessionEnd();
    }

    // Example: Call endSession() when a Pomodoro session ends
    // Replace this with your actual implementation
    function pomodoroEnd() {
        // Call endSession() when a Pomodoro session ends
        endSession();
    }

    // Example: Call pomodoroEnd() when a Pomodoro session is completed
    // Replace this with your actual implementation of detecting Pomodoro session completion
    function detectPomodoroCompletion() {
        // Call pomodoroEnd() when a Pomodoro session is completed
        pomodoroEnd();
        
    }

    // Add similar functions to handle short break and long break session completion

    // Example: Call detectPomodoroCompletion() when a Pomodoro session is completed
    // Replace this with your actual implementation of detecting Pomodoro session completion
    detectPomodoroCompletion();
    
});

play.addEventListener('click',function(e){
    let newTime,seconds,temp
    temp = time

    if(paused){
        play.innerHTML = 'PLAY'
        paused = false
        clearInterval(pomodoroInterval)
    }
    else{
        paused = true 
        play.innerHTML = 'PAUSE'
        newTime =+document.querySelector('.minutes').innerHTML < time ? +document.querySelector('.minutes').innerHTML : time-1
        seconds =+document.querySelector('.seconds').innerHTML == 0 ? 59 : +document.querySelector('.seconds').innerHTML
        timerValue= +circle.getAttribute('data-currentState') == timerValue ? +circle.getAttribute('data-currentState') :  timerValue--
        if(newTime == 0){
            newTime = temp-1
        }
        minutesLabel.innerHTML = newTime.toString().padStart(2,"0")
        secondsLabel.innerHTML= seconds.toString().padStart(2,"0")
        let timerFunction=()=>{

            seconds = seconds - 1
            timerValue--
            if(seconds == 0){
              
                if(newTime != 0){
                    newTime = newTime - 1
                    seconds=59
                
                }else{
            
                    play.innerHTML = 'PLAY'
                    paused = false
                    time=temp
                    timerValue = time * 60
                    multiplierFactor=360/timerValue
                    t2=Math.floor(timerValue * multiplierFactor)
                    circle.setAttribute('data-currentState',t2)
                    clearInterval(pomodoroInterval)
                  
                }
                
            }
           
            minutesLabel.innerHTML = newTime.toString().padStart(2,"0")
            secondsLabel.innerHTML= seconds.toString().padStart(2,"0")
            circle.setAttribute('data-currentState',timerValue * multiplierFactor)
            circle.style.background = `conic-gradient(var(--${modified.backgroundColor}) ${+circle.getAttribute('data-currentState')}deg, var(--bg-body) 0deg)`;
        }
        pomodoroInterval= setInterval(timerFunction ,1000)
    }
    
})
 