//variables of game objects
var mainCharacter;
const mainCharacterSpeed = 20;

var enemy1;
var enemy2;
var enemy3;
var enemies = [];
const enemySpeed = 120;

var background1;
var background2;
var createdBackground = 0;

var roof;
var roofPosetionX = -10;
const roofLevelPercentage = 20 / 100;

var injectionObj;
const injectionWidth = 50;
const injectionHeight = 50;

var stoneObj1;
var stoneObj2;
var stoneObj3;

//Create all opjects of the game based on the user choices
function gameCreation(level, character) {
    backgroundAudio.setAttribute('src', 'audio/' + levelSoundTracks[level - 1]);
    injectionObj = new Injection("injection.png", injectionWidth, injectionHeight, "-50px", parseInt(roofLevelPercentage * $(window).innerHeight()) + "px")
    background1 = new Background(firstBackgroundArray[level - 1], window.outerWidth, 760, "0px", "0px");
    background2 = new Background(secondBackgroundArray[level - 1], window.outerWidth, 760, (- window.outerWidth) + "px", "0px");
    createLevelEnemy(level);
    createLevelRoof(level);
    //Check on the user choice of main character.
    switch (character) {
        case 1:
            $("#defenderPhotos").attr('src', 'image/characters move/eren/1.png');
            mainCharacter = new Characters(character, "Eren jeager", mainCharacterSpeed, level, erenJumpPhotosArray, erenMovePhotosArray, erenLosePhotosArray, erenWinPhotosArray, document.getElementById("defenderPhotos"));
            break;
        case 2:
            $("#defenderPhotos").attr('src', 'image/characters move/mikasa/1.png');
            mainCharacter = new Characters(character, "Mikasa", mainCharacterSpeed, level, mikasaJumpPhotosArray, mikasaMovePhotosArray, mikasaLosePhotosArray, mikasaWinPhotosArray, document.getElementById("defenderPhotos"));
            break;
        case 3:
            $("#defenderPhotos").attr('src', 'image/characters move/armin/1.png');
            mainCharacter = new Characters(character, "Armin", mainCharacterSpeed, level, arminJumpPhotosArray, arminMovePhotosArray, arminLosePhotosArray, arminWinPhotosArray, document.getElementById("defenderPhotos"));
            break;
    }
}

//create Enemies.
function createLevelEnemy(level) {
    enemy1 = new Enemy("Eren", level, enemyAttack, enemyPhotosArray, enemySpeed, 0);
    if (level == 1) {
        enemy2 = new Enemy("Eren", level, enemyAttack, enemyPhotosArray, enemySpeed, 1);
        enemies = [enemy1, enemy2];
    }
    else if (level == 2) {
        enemy2 = new Enemy("Eren", level, enemyAttack, enemyPhotosArray, enemySpeed, 1);
        enemies = [enemy1, enemy2];
    }
    else if (level == 3) {
        enemy2 = new Enemy("Reiner", level, enemyAttackReiner2, enemyPhotosArrayReiner, enemySpeed, 1);
        enemy3 = new Enemy("Eren", level, enemyAttack, enemyPhotosArray, enemySpeed, 2);
        enemies = [enemy1, enemy2, enemy3];
    }
    //Launch enemy attack function to start the game.
    Enemy.launchAttack(enemies);
}

//Create buildings in the level. 
function createLevelRoof(level) {
    //Calculate building height.
    var buildingHight = parseInt(roofLevelPercentage * $(window).innerHeight());
    //Check on the user choice of level.
    if (level == 1) {
        //Create specific namber of building object to make the building movement function.
        for (let i = 0; i < 4; i++) {
            roof = new Building("roof.png", parseInt(window.outerWidth / 3) - 20, buildingHight, roofPosetionX, "0px");
            roofPosetionX += parseInt(window.outerWidth / 3);
        }
    } else if (level == 2) {
        //Create specific namber of building object to make the building movement function.
        for (let i = 0; i < 6; i++) {
            roof = new Building("roof-Level2.png", parseInt(window.outerWidth / 3), buildingHight, roofPosetionX, "0px");
            roofPosetionX += parseInt(window.outerWidth / 3) - 50;
        }
    } else if (level == 3) {
        //Create stones objects in Level 3 only.
        stoneObj1 = new Stone("red-stone.png", 50, 50, parseInt(40 * window.innerWidth / 100) + "px", (window.innerHeight - 10) + "px");
        stoneObj2 = new Stone("brouwn-stone.png", 50, 50, parseInt(70 * window.innerWidth / 100) + "px", (window.innerHeight - 10) + "px");
        stoneObj3 = new Stone("brouwn-stone.png", 50, 50, parseInt(90 * window.innerWidth / 100) + "px", (window.innerHeight - 10) + "px");
        //Create specific namber of building object to make the building movement function.
        for (let i = 0; i < 6; i++) {
            roof = new Building("housesTest.png", parseInt(window.outerWidth / 5), buildingHight, roofPosetionX, "0px");
            roofPosetionX += parseInt(window.outerWidth / 5);
        }
    }
}
