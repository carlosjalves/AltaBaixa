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

        if (elementTop < 100) {
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

window.addEventListener("scroll", reveal);


function myFunction() {
    let x = document.getElementById("myLinks");

    if (x.style.height === "100vh") {
        x.style.height = "0";
    } else {
        x.style.height = "100vh";
    }
}