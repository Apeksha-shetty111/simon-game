
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedpattern = [];

var start = false;
var level = 0;
$(document).keypress(function () {
    if (!start) {
        // $("#level-title").html("Level "+level);
        nextSequences();
        start = true;
    }
});

function nextSequences() {
    level++;
    $("#level-title").html("Level "+level);
    var randomNumber = Math.floor((Math.random()) * 3) + 1;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    Blink(randomChosenColor);
    Playsound(randomChosenColor);
}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedpattern.push(userChosenColor);
    Blink(userChosenColor);
    Playsound(userChosenColor);
    checkAnswer(userClickedpattern.length-1);
}
);

function Playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function Blink(key) {
    $("#" + key).delay(1).fadeOut().fadeIn('slow');

}

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]===userClickedpattern[currentlevel])
    {
        console.log("success");
        if(gamePattern.length===userClickedpattern.length)
        {
           setTimeout(() => {
                userClickedpattern = [];
                nextSequences();
           }, 1000);
        }
    } else {
        $("#level-title").html("Game Over, Press any key to restart");
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
       }, 100);
       Playsound("wrong");
       start = false;
       level = 0;
       gamePattern=[];
       userClickedpattern = [];
    }
    

}