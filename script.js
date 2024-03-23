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