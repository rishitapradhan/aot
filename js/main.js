// Add sound track to all pages as dafult.
var backgroundAudio = document.createElement('audio');
backgroundAudio.setAttribute('src', 'audio/attack-small.mp3');

// Add Sound.
var soundFlag = false;
// Event listener to check if the user want to play the sound track or not.
$('.speaker').on('click', function () {
    // Give the audio element loop attribute to repeat itself.
    backgroundAudio.loop = true;

    if (!soundFlag) {
        $('#sound').attr("src", "image/sound.svg");
        backgroundAudio.play();
    } else {
        $('#sound').attr("src", "image/no-sound.svg");
        backgroundAudio.pause();
    }
    soundFlag = !soundFlag;
})
