const btn_options= document.querySelectorAll('.options button')
const minutesLabel= document.querySelector('.minutes')
const secondsLabel= document.querySelector('.seconds')

const play = document.querySelector('.action')
let time =25 
let pomodoroInterval
let pomodoro = 25
let shortBreak = 5
let longBreak =15
let paused = false

let timerValue = 60 * pomodoro;
let multiplierFactor = 360 / timerValue;

btn_options.forEach(btn=>{
    btn.addEventListener('click',function(e){
        btn_options.forEach(btn=>{
            if(btn.classList.contains('active')){
                btn.classList.remove('active')
            }
        })
        e.target.classList.add('active')
        if(e.target.classList.contains('active') && e.target.id == 'pomodoro' ){
            minutesLabel.innerHTML =pomodoro
            secondsLabel.innerHTML = `00`
            timerValue= pomodoro * 60
            clearInterval(pomodoroInterval)
            time=25
        }
        else if(e.target.classList.contains('active') && e.target.id == 'shortBreak' ){
            minutesLabel.innerHTML = shortBreak
            secondsLabel.innerHTML = `00`
            timerValue= shortBreak * 60
            clearInterval(pomodoroInterval)
            time=5
        }
        else if(e.target.classList.contains('active') && e.target.id == 'longBreak' ){
            minutesLabel.innerHTML = longBreak
            timerValue= longBreak * 60
            secondsLabel.innerHTML = `00`
            clearInterval(pomodoroInterval)
            time=15
        }
    })
})

const circle = document.querySelector('.circle')
play.addEventListener('click',function(e){
    let newTime,seconds,temp,t2
    temp = time
    multiplierFactor=360/timerValue
    t2=Math.floor(timerValue * multiplierFactor)
    if(paused){
        play.innerHTML = 'PLAY'
        paused = false
        timerValue=+document.querySelector('.circle').getAttribute('data-currentState')
        t2=timerValue
        clearInterval(pomodoroInterval)
    }
    else{
        paused = true 
        play.innerHTML = 'PAUSE'
        // 
        newTime =+document.querySelector('.minutes').innerHTML < time ? +document.querySelector('.minutes').innerHTML : time-1
        seconds =+document.querySelector('.seconds').innerHTML == 0 ? 59 : +document.querySelector('.seconds').innerHTML

        console.log(t2)
        if(newTime == 0){
            newTime = temp-1
        }
        minutesLabel.innerHTML = newTime.toString().padStart(2,"0")
        secondsLabel.innerHTML= seconds.toString().padStart(2,"0")
        let timerFunction=()=>{
            console.log(t2)
            // minutesLabel.innerHTML = newTime.toString().padStart(2,"0")
            // secondsLabel.innerHTML= seconds.toString().padStart(2,"0")
          
           
            seconds = seconds - 1
            timerValue--
            if(seconds == 0){
              
                if(newTime != 0){
                    newTime = newTime - 1
                    seconds=59
                  
                }else{
                    console.log('cleared', seconds)
                    play.innerHTML = 'PLAY'
                    paused = false
                    time=temp

                    clearInterval(pomodoroInterval)
                  
                }
                
                
            }
             minutesLabel.innerHTML = newTime.toString().padStart(2,"0")
             secondsLabel.innerHTML= seconds.toString().padStart(2,"0")
             circle.setAttribute('data-currentState',timerValue * multiplierFactor)
             circle.style.background = `conic-gradient(var(--default) ${Math.floor(timerValue * multiplierFactor)}deg, var(--bg-body) 0deg)`;
        }
        pomodoroInterval= setInterval(timerFunction ,1000)
    }
    
}) 