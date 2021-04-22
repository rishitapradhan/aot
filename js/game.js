// Timer variables
var timerValue, minutes, seconds;
var audioTimer = document.createElement('audio');

// Level variables
var levelId = 1, characterId = 1;
var queryString = new Array();

// Get quary string from url
$(function () {
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    if (queryString["level"] != null && queryString["character"] != null) {
        levelId = parseInt(queryString["level"]);
        characterId = parseInt(queryString["character"]);
    }
    gameCreation(levelId, characterId);
});

// Listen to right to forward moving and top to jump sign 
document.addEventListener("keydown", keyListen);
function keyListen(keyObject) {
    // jump
    if (keyObject.keyCode == 32) {
        if (MAIN_CHARACTER_STATE == MOVING || MAIN_CHARACTER_STATE == MOVE_FOREARD_FROM_JUMP) {
            mainCharacter.stopMove();
            var callBackJump = mainCharacter.jumpWithMove_function.bind(mainCharacter)
            if (jumpIntervalID == undefined)
                jumpIntervalID = setInterval(callBackJump, 70);
            MAIN_CHARACTER_STATE = JUMPING;
        }
        else if (MAIN_CHARACTER_STATE == STAND) {
            var callBackJump = mainCharacter.jumpOnly_function.bind(mainCharacter)
            if (jumpIntervalID == undefined)
                jumpIntervalID = setInterval(callBackJump, 70);
            MAIN_CHARACTER_STATE = JUMPING;
        }
    }
    // right 
    else if (keyObject.keyCode == 39) {
        if (MAIN_CHARACTER_STATE == STAND) {
            var callBackMove = mainCharacter.forwardMove.bind(mainCharacter)
            if (moveIntervalID == undefined)
                moveIntervalID = setInterval(callBackMove, 70)
            MAIN_CHARACTER_STATE = MOVING;
        }
        // for injection collision 
        var injectionLeft = parseInt(document.getElementById("injection").style.left);
        var injectionRight = injectionLeft + parseInt(document.getElementById("injection").width);
        var characterLeft = parseInt(document.getElementById("defenderPhotos").style.left);
        var characterRight = characterLeft + parseInt(document.getElementById("defenderPhotos").width);
        if ((injectionLeft <= characterRight && injectionLeft >= characterLeft) || (injectionRight <= characterRight && injectionRight >= characterLeft)) {
            if (injectionIconCollision == 0) {
                Injection.injectionDisappear();
                mainCharacter.increasehealth();
                injectionIconCollision = 1;
            }

        }
    }
}

// Listen keyup right sign to stop moving 
document.addEventListener("keyup", keyUpListen);
function keyUpListen(keyObject) {
    if (keyObject.keyCode == 39) {
        mainCharacter.stopMove();
        MAIN_CHARACTER_STATE = STAND;
    }
}

// Listen to attaking and speeding
document.addEventListener("keypress", keyPressListen);
function keyPressListen(keyObject) {
    // "a" key attacking 
    if (keyObject.keyCode == 97)
        console.log("attack");

    // "s" key speed up 
    if (keyObject.keyCode == 115)
        mainCharacter.characterSpeed = mainCharacter.highSpeed;
    else
        mainCharacter.characterSpeed = mainCharacter.lowSpeed;

}

// End game when window be blur 
$(window).on('blur', function (params) {
    if (MAIN_CHARACTER_STATE != LOSE && MAIN_CHARACTER_STATE != WIN) {
        Enemy.clearAttack();
        MAIN_CHARACTER_STATE = LOSE;
        mainCharacter.endGame();
    }
});

// The game counter 
function countdown() {
    clearInterval(timerValue);

    var timer = $('.js-timeout').html();
    timer = timer.split(':');
    minutes = timer[0];
    seconds = timer[1];

    timerValue = setInterval(function () {
        seconds -= 1;
        if (minutes < 0) return;
        else if (seconds < 0 && minutes == 0) {
            minutes = 0;
        }
        else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

        $('.js-timeout').html(minutes + ':' + seconds);

        // add timer sound when second = 3
        if (minutes == 0 && seconds <= 3 && MAIN_CHARACTER_STATE != LOSE) {
            backgroundAudio.pause();
            audioTimer.setAttribute('src', 'audio/timer.mp3');
            audioTimer.play();
        }

        // end game when seconds and minutes = 0
        if (minutes == 0 && seconds == 0 && MAIN_CHARACTER_STATE != LOSE) {
            clearInterval(timerValue);
            MAIN_CHARACTER_STATE = WIN;
            mainCharacter.endGame();
        }

        // Genetate injection in game every 10 second in level 2,3 
        // and every 20 
        if (seconds % 10 == 0 && levelId > 1) {
            Injection.injectionMovementStart();
        }else if(seconds % 20 == 0) {
            Injection.injectionMovementStart();
        }

        // genetate stones in level 3 every 10 second
        if (seconds % 10 == 0) {
            Stone.stoneMovement();
        }

    }, 1000);
}

countdown();