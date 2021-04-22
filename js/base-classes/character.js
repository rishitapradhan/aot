/*Variables for interval functins*/
var jumpIntervalID;
var backIntervalID;
var moveIntervalID;
/*constant values*/
const STAND = 0;
const MOVE_FORWARD_FROM_STAND = 1;
const MOVE_FOREARD_FROM_JUMP = 2;
const MOVING = 3;
const JUMP_FROM_STAND = 4;
const JUMP_FROM_MOVE_FORWARD = 5;
const GO_BACK = 6;
const JUMPING = 7;
const LOSE = 8;
const WIN = 9;
/*flag for charcter state */
var MAIN_CHARACTER_STATE = STAND;
/*images counter */
var moveImageCureent = 1;
var LoseCureentImage = 1;
var WinCureentImage = 1;
/*health bar*/
var health = $('#healthBar').width();

class Characters {
    constructor(ID, Name, speed, level, jumpPhotos, movementPhotos, losePhotos, winPhotos, HTML_Element) {
        this.characterID = ID;
        this.characterName = Name;
        this.characterSpeed = speed;
        this.lowSpeed = speed;
        this.highSpeed = speed * 1.5;
        this.characterLevel = level;
        this.characterJumpPhotos = jumpPhotos;
        this.characterMovementPhotos = movementPhotos;
        this.characterWinPhotos = winPhotos;
        this.characterLosePhotos = losePhotos;
        this.characterElementHTML = HTML_Element;
        this.position_x = parseInt(3 * $(window).innerWidth() / 100);
        this.position_y = parseInt(20 * $(window).innerHeight() / 100);
        this.characterElementHTML.style.bottom = this.position_y + "px";
        this.characterElementHTML.style.left = this.position_x + "px";
        this.jumpPosition = 0;
    }

    /* jump only */
    jumpOnly_function(obj) {
        this.jumpPosition++;
        moveEveryStructure(); //Elements move with character
        switch (this.jumpPosition) {
            case 0:
            case 1:
            case 2:
                this.position_x += 15;
                this.characterElementHTML.style.left = (this.position_x) + "px";
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                break;
            case 3:
            case 4:
            case 5:
                this.position_x += 15;
                this.position_y += 90;
                this.characterElementHTML.style.left = (this.position_x) + "px";
                this.characterElementHTML.style.bottom = (this.position_y) + "px";
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                break;
            case 6:
            case 7:
                this.position_x += 15;
                this.position_y -= 135;
                this.characterElementHTML.style.left = (this.position_x) + "px";
                this.characterElementHTML.style.bottom = (this.position_y) + "px";
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                break;
            case 8:
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                this.jumpPosition = 0;
                if (this.position_x >= 800) {
                    var callBackJump = mainCharacter.backwardMove.bind(mainCharacter)
                    if (backIntervalID == undefined)
                        backIntervalID = setInterval(callBackJump, 40);
                    MAIN_CHARACTER_STATE = GO_BACK;
                }
                else {
                    MAIN_CHARACTER_STATE = STAND;
                }
                clearInterval(jumpIntervalID);
                jumpIntervalID = undefined;
                break;
        }
    }

    /* move and jump */
    jumpWithMove_function(obj) {
        this.jumpPosition++;
        moveEveryStructure(); //Elements move with character
        switch (this.jumpPosition) {
            case 0:
            case 1:
            case 2:
                this.position_x += 30;
                this.characterElementHTML.style.left = (this.position_x) + "px";
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                break;
            case 3:
            case 4:
            case 5:
                this.position_x += 30;
                this.position_y += 70;
                this.characterElementHTML.style.left = (this.position_x) + "px";
                this.characterElementHTML.style.bottom = (this.position_y) + "px";
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                break;
            case 6:
            case 7:
                this.position_x += 30;
                this.position_y -= 70;
                this.characterElementHTML.style.left = (this.position_x) + "px";
                this.characterElementHTML.style.bottom = (this.position_y) + "px";
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                break;
            case 8:
                this.position_x += 30;
                this.position_y -= 70;
                this.characterElementHTML.style.left = (this.position_x) + "px";
                this.characterElementHTML.style.bottom = (this.position_y) + "px";
                this.characterElementHTML.src = "image/characters move/" + this.characterJumpPhotos[this.jumpPosition] + ".png";
                this.jumpPosition = 0;

                if (this.position_x >= 800) {
                    var callBackJump = mainCharacter.backwardMove.bind(mainCharacter)
                    if (backIntervalID == undefined)
                        backIntervalID = setInterval(callBackJump, 40);
                    MAIN_CHARACTER_STATE = GO_BACK;
                }
                else {
                    MAIN_CHARACTER_STATE = STAND;
                }
                clearInterval(jumpIntervalID);
                jumpIntervalID = undefined;
                break;
        }
    }

