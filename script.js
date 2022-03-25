function createGrid(dimension) {
    gridContainer = document.querySelector('#gridContainer');
    gridDimension = 16;
    for (i = 0; i < dimension; i++) {
        newCell = document.createElement('div');
        gridContainer.appendChild(newCell);
    }
    allCells = document.querySelectorAll('#gridContainer div');
    allCells.forEach((cell) => {
        cell.classList.add('pixelDiv');
    });
    gridContainer.style.flexBasis = `${100/(dimension/2)}%`;
}

createGrid(16);