status = "";
objects = [];
function setup() {
    canvas = createCanvas(640, 450);
    document.getElementById("defaultCanvas0").style = "margin-top: 240px;";
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 450);
    video.hide();
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video, 0, 0, 640, 450);
    if (status != "") {
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected Are: " + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == input) {
                objectDetector.detect(gotResults);
                video.stop();
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
                synth.speak(utterThis);
            } else {
                var utterThis2 = new SpeechSynthesisUtterance("Object Not Found");
                synth.speak(utterThis2);
            }
        }
    }
}