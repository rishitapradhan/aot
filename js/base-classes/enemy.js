var baseTop = 0;
var baseRight = 0;
var character = [];
var createEnemy = [];
var collisionEnemy = [];
var index = 0;

class Enemy {
    constructor(titanName, level, attackMovement, images, speed, id) {
        this.images = images;
        this.speed = speed;
        this.id = id
        this.attackMovement = attackMovement;
        this.level = parseInt(level);
        this.titanName = titanName;
    }

    //move enemy forward to main character.
    moveEnemy() {
        //variables to make sure one Enemy attacks.
        var attackFlag = false;
        var attackingOne = -1;
        //Add enemy elements in HTML file at run time.
        character[this.id] = document.createElement("img");
        var body = document.getElementsByTagName("body")[0];
        character[this.id].classList.add("enemy");
        character[this.id].src = "image/characters/" + this.images[0];
        body.appendChild(character[this.id]);
        var positionX = window.outerWidth;
        character[this.id].style.left = positionX + "px";
        //check which titan will attack on the main character to make both of the titans in the same level.
        if (this.titanName == "Eren") {
            character[this.id].style.height = "300px";
        }
        else if (this.titanName == "Reiner") {
            character[this.id].style.height = "270px";
        }
        //
        character[this.id].style.bottom = parseInt(2 * window.outerHeight / 100) + "px";
        //Create time interval funtion to generate enemy from the right side of the screen.
        var enemyGenerator = setInterval(generateEnemies, this.speed);
        var enemyId = this.id;
        var enemyImages = this.images;
        var curruntEnemy = 0;
        var attackMove = 0;
        var attackImages = this.attackMovement
        var senesingAttack = this.level;
        //reset collision array to make sure enemy touch the main character only one time.
        collisionEnemy[enemyId] = 0;

        //Generation function that will be called by time interval event.
        function generateEnemies() {
            //check if the enemy disappears from the screen.
            if (positionX <= -160) {
                clearInterval(enemyGenerator);
                positionX = window.outerWidth;
                character[enemyId].remove();
            }
            //make character move forward to the main character with change images.
            else {
                //make enemy attach on level 2 and 3.
                if (senesingAttack > 1 && attackFlag == true && enemyId == attackingOne) {
                    character[attackingOne].src = "image/characters/" + attackImages[attackMove];
                    attackMove += 1;
                    character[attackingOne].style.left = (positionX -= 30) + "px"
                    if (attackMove >= attackImages.length) {
                        attackMove = 0;
                        attackFlag = false;
                    }
                }
                else if (senesingAttack >= 1 && attackFlag == false || enemyId != attackingOne) {
                    character[enemyId].src = "image/characters/" + enemyImages[curruntEnemy];
                    character[enemyId].style.left = positionX + "px";
                    positionX -= 50;
                    curruntEnemy = curruntEnemy + 1;

                    if (curruntEnemy >= enemyImages.length) {
                        curruntEnemy = 0;
                    }

                }
            }
            //varables to get main character position and enemy position
            var enemyLeft = parseInt(character[enemyId].style.left);
            var characterLeft = parseInt(mainCharacter.characterElementHTML.style.left);
            var enemyBottom = parseInt(character[enemyId].style.bottom);
            var characterBottom = parseInt(mainCharacter.characterElementHTML.style.bottom);
            //check if the distance between enemy and main character is 200px so start attacking.
            if ((enemyLeft - 200 <= characterLeft) && (enemyLeft + 10 >= characterLeft)) {
                if (senesingAttack > 1) {
                    attackFlag = true;
                    attackingOne = enemyId
                }
            }
            //check if the main character touch the enemy to decrease the health.
            if ((enemyLeft - 20 <= characterLeft) && (enemyLeft + 45 >= characterLeft)) {
                if ((characterBottom < (enemyBottom + 300)) && (collisionEnemy[enemyId] == 0)) {
                    mainCharacter.sethealth()
                    collisionEnemy[enemyId] = 1;
                }
            }
        }
    }

    //create new enemy waves every specific time using time interval event.
    static createAttackWave(enemies) {
        enemies[0].moveEnemy();
        var timer = 2000;
        for (let i = 1; i < enemies.length; i++) {
            var x = enemies[i].moveEnemy.bind(enemies[i]);
            setTimeout(x, timer);
            timer += 1000;
        }
    }

    //start generation of enemies every specific time after starting of the game.
    static launchAttack(enemies) {
        Enemy.createAttackWave(enemies);
        var wave = 5000;
        for (let i = 0; i < 25; i++) {
            createEnemy[i] = setTimeout(function () {
                Enemy.createAttackWave(enemies);
            }, wave);
            wave += 5000;
        }
    }

    //stop generation of enemies when the game ends (win - lose).
    static clearAttack() {
        for (let i = 0; i < 25; i++) {
            clearTimeout(createEnemy[i]);
        }
    }
};

