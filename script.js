// Grid creation
function createGrid(dimension) {
    gridContainer = document.querySelector('#gridContainer');
    for (i = 0; i < parseInt(dimension * dimension); i++) {
        newCell = document.createElement('div');
        gridContainer.appendChild(newCell);
    }
    allCells = document.querySelectorAll('#gridContainer div');
    allCells.forEach((cell) => {
        cell.classList.toggle('pixelDiv');
    });
    switch (dimension) {
        case '16':
            allCells.forEach((cell) => {
                cell.classList.toggle('smallDiv');
            });
            break;
        case "64":
            allCells.forEach((cell) => {
                cell.classList.toggle('largeDiv');
            });
            break;
        default:
            allCells.forEach((cell) => {
                cell.classList.toggle('mediumDiv');
            });
            break;
    }
    gridContainer.addEventListener('mousedown', () => {
        allCells.forEach((cell) => {
            cell.addEventListener('mouseover', color);
        });
    });
    /* !IMPORTANTE! Per poter rimuovere un event listener bisogna che, sia quando viene aggiunto che rimosso (add o remove)
    la funzione non si anonima e in particolare che sia assegnata ad una VARIABILE. L'elemento e (o event) va passato alla
    funzione direttamente quando viene dichiarata, con la sintassi 'nomeFunzione = function (e) { codice }' */
    gridContainer.addEventListener('mouseup', () => {
        allCells.forEach((cell) => {
            cell.removeEventListener('mouseover', color);
        });
    });
}

// Resize buttons
function deleteGrid() {
    allCells.forEach((cell) => {
        cell.remove();
    })
}
dimensionButtons = document.querySelectorAll('#gridDimensions button');
dimensionButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        dimension = e.target.textContent;
        deleteGrid();
        createGrid(dimension);
    })
})

// Clear button
clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click', () => {
    allCells.forEach((cell) => {
        cell.style.backgroundColor = "whitesmoke";
    })
})

// Color function
currentMode = '';
let color = function (e) {
    switch (currentMode) {
        case 'color':
            currentColor = pickedColor;
            break;
        case 'eraser':
            currentColor = 'whitesmoke';
            break;
        case 'rainbow':
            let red, green, blue;
            red = randomGen();
            green = randomGen();
            blue = randomGen();
            while (red > 200 && green > 200 && blue > 200) {
                red = randomGen();
                green = randomGen();
                blue = randomGen();
            }
            currentColor = `rgb(${red}, ${green}, ${blue})`;
            break;
        case 'progressive':
            actualColor = e.target.style.backgroundColor;
            switch (actualColor) {
                case 'rgb(200, 200, 200)':
                    currentColor = 'rgb(150, 150, 150)';
                    break;
                case 'rgb(150, 150, 150)':
                    currentColor = 'rgb(100, 100, 100)';
                    break;
                case 'rgb(100, 100, 100)':
                    currentColor = 'rgb(50, 50, 50)';
                    break;
                case 'rgb(50, 50, 50)':
                    currentColor = 'rgb(0, 0 , 0)';
                    break;
                case 'rgb(0, 0, 0)':
                    currentColor = 'rgb(0, 0, 0)';
                    break;
                default:
                    currentColor = 'rgb(200, 200, 200)';
                    break;
            }
            break;
        default: 
            currentColor = '#000000';
    }
    e.target.style.backgroundColor = currentColor
}

// Color picker 
let pickedColor = '#000000';
colorPicker = document.querySelector('#chooseColor');
colorPicker.addEventListener('change', (e) => {
    currentMode = 'color';
    pickedColor = e.target.value;
})

// Color mode
const colorButton = document.querySelector('#colorMode');
colorButton.addEventListener('click', () => {
    currentMode = 'color';
})

// Eraser mode
const eraserButton = document.querySelector('#eraserMode');
eraserButton.addEventListener('click', () => {
    currentMode = 'eraser';
})

// Rainbow mode
function randomGen() {
    return Math.floor(Math.random() * 250);
}
const rainbowButton = document.querySelector('#rainbowMode');
rainbowButton.addEventListener('click', () => {
    currentMode = 'rainbow';
})

// Progressive Dark mode
const progressiveButton = document.querySelector('#progressiveDarkMode');
progressiveButton.addEventListener('click', () => {
    currentMode = 'progressive';
})


createGrid(32);