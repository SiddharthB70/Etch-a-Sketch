let presentBackground = "../img/clear.jpg";
let prevMode = null, presentMode = null;

const backgroundImg = document.getElementById("background-image");
const grid = document.getElementById("grid");

let mouseDown = false;
grid.addEventListener("mousedown",function(){mouseDown = true;},{capture:true});
grid.addEventListener("mouseup",function(){mouseDown = false;},{capture:true});

function enterButtons(){
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(function(button){
        if(button.id != "cells"){
            button.addEventListener("mouseenter",hoverDesign);
            button.addEventListener("mouseleave",revertDesign);
            if(button.id != "clear")
                button.addEventListener("click",pickMode);
            else
                button.addEventListener("click",clearGrid);
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
    backgroundImg.src = imgLink;
}

function revertBackground(){
    backgroundImg.src = presentBackground;
}


function selectButton(button){
    button.classList.toggle("hover");
}

function pickMode(e){
    presentMode = e.target.id;
    //prevMode is used to make sure that,while clicking buttons, the previous button is unchecked
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

function createGrid(){
    let i,j;
    for (i = 1; i <= 10; i++){
        const row = document.createElement("div");
        row.classList.add("grid-row");
        for(j = 1; j <= 10; j++){
            const cell = document.createElement("div");
            cell.classList.add("row-cell");
            cell.setAttribute("data-colored","null");
            cell.addEventListener("mousedown",gridMode);
            cell.addEventListener("mouseover",gridMode);
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function gridMode(e){
    if(presentMode == null || !mouseDown)
        return;
    const cell = e.target;
    let cellColored = cell.getAttribute("data-colored");
    switch(presentMode){
        case "black":   gridBlack(cell,cellColored);
                        break;
        case "rgb": gridRGB(cell,cellColored);
                    break;
        case "eraser": eraser(cell);
                        break;
    }

}

function gridBlack(cell,cellColored){
    if(cellColored === "null"){
        cell.style.setProperty("background-color","black");
        cell.setAttribute("data-colored","black");
    }
}

function gridRGB(cell,cellColored){
   if(cellColored === "null"){
       color = randomRGB();
       cell.style.setProperty("background-color",`rgb(${color[0]},${color[1]},${color[2]})`);// 0-R, 1-G, 2-B
       cell.setAttribute("data-colored","rgb");
       cell.setAttribute("data-shade","10");
       cell.setAttribute("data-originalcolor",`${[color[0],color[1],color[2]]}`); 
   }
   else if(cellColored === "rgb"){
        shadeCell(cell);
   }
}

function randomRGB(){
    let i,color = [],value;
    for(i=0;i<3;i++){
        value = Math.floor(Math.random()*256);
        color.push(value);
    }
    return color;
}

function shadeCell(cell){
    let originalColor = cell.getAttribute("data-originalcolor").split(","), 
        shade = cell.getAttribute("data-shade"),
        newColor = [];
    shade--;
    if(shade<0)
        return;
    originalColor.forEach(function(color){
        color = color * shade/10;
        newColor.push(color);
    })
    cell.style.setProperty("background-color",`rgb(${newColor[0]},${newColor[1]},${newColor[2]})`);
    cell.setAttribute("data-shade",`${shade}`);
}

function eraser(cell){
    cell.style.removeProperty("background-color");
    cell.setAttribute("data-colored","null");
    cell.removeAttribute("data-shade");
    cell.removeAttribute("data-originalcolor");
}

function clearGrid(){
    const cells = document.querySelectorAll(".row-cell");
    cells.forEach(function(cell){eraser(cell)});
}

function start(){
    enterButtons();
    createGrid();
}

start();
