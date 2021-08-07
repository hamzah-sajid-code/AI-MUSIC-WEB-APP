function preload(){

}

function setup(){
    canvas =  createCanvas(600, 500);
	canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    console.log('ML5 Successfully Loaded: '+ml5.version);
    classifire = ml5.poseNet(video, modelLoaded)
    classifire.on('pose', gotResults)  
}

function draw(){
    image(video, 0, 0, 600,500);
}
function modelLoaded(){
    console.log('Successfully loaded posnet');
}
function gotResults(results){
    if(results.length > 0){
        console.log(results);
    }
}