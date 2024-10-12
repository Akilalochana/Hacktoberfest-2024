var start = 0;

function keyCheck(event) {
    if (event.which == 13) {
        if (runWorkerId == 0) {
            document.getElementById("startGame").style.visibility = "hidden";
            document.getElementById("santa").style.visibility = "hidden";
            runWorkerId = setInterval(run, 100);
            runSound.play();
            start = 1;
            backgroundWorkerId = setInterval(moveBackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            blockWorkerId = setInterval(createBlock, 1000);
            moveBlockWorkerId = setInterval(moveBlocks, 100);

        }
    }

    if (event.which == 32) {

        if (start == 1) {

            if (jumpWorkerId == 0) {

                clearInterval(runWorkerId);
                jumpWorkerId = setInterval(jump, 100);
                runSound.pause();
                jumpSound.play();

            }

        }

    }

}


var player = document.getElementById("player");

var runImageNumber = 1;
var runWorkerId = 0;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run() {
    runImageNumber++;
    if (runImageNumber == 12) {
        runImageNumber = 1;
    }
    player.src = "Run (" + runImageNumber + ").png";

}

var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 400;
var jumpSound = new Audio("jump.mp3");
jumpSound.loop = true;

function jump() {

    jumpImageNumber++;

    if (jumpImageNumber <= 9) {
        playerMarginTop = playerMarginTop - 20;
        player.style.marginTop = playerMarginTop + "px";
    }

    if (jumpImageNumber >= 10) {
        playerMarginTop = playerMarginTop + 20;
        player.style.marginTop = playerMarginTop + "px";
    }
    if (jumpImageNumber == 17) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run, 100);
        jumpSound.pause();
        runSound.play();
    }

    player.src = "Jump (" + jumpImageNumber + ").png";
}

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;

function moveBackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
}

var score = document.getElementById("score");
var scoreValue = 0;
var scoreWorkerId = 0;

function updateScore() {
    scoreValue = scoreValue + 5;
    score.innerHTML = scoreValue;
}


var blockWorkerId = 0;
var blockMarginLeft = 600;
var blockId = 1;

function createBlock() {
    var block = document.createElement("div");

    block.id = "block" + blockId;
    blockId++;

    block.className = "block";

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";

    background.appendChild(block);
}


var moveBlockWorkerId = 0;

function moveBlocks() {

    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";


        if (newMarginLeft < 170) {
            if (newMarginLeft > 70) {
                if (playerMarginTop > 360) {
                    if (playerMarginTop <= 400) {
                        clearInterval(scoreWorkerId);
                        clearInterval(backgroundWorkerId);
                        clearInterval(blockWorkerId);
                        clearInterval(moveBlockWorkerId);
                        clearInterval(runWorkerId);
                        clearInterval(jumpWorkerId);
                        player.style.marginTop = 400 + "px";
                        deadWorkerId = setInterval(dead, 100);
                        runSound.pause();
                        jumpSound.pause();
                        deadSound.play();
                    }
                }
            }

        }
    }
}

var deadImageNumber = 1;
var deadWorkerId = 0;
var deadSound = new Audio("dead.mp3");


function dead() {
    deadImageNumber++;
    if (deadImageNumber == 17) {
        clearInterval(deadWorkerId);
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("text2").innerHTML = "Your Score  " + scoreValue;
    }
    player.src = "Dead (" + deadImageNumber + ").png";
}

function restart() {
    location.reload();
}