    /* movement only */
    forwardMove() {
        if (moveImageCureent >= this.characterMovementPhotos.length) {
            moveImageCureent = 1;
        }
        if (this.position_x < 800)
            this.position_x += this.characterSpeed;

        this.characterElementHTML.src = "image/characters move/" + this.characterMovementPhotos[moveImageCureent];
        this.characterElementHTML.style.left = (this.position_x) + "px";
        moveImageCureent++;
        moveEveryStructure();   //Elements move with character
    }

    /*function to redesign where the character is standing*/
    backwardMove() {
        if (moveImageCureent >= this.characterMovementPhotos.length) {
            moveImageCureent = 1;
        }
        if (this.position_x > 800) {
            this.position_x -= 15;
            this.characterElementHTML.src = "image/characters move/" + this.characterMovementPhotos[moveImageCureent];
            this.characterElementHTML.style.left = (this.position_x) + "px";
            moveImageCureent++;
            MAIN_CHARACTER_STATE = GO_BACK;
        }
        else {
            clearInterval(backIntervalID);
            backIntervalID = undefined;
            this.characterElementHTML.src = "image/characters move/" + this.characterMovementPhotos[0];
            this.characterElementHTML.style.left = (this.position_x) + "px";
            MAIN_CHARACTER_STATE = STAND;
        }
        moveEveryStructure();  //Elements move with character
    }

    /* stop movement only */
    stopMove() {
        this.characterElementHTML.src = "image/characters move/" + this.characterMovementPhotos[0];
        clearInterval(moveIntervalID);
        moveIntervalID = undefined;
    }

    /*end game whatever win or lose */
    endGame() {
        Enemy.clearAttack();
        backgroundAudio.pause();
        /* stop moving. */
        this.characterElementHTML.src = "image/characters move/" + this.characterMovementPhotos[0];
        clearInterval(moveIntervalID);
        clearInterval(backIntervalID);
        clearInterval(jumpIntervalID);
        backIntervalID = undefined;
        moveIntervalID = undefined;
        jumpIntervalID = undefined;

        /* stop timer. */
        clearInterval(timerValue);

        /* stop key up and down events. */
        document.removeEventListener("keydown", keyListen);
        document.removeEventListener("keyup", keyUpListen);

        /*reset charcter position*/
        this.position_y = parseInt(20 * $(window).innerHeight() / 100);
        this.characterElementHTML.style.bottom = this.position_y + "px";
        var positionX = this.position_x;
        var positionY = this.position_y;
        var characterElement = this.characterElementHTML;

        /*check character state*/
        if (MAIN_CHARACTER_STATE == LOSE) {
            this.loseGame(positionX, positionY, characterElement)  //call loseGame function
        }
        else if (MAIN_CHARACTER_STATE == WIN) {
            this.winGame(positionX, positionY, characterElement)  //call winGame function
        }
    }

