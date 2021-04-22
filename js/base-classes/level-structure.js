/*this is a class that other classes inherite from it.
it provides the x and y position.
it also provides the height and the width (size) of the created instance.
it takes the array of images of the instance*/
var idCounter = 0;  /* it increamntes to give every instance a unique id*/
class LevelStructure {
    id = 0;
    constructor(images, width, height, positionX, positionY) {
        this.images = images;         /* array of images*/
        this.width = width;           /*width of each image*/
        this.height = height;         /*height of each image*/
        this.id = ++idCounter;        /*id of the instance*/
        this.positionX = positionX;   /*x position of instance*/
        this.positionY = positionY;   /*y position of instance*/
    }

}
