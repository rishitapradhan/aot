/*this class inherites from LevelStructure class
its instance creates buildings in the game */
class Building extends LevelStructure {

    constructor(images, width, height, positionX, positionY) {
        super(images, width, height, positionX, positionY);
        /* creates image element*/
        $("#game").append("<img id='build" + this.id + "' class='build-img'></img>");
        /*set an image to the element*/
        $("#build" + this.id).attr('src', "image/buildings/" + images);
        /*set position and size*/
        $("#build" + this.id).css({
            "left": positionX,
            "bottom": positionY,
            "width": width,
            "height": height,
            "z-index": 3
        });
    }
    /*a function to make buildings move with the character*/
    static buildingsMovement() {
        $(".build-img").each((i) => {
            /*read the position of the building*/
            var position = parseInt($(".build-img")[i].style.left);
            /*when reaches the end of screen, it starts again from the beginning*/
            if (position < - parseInt($(".build-img").css('width'))) {
                position = window.outerWidth;
            }
            /*move buliding by 30 px each time the functoin is called and 
            the building did not reach the end of the screen*/
            $(".build-img")[i].style.left = position - 30 + "px";
        })
    }
}