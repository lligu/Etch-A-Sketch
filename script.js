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
}

function deleteGrid() {
    allCells.forEach((cell) => {
        cell.remove();
    })
}

function resizeGrid() {
    dimensionButtons = document.querySelectorAll('#gridDimensions button');
    dimensionButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            dimension = e.target.textContent;
            deleteGrid();
            createGrid(dimension);
        })
    })
}

function clear() {
    clearButton = document.querySelector('#clearButton');
    clearButton.addEventListener('click', () => {
        allCells.forEach((cell) => {
            cell.style.backgroundColor = "whitesmoke";
        })
    })
}

function color() {
    e.target.style.backgroundColor = "rgb(40, 40, 40)";
}

clear();
resizeGrid();
createGrid(32);