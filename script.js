const grid = document.querySelector('#grid');
createGrid(16);

function createGrid(squaresNumber) {
  for(i = 1; i <= squaresNumber * squaresNumber; i++) {
    let square = document.createElement('div');
    square.style.width = `${100 / squaresNumber}%`;
    square.classList.add('square');
    grid.appendChild(square);
  }

  let squares = document.querySelectorAll('.square');
  for (let square of squares) {
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    })
  };
};

function clearGrid() {
  let squares = document.querySelectorAll('.square');
  for(let square of squares) {
    grid.removeChild(square);
  }
};

const btnChangeGrid = document.querySelector('#changeGrid');
btnChangeGrid.addEventListener('click', () => {
  let answer = +prompt('Enter the number of squares per side for the grid', '16');
  if (answer > 100) {
    alert('It\'s too much! The maximum value is 100')
    return;
  }
  clearGrid();
  createGrid(answer);
});