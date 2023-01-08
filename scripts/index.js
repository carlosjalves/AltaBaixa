let imgA, imgb;
let posA = -2000;
let posb = 0;
let url = "index.html"

let indice = document.getElementById("index-container");

function preload() {
    imgA = loadImage('data/logo/A.png');
    imgb = loadImage('data/logo/b.png')
}

function setup() {
    createCanvas(500, 400);
}

function draw() {
    background(255);
    image(imgA, 0, posA);
    image(imgb, 0, -posb);

    //if(posA >= 400) window.location = url;
    if(posA >= 400){
        indice.style.display = "grid";
        indice.classList.add("active");
    }
}

function mouseWheel(event) {
    if (posA < 400){
        posb += event.delta/10;
        posA += event.delta/10;
    }
}