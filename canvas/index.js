

function print(volume) {
    var volumeOfCircle = document.getElementById("volume");
    volumeOfCircle.innerText = volume;
}

function showVolume() {
    var radiusBox = document.getElementById("radiusBox");
    var radius = radiusBox.value;
  
    var volume = ((4 * Math.PI) * (Math.pow(radius, 3))) / 3;

    // validation
    if (radius > 200) {
        alert("radius value is not legal! ");
        radiusBox.style.border = "3px solid red";
        return false;
    }

    if (isNaN(radius)) {
        alert("radius value is not a number! ");
        radiusBox.style.border = "3px solid red";
        return false;
    }

    if (radius <= 0) {
        alert("radius value must be highr than zero! ");
        radiusBox.style.border = "3px solid red";
        return false;
    }

    print(volume);
    canvas(radius);
    return volume;
}

function canvas(radius) {
    var canvas = document.getElementById("myCanvas").getContext("2d");
    canvas.beginPath();
    canvas.arc(200, 200, radius, 0, 2 * Math.PI);
    canvas.strokeStyle = "red";
    canvas.stroke();
}

function clearCanvas() {
    var myCanvas = document.getElementById("myCanvas").getContext("2d");
    myCanvas.clearRect(0, 0, 400, 400);
}

// // bonus question
    var myRadius = 1;
    function newRadius() {
 if(myRadius <= 200){
    canvas2(myRadius);
    myRadius++;
}
}


 function timer() {

    setInterval(newRadius, 100);
}


function canvas2(radius) {
    var canvas = document.getElementById("myCanvas").getContext("2d");
    canvas.beginPath();
    canvas.arc(200, 200, radius, 0, 2 * Math.PI);
    canvas.strokeStyle = "red";
    canvas.stroke();
}