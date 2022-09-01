//QUERY SELECTORS
//
const soft = document.querySelector('#soft-boiled-egg');
const medium = document.querySelector('#medium-boiled-egg');
const hard = document.querySelector('#hard-boiled-egg');
const softImg = document.querySelector('#soft-boiled-img');
const mediumImg = document.querySelector('#medium-boiled-img');
const hardImg = document.querySelector('#hard-boiled-img');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const smallSize = document.querySelector('#small');
const mediumSize = document.querySelector('#medium');
const largeSize = document.querySelector('#large');
startBtn.disabled = true;
//FUNCTIONS
//

function startBtnEnabled(){
    if(minutes.innerText > 0){
        startBtn.disabled = false;
    }
}

function playAudio(url){
    const audio = new Audio(`${url}`)
    audio.play();
}

function countdownTimer(){
    let time = parseInt(minutes.innerText);
    let fullTime = (time * 60) - 1;
    const timer = setInterval(() =>{
        let timerMinutes = Math.floor(fullTime/60);
        let timerSeconds = fullTime % 60;
        if(timerSeconds < 10){
            timerSeconds = '0' + timerSeconds;
        }
        minutes.innerText = `${timerMinutes}`;
        seconds.innerText = `${timerSeconds}`;
        fullTime--
        playAudio('https://cdn.freesound.org/previews/174/174721_3034894-lq.mp3')
        if(fullTime < 0){
            clearInterval(timer);
            playAudio('https://cdn.freesound.org/previews/198/198841_285997-lq.mp3')
        }
    },1000);
}

function removeSelected(firstEgg, secondEgg, thirdEgg, classes) {
    if(firstEgg.classList.contains(classes)){
        secondEgg.classList.remove(classes);
        thirdEgg.classList.remove(classes);
    }
}

function sizeTimer(softTime, mediumTime, hardTime) {
    if (softImg.classList.contains('selected')) {
        minutes.innerText = `${softTime}`;
    } else if (mediumImg.classList.contains('selected')) {
        minutes.innerText = `${mediumTime}`;
    } else if (hardImg.classList.contains('selected')) {
        minutes.innerText = `${hardTime}`;
    }
}

function typeTimer(smallTime, mediumTime, largeTime) {
    if (smallSize.classList.contains('selectedSize')) {
        minutes.innerText = `${smallTime}`;
    } else if (mediumSize.classList.contains('selectedSize')) {
        minutes.innerText = `${mediumTime}`;
    } else if (largeSize.classList.contains('selectedSize')) {
        minutes.innerText = `${largeTime}`;
    }
}

//YOLK CONGEAL CHOICE
//
soft.addEventListener('click', () =>{
    softImg.classList.add('selected');
    removeSelected(softImg, mediumImg, hardImg, 'selected');
    typeTimer(4, 5, 6);
});
medium.addEventListener('click', () =>{
    mediumImg.classList.add('selected');
    removeSelected(mediumImg, softImg, hardImg, 'selected');
    typeTimer(5, 6, 8);
});
hard.addEventListener('click', () =>{
    hardImg.classList.add('selected');
    removeSelected(hardImg, softImg, mediumImg, 'selected');
    typeTimer(7, 8, 9);
});

//SIZES
//
smallSize.addEventListener('click', () => {
    smallSize.classList.add('selectedSize');
    removeSelected(smallSize, mediumSize, largeSize, 'selectedSize');
    sizeTimer(4, 5, 7);
    startBtnEnabled()
});
mediumSize.addEventListener('click', () => {
    mediumSize.classList.add('selectedSize');
    removeSelected(mediumSize, smallSize, largeSize, 'selectedSize');
    sizeTimer(5, 6, 8);
    startBtnEnabled()
});
largeSize.addEventListener('click', () => {
    largeSize.classList.add('selectedSize');
    removeSelected(largeSize, mediumSize, smallSize, 'selectedSize');
    sizeTimer(6, 8, 9);
    startBtnEnabled()
});

// BUTTONS
//
resetBtn.addEventListener('click', () =>{
    window.location.reload();
})
startBtn.addEventListener('click', () =>{
    playAudio('https://cdn.freesound.org/previews/185/185609_349289-lq.mp3');
    countdownTimer();
    startBtn.disabled = true;
    soft.disabled = true;
    medium.disabled = true;
    hard.disabled = true;
    largeSize.disabled = true;
    mediumSize.disabled = true;
    smallSize.disabled = true;
})