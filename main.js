// MAIN MENU 
const elIndividuallyBtn = document.querySelector(".js-individually-btn");
const elMainMenu = document.querySelector(".js-main-menu");

// START MENU 
const elStartMenu = document.querySelector(".js-start-menu");
const elStartForm = elStartMenu.querySelector(".js-start-form");
const elStartLevel = elStartMenu.querySelector(".js-level-select");
const elStartTime = elStartMenu.querySelector(".js-time-select");

// QUESTION MENU
const elQuestionMenu = document.querySelector(".js-question-menu");
const elScore = elQuestionMenu.querySelector(".js-score");
const elAttempts = elQuestionMenu.querySelector(".js-attempts");
const elTime = elQuestionMenu.querySelector(".js-time");
const elQuestion = elQuestionMenu.querySelector(".js-question");
const elQuestionList = elQuestionMenu.querySelector(".js-test-list");
const elQuestionBox = elQuestionMenu.querySelector(".js-btn-box");

// GAME OVER 
const elGameOverBox = document.querySelector(".js-game-over-box");
const elGameOverImg = elGameOverBox.querySelector(".js-game-over-img")
const elGameOverScore = elGameOverBox.querySelector(".js-game-over-score");
const elGameOverAttempts = elGameOverBox.querySelector(".js-game-over-attempts");
const elGameOverTime = elGameOverBox.querySelector(".js-game-over-time");
const elGameOverBtn = elGameOverBox.querySelector(".js-over-again-btn");

// WIN 
const elWinBox = document.querySelector(".js-you-win-box");
const elWinScore = elWinBox.querySelector(".js-win-score");
const elWinAttempts = elWinBox.querySelector(".js-win-attempts");
const elWinTime = elWinBox.querySelector(".js-win-time");
const elWinBtn = elWinBox.querySelector(".js-win-again-btn");


elIndividuallyBtn.addEventListener("click", function(){
    elMainMenu.classList.add("d-none");
    elStartMenu.classList.remove("d-none");
});


function audio(type){
    const audio = new Audio();
    if(type == "error"){
        audio.src = '../audio/error.mp3';
    }
    if(type == "correct"){
        audio.src = '../audio/correct.mp3';
    }
    if(type == "game-over"){
        audio.src = '../audio/GameOver.mp3';
    }
    if(type == "win"){
        audio.src = '../audio/Win.mp3';
    }
    audio.autoplay = true;
}

let level = 21;
let time = 172800;
let attempts = 5;
let score = 0;

function addImgVisible(){
    elGameOverImg.classList.add("show-img")
}

function GameOver(timeText){
    audio("game-over");
    setTimeout(addImgVisible, 2500)
    elIndividuallyBtn.classList.add("d-none");
    elStartMenu.classList.add("d-none");
    elQuestionMenu.classList.add("d-none");
    elGameOverBox.classList.remove("d-none");

    elGameOverScore.textContent = `Score: ${score}`;
    elGameOverAttempts.textContent = `Attempts: ${attempts}`;
    elGameOverTime.textContent = `${timeText}`;
}

function Win(timeText){
    audio("win");
    elIndividuallyBtn.classList.add("d-none");
    elStartMenu.classList.add("d-none");
    elQuestionMenu.classList.add("d-none");
    elWinBox.classList.remove("d-none");

    elWinScore.textContent = `Score: ${score}`;
    elWinAttempts.textContent = `Attempts: ${attempts}`;
    elWinTime.textContent = `${timeText}`;
}

function updateTime(){
    if(time > 1000){
        elTime.innerHTML = `Осталось: 00:00`
    }
    else{
        let minuts = Math.floor(time / 60);2
        let second = time % 60;
        if(time == 0){
            clearInterval(SetIntervalId);
            GameOver("00:00");
        }
        
        if(minuts < 10){
            minuts = "0" + minuts
        }
        
        if(second < 10){
            second = "0" + second
        }
        elTime.innerHTML = `Осталось: ${minuts}:${second}`
        time--
    }
}
let SetIntervalId = setInterval(updateTime, 1000);

elScore.textContent = `Score: ${score}`
elAttempts.textContent = `Attempts: ${attempts}`

