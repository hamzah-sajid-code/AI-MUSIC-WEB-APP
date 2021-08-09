var rightWristx = '';
var rightWristy = '';
var leftWristx = '';
var leftWristy = '';
var rightWristscore = '';
var lefttWristscore = '';

function preload() {
    harrypottersong = loadSound('harrypottersong.mp3');
    believersong = loadSound('believersong.mp3');
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.position(433, 150);
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.hide();
    console.log('ML5 Successfully Loaded: ' + ml5.version);
    classifire = ml5.poseNet(video, modelLoaded)
    classifire.on('pose', gotResults);
}

function draw() {
    image(video, 0, 0, 500, 400);
    if (rightWristscore > 0.2) {
        harrypottersong.stop()
        fill('blue')
        stroke('blue')
        circle(rightWristx, rightWristy, 10);
        believersong.play();
        believersong.setVolume(1);
        believersong.rate(1)
        document.getElementById('songName').innerHTML = ': Believer';

    }
    if (lefttWristscore > 0.2) {
        believersong.stop()
        fill('red')
        stroke('red')
        circle(lefttWristx, leftWristy, 10);
        harrypottersong.play();
        harrypottersong.setVolume(1);
        harrypottersong.rate(1);
        document.getElementById('songName').innerHTML = ": Harry Potter - Hedwig's Theme";

    }
}

function modelLoaded() {
    console.log('Successfully loaded posnet');
}

function gotResults(results) {
    if (results.length > 0) {
        console.log(results);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristscore = results[0].pose.keypoints[10].score;
        lefttWristscore = results[0].pose.keypoints[9].score;

    }
}

function play() {
    harrypottersong.play();
    harrypottersong.setVolume(1);
    harrypottersong.rate(1)
}
function stop(){
    harrypottersong.stop();
    believersong.stop();
}