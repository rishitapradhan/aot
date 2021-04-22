var characterFlage = -1; // to save the selected character in it
var levelFlage = -1;     // to save the selected level in it

// Start Action
var startBtn = $('#start');  //start button on html page
var characterTitle = document.getElementById('title');  /*choose your character sentecne in html*/
var levelTitle = document.getElementById('level-title'); //level word in html*/

// Change Charecters
var characters = document.getElementsByClassName('character'); // to get character: eren - mekasa - armin

/*make action if one of the characters is clicked.
this action is in chooseCharacter function.*/
for (let i = 0; i < characters.length; i++) {
    characters[i].addEventListener('click', function () { chooseCharecter(i) });
}

function chooseCharecter(i) {
    //to make the default appearnce of the cahracter
    for (let j = 0; j < characters.length; j++) {
        //background of color rgba(171, 144, 124,0.7)
        characters[j].style.background = "rgba(171, 144, 124,0.7)";
        //color of character name is black
        characters[j].style.color = "black";
        //show in ease of 0.5 second (animation)
        characters[j].style.transition = " 0.5s ease-out";
    }
    //background of color the selected characer black
    characters[i].style.background = "rgba(0,0,0,0.8)";
    //color name of the selected character is white
    characters[i].style.color = "white";
    //show in ease of 0.5 second (animation)
    characters[i].style.transition = " 0.5s ease-out";
    //save the chosen character in the character flag
    characterFlage = i;
}

// Change Levels
var levels = document.getElementsByClassName('level'); // to get level: 1 - 2 -3

/*make action if one of the levels is clicked.
this action is in chooseLevel function.*/
for (let i = 0; i < levels.length; i++) {
    levels[i].addEventListener('click', function () {
        chooseLevel(i)
    })
}

function chooseLevel(i) {
    //to make the default appearnce of the cahracter
    for (let j = 0; j < levels.length; j++) {
        //background of color rgba(171, 144, 124,0.7)
        levels[j].style.background = "rgba(171, 144, 124,0.7)";
        //color of level name is black
        levels[j].style.color = "black";
        //show in ease of 0.5 second (animation)       
        levels[j].style.transition = " 0.5s ease-out";
    }
    //background of color the selected level black
    levels[i].style.background = "rgba(0,0,0,0.8)";
    //color the selected level name is white
    levels[i].style.color = "white";
    //show in ease of 0.5 second (animation)    
    levels[i].style.transition = " 0.5s ease-out";
    //save the chosen level in the level flag
    levelFlage = i;
}

startBtn.on('click', startGame); // add  a click event on the start button

function startGame(event) {
    event.preventDefault();
    //if the user did not choose a character make the default choice character Eren
    if (characterFlage == -1) {
        characters[0].style.background = "rgba(0,0,0,0.8)";
        characters[0].style.color = "white";
        characters[0].style.transition = " 0.5s ease-out";
        characterFlage = 0;
    }
    //if the user did not choose a level make the default choice level 1
    if (levelFlage == -1) {
        levels[0].style.background = "rgba(0,0,0,0.8)";
        levels[0].style.color = "white";
        levels[0].style.transition = " 0.5s ease-out";
        levelFlage = 0;
    }

    /* add click sound -- it plays when you click on the start button */
    var audio = document.createElement('audio');  // create an audio button
    audio.setAttribute('src', 'audio/start-click.mp3'); // chhose the audio file
    audio.play(); // play audio file

    /* the next two line are just for readability character with id 0 will be characer 1 as a first choice
    character with id 1 and 2 follow the same concept.
    same concept goes for levels. level with id 0 will be level 1. 
    level with id 1 and 2 follow the same concept.*/ 
    characterFlage += 1;
    levelFlage += 1;

    //determine which level and character the usrer will play
    setTimeout(function () {
        var url = "game.html?level=" + levelFlage + "&character=" + characterFlage;
        window.location.href = url;
    }, 950);

}

