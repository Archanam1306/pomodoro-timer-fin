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


let t2
const apply = document.querySelector('.apply')

function changeValues(value){
    clearInterval(pomodoroInterval)
    minutesLabel.innerHTML =value.toString().padStart(2,"0")
    secondsLabel.innerHTML = `00`
    console.log(value)
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
    modified.pomodoro = +e.target.value
    changeValues(modified.pomodoro)
})
shortBreakInput.addEventListener('input',function(e){
    modified.shortBreak = +e.target.value
    changeValues(modified.shortBreak)
})
longBreakTimeInput.addEventListener('input',function(e){
    modified.longBreak = +e.target.value
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
            minutesLabel.innerHTML =modified.pomodoro
            secondsLabel.innerHTML = `00`
            timerValue= modified.pomodoro * 60
            clearInterval(pomodoroInterval)
            time=modified.pomodoro
            multiplierFactor=360/timerValue
            t2=Math.floor(timerValue * multiplierFactor)
            circle.setAttribute('data-currentState',t2)
           
        }
        else if(e.target.classList.contains('active') && e.target.id == 'shortBreak' ){
            minutesLabel.innerHTML = modified.shortBreak.toString().padStart(2,0)
            secondsLabel.innerHTML = `00`
            timerValue= modified.shortBreak * 60
            clearInterval(pomodoroInterval)
            time=modified.shortBreak
            multiplierFactor=360/timerValue
            t2=Math.floor(timerValue * multiplierFactor)
            circle.setAttribute('data-currentState',t2)
        }
        else if(e.target.classList.contains('active') && e.target.id == 'longBreak' ){
            minutesLabel.innerHTML = modified.longBreak
            timerValue= modified.longBreak * 60
            secondsLabel.innerHTML = `00`
            clearInterval(pomodoroInterval)
            time=modified.longBreak
            multiplierFactor=360/timerValue
            t2=Math.floor(timerValue * multiplierFactor)
            circle.setAttribute('data-currentState',t2)
        }
        play.innerHTML = 'PLAY'
        paused = false 
        circle.style.background = `conic-gradient(var(--${modified.backgroundColor}) ${360}deg, var(--bg-body) 0deg)`;
    })
})


play.addEventListener('click',function(e){
    let newTime,seconds,temp
    temp = time
    console.log(timerValue)
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
        console.log(timerValue)
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
                    console.log('cleared', seconds)
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