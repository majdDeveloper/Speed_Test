// Create array Content words 
let words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "LeetCode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

// According to the degree of difficulty
let easyWords = [];
let normalWords = [];
let hardWords = [];
words.forEach((word) => {
    word.length <= 4 ? easyWords.push(word) : word.length > 4 & word.length <= 6 ? normalWords.push(word) : hardWords.push(word);
})
// Setting Levels
let levels = {
    "Easy": 7,
    "Normal": 5,
    "Hard": 3
};

// Default Level
let defaultLevelName = "Easy";
let defaultLevelSeconds = levels[defaultLevelName];

// catch Selectors
let startButton = document.querySelector(".start");
let levelName = document.querySelector(".massage .lvl");
let levelSeconds = document.querySelector(".massage .seconds");
let word = document.querySelector(".the-word");
let inputWord = document.querySelector(".input");
let upcomingWord = document.querySelector(".upcoming-word");
let timeLeftSpan = document.querySelector(".control .time span");
let scoreGot = document.querySelector(".control .score .got");
let scoreTotal = document.querySelector(".control .score .total");
let finishMessage = document.querySelector(".finish");
let select = document.querySelector("select");

// if change level  
select.onchange = () => {
    defaultLevelName = select.value;
    defaultLevelSeconds = levels[defaultLevelName];
    levelName.innerHTML = defaultLevelName; 
    levelSeconds.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = select.value.length+1;
}

// Setting Level Name + Seconds + Score
levelName.innerHTML = defaultLevelName; 
levelSeconds.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = select.value.length+1;

// input paste Event
inputWord.onpaste = (() => false);

// Start Game
startButton.onclick =  () => {
    startButton.remove();
    inputWord.focus();
// Catch genWords function
    genWords();
}

function genWords () {

    // show Word According to the degree of difficulty
    (select.value == "Easy") ? words = easyWords: select.value == "Normal" ? words = normalWords : words = hardWords;

    // clear upcomingWord content
    upcomingWord.innerHTML = "";

    // Get word random
    let wordRandom = words[Math.floor((Math.random()) * words.length)];

        // Get Index word random
    let indexWordRandom = words.indexOf(wordRandom);

    // Remove the word random
    words.splice(indexWordRandom, 1);
    word.innerHTML = wordRandom;

    // Create Word content upcomingWord 
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        let textDiv = document.createTextNode(words[i]);
        div.appendChild(textDiv);
        upcomingWord.appendChild(div)
    }

    // Catch StartPlay function
    StartPlay();
}

function StartPlay () {

    // Change Number Of seconds
    timeLeftSpan.innerHTML = defaultLevelSeconds;

    // countdown time Write
    let countdown = setInterval(() => {
        timeLeftSpan.innerHTML--;

        // countdown if seconds = 0
        if(timeLeftSpan.innerHTML == 0) {
            clearInterval(countdown);
            if(word.innerHTML.toLowerCase() === inputWord.value.toLowerCase()) {
                scoreGot.innerHTML++;
                inputWord.value = "";
                if (words.length > 0) {

                    // Catch genWords function
                    genWords();

                } else {
                    
                    // Create Good Massage To Me User
                    let divBad = document.createElement("div");
                    divBad.className = "good";
                    let textDivBad = document.createTextNode("Congratulations");
                    divBad.appendChild(textDivBad);
                    finishMessage.appendChild(divBad);

                    // Catch playAgin function
                    playAgin();
                }
            } else {
                // Create Bad Massage To Me User
                let divBad = document.createElement("div");
                divBad.className = "bad";
                let textDivBad = document.createTextNode("Over Game");
                divBad.appendChild(textDivBad);
                finishMessage.appendChild(divBad);

                // Catch playAgin function
                playAgin();

            }
        }
    }, 1000);

}

function playAgin () {

    // Cerate Button To try again
    let divPalyAgin = document.createElement("div");
    divPalyAgin.className = "agin";
    let textDivPalyAgin = document.createTextNode("Try Agin");
    divPalyAgin.appendChild(textDivPalyAgin);
    finishMessage.appendChild(divPalyAgin);

    // if Clicked divPalyAgin Button 
    divPalyAgin.onclick = () => {
        // Reload Page 
        window.location.reload();
    }
}