const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopWatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.times-list');

const body = document.querySelector('body')
const colorBtn = document.querySelector('.fa-paint-brush')
const questionBtn = document.querySelector('.fa-question');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');


let countTime
let minutes = 0
let seconds = 0
let timesArr = [];

const handleStart = () => {
    clearInterval(countTime);
    
    countTime = setInterval(() => {

        if(seconds < 9){
            seconds++;
            stopWatch.textContent = `${minutes}:0${seconds}`
        }else if(seconds >= 9 && seconds < 59){
            seconds++;
            stopWatch.textContent = `${minutes}:${seconds}`
        }else{
            minutes++;
            seconds = 0;
            stopWatch.textContent = `${minutes}:00`
        }

    }, 500);
}
const handleStop = () => {
    time.innerHTML = `Ostatni czas : ${stopWatch.textContent}`

    if(stopWatch.textContent !== '0:00'){
        time.style.visibility = 'visible'
        timesArr.push(stopWatch.textContent)
    }
    clearStuff()
}
const handlePause = () => {
    clearInterval(countTime);
}

const handleReset = () => {
    time.style.visibility = 'hidden'
    timesArr = [];
    clearStuff()
}
const clearStuff = () => {
    clearInterval(countTime);
    stopWatch.textContent = '0:00'
    timeList.textContent = '';
    seconds = 0;
    minutes = 0;
}
const showHistory = () => {

    timeList.textContent = '';
    let num = 1;
    timesArr.forEach(time => {
        const newTime = document.createElement('li')
        newTime.innerHTML = `Pomiar nr ${num} : <span>${time}</span>`
        timeList.appendChild(newTime)
        num++
    })
}

const showModal = () => {
    if(!(modalShadow.style.display === 'block')){
        modalShadow.style.display = 'block';
    }else{
        modalShadow.style.display = 'none';
    }
    modalShadow.classList.toggle('modal-animation')
}

const changeColor = () => {
    const first = Math.floor(Math.random() * 255)
    const second = Math.floor(Math.random() * 255)
    const three = Math.floor(Math.random() * 255)
    const rgbValue = `rgb(${first}, ${second}, ${three})`;
    body.style.setProperty('--first-color', rgbValue);
    body.style.setProperty('--second-color', rgbValue);
    
}
startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
resetBtn.addEventListener('click', handleReset)
historyBtn.addEventListener('click', showHistory)

colorBtn.addEventListener('click', changeColor)
questionBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal)
window.addEventListener('click', e => e.target === modalShadow ? showModal() : false)