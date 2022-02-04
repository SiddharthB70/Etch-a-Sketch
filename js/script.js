let presentBackground = "../img/clear.jpg";
let prevMode = null, presentMode = null;

function enterButtons(){
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(function(button){
        if(button.id != "cells"){
            button.addEventListener("mouseenter",hoverDesign);
            button.addEventListener("mouseleave",revertDesign);
            if(button.id != "clear")
                button.addEventListener("click",pickMode);
        }
        
    })
}

function hoverDesign(e){
    if(e.target.id != "clear")
        hoverBackground(e.target);
    selectButton(e.target);    
}

function revertDesign(e){
    if(e.target.id != "clear")
        revertBackground();
    selectButton(e.target);
}

function hoverBackground(button){
    let imgLink;
    switch(button.id){
        case "black":   imgLink = "../img/black.png";  
                        break;
        case "rgb": imgLink = "../img/rgb.jpg";
                    break;
        case "eraser":  imgLink = "../img/eraser.jpg";
                        break;            
    }
    const backgroundImg = document.getElementById("background-image");
    backgroundImg.src = imgLink;
}

function revertBackground(){
    const backgroundImg = document.getElementById("background-image");
    backgroundImg.src = presentBackground;
}


function selectButton(button){
    button.classList.toggle("hover");
}

function pickMode(e){
    presentMode = e.target.id;
    if(prevMode == null)
        prevMode = e.target.id;
    else{
        if(prevMode == presentMode)
            presentMode = null;
    }
    pickBackground(e.target);
    pickButton(e.target);
}

function pickBackground(button){
    const backgroundImg = document.getElementById("background-image");
    if(presentMode == null){
        presentBackground = "../img/clear.jpg";
        revertBackground();
    }
    else{
        presentBackground = backgroundImg.src
        hoverBackground(button);
    }
}

function pickButton(presentButton){
    if(presentMode == null){
        presentButton.addEventListener("mouseenter",hoverDesign);
        presentButton.addEventListener("mouseleave",revertDesign);
        prevMode = null;
    }
    else{
        const prevButton = document.getElementById(prevMode);
        if(prevMode != presentMode){
            prevButton.addEventListener("mouseenter",hoverDesign);
            prevButton.addEventListener("mouseleave",revertDesign);
            selectButton(prevButton);
            prevMode = presentMode;
        }
        presentButton.removeEventListener("mouseenter",hoverDesign);
        presentButton.removeEventListener("mouseleave",revertDesign);
    }
}

enterButtons();