    /* lose game only */
    loseGame(positionX, positionY, characterElement) {
        /* show titan different images base on the level */
        if (this.characterLevel == 1) {
            var backgroundTitan = new Background("titan.png", 800, 400, "400px", "453px");
        }
        else if (this.characterLevel == 2) {
            var backgroundTitan = new Background("titan-level2.png", 700, 500, "400px", "150px");
        }
        else {
            var backgroundTitan = new Background("titan2.png", 800, 500, (window.outerWidth - 800) + "px", "150px");
        }

        /* add lose sound */
        playAudio('audio/lose.mp3');

        var photos = this.characterLosePhotos;
        /* create lose interval to change lose images. */
        var lose = setInterval(characterlose, 300);
        function characterlose() {
            if (LoseCureentImage >= photos.length) {
                clearInterval(lose);
                $('body').append("<div class='lose-div'><h1 class='lose-title'>Game Over</h1></div>");
                $('.lose-div').append(`<img src='image/characters/${photos[0]}.png' class='lose-image'><a href='game.html?level=${levelId}&character=${characterId}' class='retry'>Retry</a>`);
                characterElement.remove();
            }
            else {
                if (LoseCureentImage == photos.length - 1) {
                    characterElement.style.width = "150px";
                    characterElement.style.height = "80px";
                    characterElement.style.bottom = (positionY - 40) + "px";
                }
                characterElement.src = "image/characters move/" + photos[LoseCureentImage];
                characterElement.style.left = positionX + "px";
                positionX += 15;
                LoseCureentImage++;
            }
        }
    }

    winGame(positionX, positionY, characterElement) {
        /* add win sound */
        playAudio('audio/win.mp3');

        var photos = this.characterWinPhotos;
        var win = setInterval(characterWin, 300);

        function characterWin() {
            if (WinCureentImage >= photos.length) {
                clearInterval(win);
                $('body').append("<div class='win-div'><h1 class='win-title'>You WIN</h1></div>");
                $('.win-div').append(`<img src='image/characters/${photos[0]}.png' class='win-image'>
                <a href='choose-character.html' class='choose-character'>Choose Character</a>
                <a href='game.html?level=${levelId}&character=${characterId}' class='again'>Play Again?</a>`);
                characterElement.remove();
                $("#defenderPhotos").css("bottom", "-20px");
            }
            else {
                characterElement.src = "image/characters move/" + photos[WinCureentImage] + ".png";
                characterElement.style.left = positionX + "px";
                positionX += 30;
                WinCureentImage++;
            }
        }
    }

    /*function to change the health bar */
    sethealth() {
        if (health <= (0.8 * 300) && health > (0.4 * 300)) {
            $('#healthBar').css('background', 'rgb(196, 123, 14)');
            $('#healthBar').css('color', 'rgb(196, 123, 14)');
        }
        else if (health <= (0.4 * 300)) {
            $('#healthBar').css('background', 'rgb(153, 38, 38)');
            $('#healthBar').css('color', 'rgb(153, 38, 38)');
        }

        if (health > (0.2 * 300)) {
            if (MAIN_CHARACTER_STATE != WIN) {
                health = health - (0.2 * 300);
                $('#healthBar').css('width', health + 'px');
                return true;
            }
        }
        else {
            $('#healthBar').css('width', '0px');
            $('#healthBar').text('');
            if (MAIN_CHARACTER_STATE != LOSE && MAIN_CHARACTER_STATE != WIN) {
                MAIN_CHARACTER_STATE = LOSE;
                this.endGame();
            }
            return false;
        }
    }
    /*function to increase health when the character take the injection */
    increasehealth() {
        if (health < 300) {
            health = health + 0.2 * 300;
            $('#healthBar').width(health + "px");
        }

        if (health >= (0.8 * 300)) {
            $('#healthBar').css('background', 'rgb(21, 95, 21)');
            $('#healthBar').css('color', 'rgb(21, 95, 21)');
        }
        else {
            $('#healthBar').css('background', 'rgb(196, 123, 14)');
            $('#healthBar').css('color', 'rgb(196, 123, 14)');
        }
    }
}
/*function to move every structure */
function moveEveryStructure() {
    Building.buildingsMovement();
    Background.backgroundsMovement();
    Stone.stoneMovementWithCharacter();
    Injection.injectionMovement();
}

/*function to run any aduio */
function playAudio(srcAudio) {
    audioTimer.pause();
    var audio = document.createElement('audio');
    audio.setAttribute('src', srcAudio);
    audio.play();
}