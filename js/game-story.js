// Data for story
var story = ["1.png", "2.png", "3.png", "4.png", "5.png", "7.png", "8.png", "9.png", "11.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "23.png"];
var tell1 = ["There was a city in a world where humanity lives ...", "The walls protect them from gigantic man-eating humanoids !", "There was peace for 100 Years", "Eren, Mikasa and Armin ", "But one day !", "It was a 60 meters tall Tiatn!", "When he broke the wall", "Titans were around Eren's home", "The home collapsed", "There was a Titan near them", "The mother told them to run and save their lives", "But of course Eren refused..", "One of the officers came and saved the kids ", "But, he couldn't save the mother..", "She was eaten by that Titan...", "In front of her child Eren...", "Eren swore to wipe out every last Titan", "So Eren, Mikasa and Armin joined the Survey Corps"];
var tell2 = ["Surrounded by enormous walls", "Referred to as TITANS ...", "  ", "Have always dreamed of seeing what was behind the walls", "Giant Titan broke the wall ...", "  ", "he allowed the other Titans to enter the city", "Where his mom was there ...", "and his mother was stuck..", " ", " ", " ", " ", " ", " ", " ", " ", "To kill all the TITANS .."];

// Change story sound
backgroundAudio.setAttribute('src', 'audio/you-see-big-girl.mp3');
var currentImage = 0;

// Hide previous arrow in first time
$(".prev").hide();

// Listen to next arrow change to next image 
$(".next").on('click', function () {
    if (currentImage != story.length - 1) {
        currentImage++;
        setSlideObject(currentImage);
        $(".prev").show();
        if (currentImage == story.length - 1) $(".next").hide();
    }

});

// Listen to previous arrow change to previous image 
$(".prev").on('click', function () {
    if (currentImage != 0) {
        currentImage--;
        setSlideObject(currentImage);
        $(".next").show();
        if (currentImage == 0) $(".prev").hide();
    }

});

// Set image and titles in slider 
function setSlideObject(currentImage) {
    $('#immg').attr("src", "image/background/story/" + story[currentImage]);
    $('#tell1').text(tell1[currentImage]);
    $('#tell2').text(tell2[currentImage]);
    $(".numbertext").text(currentImage + 1 + "/18");
}