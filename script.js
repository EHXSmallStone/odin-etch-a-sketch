const grid = document.querySelector('#grid');
const squares = document.getElementsByClassName('square');
const colorPicker = document.querySelector('#colorPicker');
createGrid(16);

function createGrid(squaresPerSide) {
  let totalSquares = squaresPerSide * squaresPerSide;
  let widthOfSquare = `${100 / squaresPerSide}%`;
  for(i = 1; i <= totalSquares; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.width = widthOfSquare;
    grid.appendChild(square);
  }
  setMode();
};

function setMode() {
  for (let square of squares) {
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = colorPicker.value;
    })
  };
};

const eraseGrid = document.querySelector('#eraseGrid');
eraseGrid.addEventListener('click', () => {
  for (let square of squares) {
    square.style.backgroundColor = '#ffffff';
  }
});

const changeGrid = document.querySelector('#changeGrid');
changeGrid.addEventListener('click', () => {
  let squaresPerSide = recursivePrompt();
  if (!squaresPerSide) return;
  while (grid.lastChild) {
    grid.lastChild.remove()
  };
  createGrid(squaresPerSide);
});

const recursivePrompt = () => {
  let answer = prompt('Enter the number of squares per side for the grid', '16');
  if (answer === null) {
    return null;
  } else if (+answer > 100) {
    alert('It\'s too much! The maximum value is 100');
    return recursivePrompt();
  } else if (+answer < 3) {
    alert('That is very little! At least it must be 3');
    return recursivePrompt();
  } else {
    return +answer;
  }
};