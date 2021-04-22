/* get the user browser dimensions*/
document.getElementById("htmlID").style.height = window.outerHeight;
document.getElementById("htmlID").style.width = window.outerWidth;

/* make the window response at any size*/
window.addEventListener("resize", function () {
    /* get the user browser NEW dimensions*/
    document.getElementById("htmlID").style.height = window.outerHeight;
    document.getElementById("htmlID").style.width = window.outerWidth;
});

var currentInstructionElement = 0;
var nextBtn = document.getElementById("nextButton");

var ins1 = document.getElementById("instruction1");
var ins2 = document.getElementById("instruction2");
var ins3 = document.getElementById("instruction3");
var ins4 = document.getElementById("instruction4");
var ins5 = document.getElementById("instruction5");

var animation1 = "currentInstruction";
var animation2 = "currentInstruction2";

var Stop = "stopAnimation";

/*Set Audio*/
backgroundAudio.setAttribute('src', 'audio/how-to-play.mp3');

/* varible to sync between instructions to show it using animation attribute. */
var currentInstructionElement = 0;
/* get the next button to check if the user pressed on it or not. */
var nextBtn = document.getElementById("nextButton");
/* add Event listener on the next key to appear new instruction when the user presses on it. */
nextBtn.addEventListener("click", currentIns)
/* make interval event to show all instuction continousuly, if the user doesn't press on the next key. */
setInterval(currentInsInterval, 4000);

/* next listener function. */
function currentIns(obj) {
    obj.preventDefault();
    animationMethod();  //call animation
}

function currentInsInterval() {
    animationMethod();  //call animation
}

/*Function to Show instruction in animated way*/
function animationMethod() {
    /* check which instruction is playing*/
    if (currentInstructionElement === 0) {
        /* stop the current*/
        ins1.style.animationName = Stop;
        /* run the next instruction*/
        ins2.style.animationName = animation1;
        /* display the next */
        ins2.style.display = "block";
        /* increment to sync between instructions*/
        currentInstructionElement++;
    }
    else if (currentInstructionElement === 1) {
        ins2.style.animationName = Stop;
        ins3.style.animationName = animation1;
        ins3.style.display = "block";
        currentInstructionElement++;
    }
    else if (currentInstructionElement === 2) {
        ins3.style.animationName = Stop;
        ins4.style.animationName = animation2;
        ins4.style.display = "block";
        currentInstructionElement++;
    }
    else if (currentInstructionElement === 3) {
        ins4.style.animationName = Stop;
        ins5.style.animationName = animation2;
        ins5.style.display = "block";
        currentInstructionElement++;
    }
    else {
        /* Stop all instructions*/
        ins5.style.animationName = Stop;
    }
}
