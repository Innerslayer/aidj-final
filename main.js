function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);
}

song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
function modelloaded() {
    console.log("Posenet is initialized");
}
function preload() {
    song = loadSound("music_01.mp3");
}

function draw() {
    image(video,0,0,600,500);
    if(scorerightwrist > 0.2){
        fill("red");
        stroke("red");
        circle(rightwristX,rightwristY,20);

        if(rightwristY > 0 && rightwristY <= 100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightwristY > 100 && rightwristY <= 200){
            document.getElementById("speed").innerHTML = "speed is 1x";
            song.rate(1);
        }
        else if(rightwristY > 200 && rightwristY <=300){
            document.getElementById("speed").innerHTML = "speed is 1.5x";
            song.rate(1.5);
        }
        else if(rightwristY > 300 && rightwristY <=400){
            document.getElementById("speed").innerHTML = "speed is 2x";
            song.rate(2);
        }
        else if(rightwristY > 400 && rightwristY <=500){
            document.getElementById("speed").innerHTML = "speed is 2.5x";
            song.rate(2.5);
        }
    }
    if(scoreleftwrist > 0.2){

        fill("red");
        stroke("red");
        circle(leftwristX,leftwristY,20);
        inNumber = Number(leftwristY);
        removeDecimals = floor(inNumber);
        volume = removeDecimals/500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
        
    }
}
function gotposes(results){
    if(results.length  > 0){
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = " + scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist = " + scorerightwrist);
        console.log("leftwristx = " + leftwristX + " leftwristy = " + leftwristY);
        console.log("rightwristx = " + rightwristX + "rightwristy" + rightwristY);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1)
}


