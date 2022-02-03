let prevImage = null;
let prevButton = null;
function enterButtons(){
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(function(button){
        button.addEventListener("mouseenter",changeDesign);
        button.addEventListener("mouseleave",revertDesign);
        button.addEventListener("click",pickGrid)
    })
}

function changeDesign(e){
    changeBackground(e.target);
    hoverButton(e.target);    
}

function revertDesign(e){
    revertBackground();
    hoverButton(e.target);
}

function changeBackground(button){
    let imgLink;
    switch(button.id){
        case "black":   imgLink = "../img/black.png";  
                        break;
        case "rgb": imgLink = "../img/rgb.jpg";
                    break;
        case "eraser":  imgLink = "../img/eraser.jpg";
                        break;
        case "clear":   imgLink = "../img/clear.jpg";
                        break;
            
    }
    const backgroundImg = document.getElementById("background-image");
    prevImage = backgroundImg.src;
    backgroundImg.src = imgLink;
    // backgroundImg.classList.add("appear");
}

function revertBackground(){
    const backgroundImg = document.getElementById("background-image");
    backgroundImg.src = prevImage;
    // backgroundImg.classList.remove("appear");
    // setTimeout(function(){
    //     backgroundImg.src = prevImage;
    //     backgroundImg.classList.add("appear");
    // },1000)
}


function hoverButton(button){
    button.classList.toggle("hover");
}

function pickGrid(e){
    buttonPicked(e.target);
}

function buttonPicked(button){
    if(prevButton!=null){
        prevButton
    }
}


enterButtons();

