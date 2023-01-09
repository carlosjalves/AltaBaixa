let indice = document.getElementById("index-container");
let text = document.getElementsByClassName("animate-flicker")[0];

function hideStamps() {
    let x = document.getElementById("hide-stamps")
    let y = document.getElementsByClassName("stamps-background")[0]
    let z = document.getElementById("Stamps")

    if (z.style.top === (window.innerHeight - 50)+"px"){
        z.style.top = window.innerHeight+"px"
        y.style.bottom = "-70px"
        x.style.bottom = "30px"
        x.style.width = "30px"
        x.style.height = "30px"
        x.style.fontSize = "15px"
        x.style.borderWidth = "2.9px"
        x.style.transform = "rotate(180deg)"
    } else {
        z.style.top = (window.innerHeight-50)+"px"
        y.style.bottom = "0";
        x.style.bottom = "60px"
        x.style.width = "25px"
        x.style.height = "25px"
        x.style.fontSize = "11px"
        x.style.borderWidth = "2.8px"
        x.style.transform = "rotate(0deg)"
    }
}


//P5.js

let img = [];
let canvas;
let x;
let imgz;

let s2 = function( sketch ) {
    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, (document.getElementById("body").clientHeight));
    }

    sketch.setup = function () {
        canvas = sketch.createCanvas(sketch.windowWidth, (document.getElementById("body").clientHeight));
        canvas.position(0,0);
        canvas.style('z-index','-1')
        sketch.imageMode(sketch.CENTER);

        let div = sketch.createDiv();
        div.id("Stamps")
        div.position('50%', sketch.windowHeight, 'fixed')
        div.style('transform', 'translate(-540px, 0)')

        for(let i = 0; i <= 26; i++){
            img[i] = sketch.createImg(
                'data/stamps/'+i+'.png',
                ''
            );

            if(i===26){
                img[i].position((26*40),0);
                img[i].style('opacity', '0.5');
                img[i].mousePressed(sketch.reset);
            }else{
                img[i].position((i*40),0);
                img[i].mousePressed(sketch.clicked);
            }

            img[i].parent("Stamps")
            img[i].class("letters")
            img[i].id(""+i+"");
            img[i].size(40,40);
        }
    }

    sketch.clicked = function () {
        for(let i = 0; i <= 25; i++) {
            img[i].style('filter', 'none');
        }

        x = this.id();
        imgz = sketch.loadImage('data/stamps/'+x+'.png');
        img[x].style('filter','invert(17%) sepia(97%) saturate(3304%) hue-rotate(313deg) brightness(88%) contrast(120%)')

        document.getElementById("body").style.cursor = "url('data/stamps/"+x+".png') 50 50, auto";
    }

    sketch.reset = function () {
        for(let i = 0; i <= 25; i++) {
            img[i].style('filter', 'none');
        }

        document.getElementById("body").style.cursor = "auto";

        imgz = undefined;
        sketch.clear();
    }

    sketch.draw = function () {

        if(imgz !== undefined){
            if (sketch.mouseIsPressed && sketch.mouseY < (sketch.windowHeight-70)) {
                sketch.image(imgz, sketch.mouseX, sketch.mouseY, 100,100);
            }
        }
    }
};




let imgA, imgb;
let posA = -2000;
let posb = 0;

let s1 = function( sketch ) {
    sketch.preload = function () {
        imgA = sketch.loadImage('data/logo/A.png');
        imgb = sketch.loadImage('data/logo/b.png')
    }

    sketch.setup = function () {
        sketch.createCanvas(500, 400);
    }

    sketch.draw = function () {
        sketch.background(255);
        sketch.image(imgA, 0, posA);
        sketch.image(imgb, 0, -posb);

        if(posA >= 400){
            let main = document.getElementsByTagName("main")[0];
            //console.log(main)
            indice.style.display = "grid";
            indice.classList.add("active");
            sketch.remove();
            main.style.top = "0"
            main.style.left = "0"
            main.style.transform = "translate(0,0)"
            new p5(s2);
        }

        if (posb <= 0){
            text.style.display = "block"
        }else{
            text.style.display = "none"
        }
    }

    sketch.mouseWheel = function (event) {
        if (posA < 400){
            posb += event.delta/10;
            posA += event.delta/10;
        }
    }
}

new p5(s1);