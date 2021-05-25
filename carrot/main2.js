'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect(); //field의 전체적 사이즈와 포지션까지 확인가능

const gameBtn = document.querySelector(".game_button");
const gameTimer = document.querySelector(".game_timer");
const gameScore = document.querySelector(".game_score");

const popup = document.querySelector("#layerPopup");
const popupText = popup.querySelector(".popup-text");
const popupRefresh = popup.querySelector(".replay-btn");

const carrotSound = new Audio('sound/carrot_pull.mp3');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFieldClick);
popupRefresh.addEventListener("click", () => {
    startGame();
    hidePopup();
});
gameBtn.addEventListener("click", () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();   
    hideGameButton();
    hideTimerAndScore();
    showPopupWithText('REPLAY👌🏻');
    hidePopup();
    stopSound(bgSound);
    playSound(alertSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    showPopupWithText(win? 'YOU WON' : 'YOU LOST‼️');

    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }

    stopSound(bgSound);
}

function showStopButton() {
    gameBtn.classList.add("stop");
    gameBtn.classList.remove('play');
}

function hideGameButton() {
    gameBtn.classList.add("play");
    gameBtn.classList.remove('stop');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function hideTimerAndScore() {
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
}

function startGameTimer() { //타이머동작
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }

        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);  
}

function showPopupWithText(text) {
    popup.style.visibility = 'visible';
    popupText.innerText = text;
}

function hidePopup() {
    popup.style.visibility = 'hidden';
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() { //벌레와 당근을 생성한 뒤 field에 추가해줌
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;

    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
}

function onFieldClick(event) {
    if (!started) return;

    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if (score == CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        stopGameTimer();
        finishGame(false);
    }

}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }

}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


