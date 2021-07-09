const container = document.querySelector(".container");
const clearButton = document.querySelector(".clearButton");
const sizeSlider = document.querySelector(".sizeSlider");
const sizeText = document.querySelector(".sizeText");
const blackInkButton = document.querySelector(".blackInkButton");
const rainbowInkButton = document.querySelector(".rainbowInkButton");
const eraserButton = document.querySelector(".eraserButton");
const pickColorSelecter = document.querySelector(".pickColorSelecter");

var colorStatus = "default";
var penBoolean = false;

function widthOfCells(rows) {
    const containerWidth = container.clientWidth;
    console.log(containerWidth);
    return containerWidth / rows;
}

function colorCell(cell) {
    cell.target.style.backgroundColor = pickColorSelecter.value;
}

function colorCellBlack(cell) {
    cell.target.style.backgroundColor = "black";
}

function eraseCell(cell) {
    cell.target.style.backgroundColor = "white";
}

function randomColorCell(cell) {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    cell.target.style.backgroundColor = "#" + randomColor;
}

function activateColor(cell) {
    if (penBoolean) {
        switch (colorStatus) {
            case "default":
                cell.target.style.backgroundColor = pickColorSelecter.value;
                break;
            case "black":
                cell.target.style.backgroundColor = "black";
                break;
            case "erase":
                cell.target.style.backgroundColor = "white";
                break;
            case "rainbow":
                /** taken from https://css-tricks.com/snippets/javascript/random-hex-color/ */
                var randomColor = Math.floor(Math.random()*16777215).toString(16);
                cell.target.style.backgroundColor = "#" + randomColor;
                break;
            default:
                cell.target.style.backgroundColor = pickColorSelecter.value;
                break;
        }
    }
}

function penToggle() {
    const cells = document.querySelectorAll(".canvasCell");
    if (!penBoolean) {
        cells.forEach((cell) => {
            cell.addEventListener("mouseover", (c) => {
                activateColor(c);
            })
        })
        penBoolean = true;
    } else {
        cells.forEach((cell) => {
            cell.removeEventListener("mouseover", (c) => {
                activateColor(c);
            })
        })
        penBoolean = false;
    }
    console.log(penBoolean);
}

function addPenToggle() {
    const cells = document.querySelectorAll(".canvasCell");
    cells.forEach((cell) => {
            cell.addEventListener("click", penToggle)
    })
}



function colorCells() {
    colorStatus = "default";
}

function colorCellsBlack() {
    colorStatus = "black";
}

function eraseCells() {
    colorStatus = "erase";
}

function rainbowCells() {
    colorStatus = "rainbow";
}



function makeCanvas(rows, cols) {
    var cellSize = widthOfCells(cols);
    for (i = 0; i < rows; i++) {
        const canvasRow = document.createElement("div");
        canvasRow.style.height = cellSize;
        for (j = 0; j < cols; j++) {
            const canvasCell = document.createElement("div");
            canvasCell.style.width = cellSize;
            canvasCell.style.height = cellSize;
            canvasRow.appendChild(canvasCell).className = "canvasCell";
        }
        container.appendChild(canvasRow).className = "canvasRow";
    }
    clearGrid();
    addPenToggle();
    colorCells();
}

function clearGrid() {
    const cells = document.querySelectorAll(".canvasCell");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "white";
    })
}

function updateSize() {
    container.innerHTML = "";
    var size = sizeSlider.value; 
    sizeText.textContent = "Grid Size: " + size + " x " + size;
    if (colorStatus == "rainbow") {
        makeCanvas(size, size);
        rainbowCells();
    } else {
        makeCanvas(size, size);
    }
    penBoolean = false;
}



clearButton.addEventListener("click", clearGrid);
blackInkButton.addEventListener("click", colorCellsBlack);
eraserButton.addEventListener("click", eraseCells);
rainbowInkButton.addEventListener("click", rainbowCells);
pickColorSelecter.addEventListener("input", colorCells);




