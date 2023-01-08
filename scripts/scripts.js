function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    //var reveals1 = document.querySelectorAll(".reveal1");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 500;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }

        if (elementTop < 50) {
            reveals[i].classList.add("out");
        } else {
            reveals[i].classList.remove("out");
        }

        /*var elementTop1 = reveals1[i].getBoundingClientRect().bottom;

        if (elementTop1 < windowHeight/2) {
            reveals1[i].classList.add("out");
        } else {
            reveals1[i].classList.remove("out");
        }*/
    }
}

/*function revealArticle2() {
    var reveals = document.querySelectorAll(".reveal2");

    for (var i = 0; i < reveals.length; i++) {
        var text = document.getElementById("article2-"+(i+1)+"")

        var windowHeight = window.innerHeight;
        var elementTop = text.getBoundingClientRect().top;
        var elementBottom = text.getBoundingClientRect().bottom;
        var elementVisible = 700;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }

        if (elementBottom < windowHeight - 150) {
            reveals[i].classList.add("out");
        } else {
            reveals[i].classList.remove("out");
        }
    }
}*/

function reveal_img() {
    var reveals = document.querySelectorAll(".revealimg");
    var text = document.getElementById("article")

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = text.getBoundingClientRect().bottom;
        var imageBottom = reveals[i].getBoundingClientRect().bottom
        var elementVisible = 100;

        if (elementTop < imageBottom){
            reveals[i].classList.remove("revealimg");
            reveals[i].classList.add("stickyimg");
        }else{
            reveals[i].classList.add("revealimg");
            reveals[i].classList.remove("stickyimg");
        }
    }
}

window.addEventListener("scroll", reveal);
window.addEventListener("scroll", reveal_img);
//window.addEventListener("scroll", revealArticle2);


function myFunction() {
    let x = document.getElementById("myLinks");

    if (x.style.height === "100vh") {
        x.style.height = "0";
    } else {
        x.style.height = "100vh";
    }
}


//P5.js

let img = [];
let canvas;
let x;
let imgz;

let s1 = function( sketch ) {
    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth-20, (document.getElementById("body").clientHeight)-110);
    }

    sketch.setup = function () {
        canvas = sketch.createCanvas(sketch.windowWidth-20, (document.getElementById("body").clientHeight)-110);
        canvas.position(0,0);
        canvas.style('z-index','-1')
        sketch.imageMode(sketch.CENTER);

        let div = sketch.createDiv();
        div.id("Stamps")
        div.position('50%', sketch.windowHeight-50, 'fixed')
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
            if (sketch.mouseIsPressed && sketch.mouseY<sketch.windowHeight-50) {
                sketch.image(imgz, sketch.mouseX, sketch.mouseY, 100,100);
            }
        }
    }
};

new p5(s1);

let imgA, imgb;
let posA = -200;
let posb = 0;
let logo;


let s2 = function( sketch ) {
    sketch.preload = function () {
        imgA = sketch.loadImage('data/logo/A.png');
        imgb = sketch.loadImage('data/logo/b.png')
    }

    sketch.setup = function () {
        logo = sketch.createCanvas(50, 40);
        logo.position(40,20, 'fixed');
        logo.style('z-index','5')
    }

    sketch.draw = function () {
        sketch.background(255);
        sketch.image(imgA, 0, posA,50,240);
        sketch.image(imgb, 0, -posb,50,240);

        if (posA > 0) posA = -200;
        if (posA < -200) posA = 0;
        if (posb > 200) posb = 0;
        if (posb < 0) posb = 200;
    }

    sketch.mouseWheel = function (event) {
        posb += event.delta/100;
        posA += event.delta/100;
    }

    /*sketch.mousePressed = function () {
        window.location = "index.html";
    }*/
}

new p5(s2);


