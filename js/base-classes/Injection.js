var injectionIconCollision = 0;

// This class made to increase character health
class Injection extends LevelStructure {

    constructor(images, width, height, positionX, positionY) {
        super(images, width, height, positionX, positionY);

        $("#game").append("<img id='injection'></img>");
        $("#injection").attr('src', "image/background/" + images);
        $("#injection").css({
            "left": positionX,
            "bottom": positionY,
            "width": width,
            "height": height,
        });
    }

    // Move injection when character move
    static injectionMovement() {
        var position = parseInt(document.getElementById("injection").style.left);
        if (position + document.getElementById("injection").width >= 0)
            document.getElementById("injection").style.left = position - 20 + "px";
    }

    // Start generate, display injection in level
    static injectionMovementStart() {
        document.getElementById("injection").style.left = window.outerWidth + "px";
        document.getElementById("injection").style.display = "block";
        injectionIconCollision = 0;
    }

    // Make injection in level
    static injectionDisappear() {
        document.getElementById("injection").style.display = "none";
    }
}