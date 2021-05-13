var stopFlag = false;
var secCount = 10;
var carrotNum;
var bugNum;
var bugFlag = false;

const playBtn = document.querySelector(".game-btn");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const popup = document.querySelector("#layerPopup");
const popupText = popup.querySelector(".popup-text");
const tmplCont = document.querySelector(".play-area");
const countNum = document.querySelector(".count-num");
const replayBtn = document.querySelector(".replay-btn");

const alertAudio = new Audio('sound/alert.wav');
const bgAudio = new Audio('sound/bg.mp3');
const bugAudio = new Audio('sound/bug_pull.mp3');
const carrotAudio = new Audio('sound/carrot_pull.mp3');
const winAudio = new Audio('sound/game_win.mp3');

init();

playBtn.addEventListener("click", work);
replayBtn.addEventListener("click", (ev) => {
    init();
});

tmplCont.addEventListener("click", (ev) => {
    if (playBtn.classList.contains("play")) return; 

    if (ev.srcElement.className == "carrot") {
        ev.target.remove();
        carrotAudio.currentTime = 0;
        carrotAudio.play();

        carrotNum -= 1;
        countNum.innerHTML = carrotNum;

        if (carrotNum == 0) {
            pauseGame();
        }

        console.log(carrotNum);
    } else if (ev.srcElement.className == "bug") {
        bugFlag = true;
        bugAudio.currentTime = 0;
        bugAudio.play();
        pauseGame();
    }
});


function init() {
    secCount = 0;
    sec.innerHTML = `0${secCount}`;

    tmplCont.innerHTML = '';
    appendElement();

    bugFlag = false;
    popup.classList.remove("show");

    bgAudio.currentTime = 0;
}

function work() {
    if (this.classList.contains("play")) {
        if (carrotNum == 0 || popup.classList.contains("show")) init();
        // if (carrotNum > 0 && secCount > 0) return playGame();
        
        playGame();
    } else if (this.classList.contains("stop")) {
        pauseGame();
    }

    playTimer();
}

//당근, 벌레 랜덤으로 화면에 뿌리기
function appendElement() {
    carrotNum = parseInt(Math.random() * 10);
    bugNum = parseInt(Math.random() * 10);
    var carrotTmpl = '';
    var bugTmpl = '';

    console.log(carrotNum, bugNum);
    
    for (var i = 0; i < carrotNum; i++) {
        carrotTmpl += `<img src='img/hyun.jpeg' class="carrot">`
    }
    
    for (var i = 0; i < bugNum; i++) {
        bugTmpl += `<img src="img/bug.png" class="bug">`
    }
    
    tmplCont.innerHTML = carrotTmpl + bugTmpl;
    countNum.innerHTML = carrotNum;
    
    var carrot = document.querySelectorAll(".carrot");
    var bug = document.querySelectorAll(".bug");

    carrot.forEach((element) => {
        element.style.top = (Math.random() * 90) + '%';
        element.style.left = (Math.random() * 90) + '%';        
    });

    bug.forEach((element) => {
        element.style.top = (Math.random() * 90) + '%';
        element.style.left = (Math.random() * 90) + '%';        
    });
}

function playGame() {
    if (secCount == 0) secCount = 10;
    playBtn.classList.remove("play");
    playBtn.classList.add("stop");

    stopFlag = false;
    popup.classList.remove("show");
    bgAudio.play();
}

function pauseGame() {
    playBtn.classList.remove("stop");
    playBtn.classList.add("play");
    
    stopFlag = true;
    popup.classList.add("show");
    bgAudio.pause();

    if (secCount == 0 || bugFlag) {
        popupText.innerHTML = `져 - 쳐 💩`;
    } else if (secCount > 0 && carrotNum !== 0) {
        popupText.innerHTML = `replay`;
        alertAudio.currentTime = 0;
        alertAudio.play();
    } else if (secCount > 0 && carrotNum == 0){
        popupText.innerHTML = `혀니 다 잡음! YOU WIN 💕`;
        winAudio.currentTime = 0;
        winAudio.play();
    }

}

function playTimer() {
    let timer = setInterval(() => {
        if (!stopFlag) { //진행중
            secCount -= 1;
            sec.innerHTML = secCount >= 10 ? secCount : `0${secCount}`;

            if (secCount == 0) {
                stopFlag = true;
                sec.innerHTML = '00';

                clearInterval(timer);
                pauseGame();
            }
        } else { //일시정지
            sec.innerHTML = secCount >= 10 ? secCount : `0${secCount}`;
            clearInterval(timer);
        }
    }, 1000);
}