function updateScoreAndAttemptrs(){
    elScore.textContent = `Score: ${score}`
    elAttempts.textContent = `Attempts: ${attempts}`
}

function randomElements(arr){
    const randomArray = []
    for (let i = 0; i < level;) {
        const randomObj = arr[Math.floor(Math.random()*arr.length)]
        if(!randomArray.includes(randomObj)){
            randomArray.push(randomObj);
            i++
        }
    }
    return randomArray
}

// const randomArr = randomElements(roadSymbol);
const randomArr = [];
// const randomText = randomElements(randomArr);
const randomText = [];
const correctArr = [];

function renderText(){
    if(randomText.length == 0){
        clearInterval(SetIntervalId);   
        Win(elTime.innerHTML)
    }
    else{
        elQuestion.textContent = randomText[0].symbol_title;
    }
}

function renderArray(){
    elQuestionList.innerHTML = null;

    const elTestTemplate = document.querySelector(".js-test-template").content;
    const elTestFragment = new DocumentFragment()

    randomArr.forEach((item, i)=> {
        const elTestCloneTemp = elTestTemplate.cloneNode(true)

        elTestCloneTemp.querySelector(".js-btn-box").dataset.id = item.id;

        if(correctArr.includes(i)){
            elTestCloneTemp.querySelector(".js-btn-box").classList.add("box-disabled");
        }

        elTestCloneTemp.querySelector(".js-images").dataset.id = item.id;
        elTestCloneTemp.querySelector(".js-images").src = item.symbol_img;
        elTestCloneTemp.querySelector(".js-images").alt = item.symbol_title;

        elTestFragment.appendChild(elTestCloneTemp);
    })
    elQuestionList.appendChild(elTestFragment);
}

elStartForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    level = elStartLevel.value;
    if(elStartLevel.value == "easy"){
        level = 21
    }
    else if(elStartLevel.value == "medium"){
        level = 42
    }
    else if(elStartLevel.value == "hard"){
        level = 63
    }

    if(elStartTime.value == "3-min"){
        time = 180
    }
    else if(elStartTime.value == "8-min"){
        time = 480
    }
    else if(elStartTime.value == "10-min"){
        time = 600
    }

    elStartMenu.classList.add("d-none");
    elQuestionMenu.classList.remove("d-none");
    Array.prototype.push.apply(randomArr, randomElements(roadSymbol))
    Array.prototype.push.apply(randomText, randomElements(randomArr))
    renderArray();
    renderText();
});

function checkAttempts(){
    if(attempts == 0){
        clearInterval(SetIntervalId);
        GameOver(elTime.innerHTML)
    }
}

const parentElement = Node.parentElement;
elQuestionList.addEventListener("click", function(evt){
    if(evt.target.matches(".js-btn-box") || evt.target.matches(".js-images")){
        if(evt.target.dataset.id == randomText[0].id){
            if(evt.target.matches(".js-btn-box")){
                evt.target.classList.add("correct", "bg-success");
            }
            else{
                evt.target.parentElement.classList.add("correct", "bg-success")
            }
            const answerId = randomArr.findIndex(item => item.id == evt.target.dataset.id)
            correctArr.push(answerId); //OR correctArr.push(evt.target.dataset.id);
            score +=2;

            updateScoreAndAttemptrs();
            checkAttempts();
            randomText.splice(0, 1);
            renderText();
            if(randomText.length > 0){
                audio("correct")
            }
            setTimeout(renderArray, 1600);
        }
        else{
            if(evt.target.className.indexOf("wrong") == -1){                
                if(evt.target.matches(".js-btn-box")){
                    evt.target.classList.add("wrong", "bg-danger");
                }
                else{
                    evt.target.parentElement.classList.add("wrong", "bg-danger")
                    evt.target.classList.add("wrong");
                }
                score--
                attempts--
                updateScoreAndAttemptrs();
                checkAttempts();
                if(attempts > 0){
                    audio("error");
                }
            }
        }
    }
})

elGameOverBtn.addEventListener("click", function(){
    window.location.reload();
});
elWinBtn.addEventListener("click", function(){
    window.location.reload();
});