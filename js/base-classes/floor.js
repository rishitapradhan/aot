/*this class inherites from LevelStructure class
its instance creates buildings in the game */
class Floor extends LevelStructure {

    constructor(images, width, height, positionX, positionY) {
        super(images, width, height, positionX, positionY);
        /* creates image element*/
        $("#game").append("<img id='build" + this.id + "' class='floor-img'></img>");
        /*set an image to the element*/
        $("#floor" + this.id).attr('src', "image/floor/" + images);
        /*set position and size*/
        $("#floor" + this.id).css({
            "left": positionX,
            "bottom": positionY,
            "width": width,
            "height": height,
            "z-index": 3
        });
    }
    /*a function to make the floor move with the character*/
    static floorMovement() {
        var max = 0;
        $(".floor-img").each((i) => {
            /*read the position of the floor*/
            var position = parseInt($(".floor-img")[i].style.left);
            /*when reaches the end of screen, it starts again from the beginning*/
            if (position < - parseInt($(".floor-img").css('width'))) {
                position = window.outerWidth;
            }
            /*move floor by 30 px each time the functoin is called and 
            the floor did not reach the end of the screen*/
            $(".floor-img")[i].style.left = position - 30 + "px";
        })
    }
}