const grid = document.querySelector('#grid');
const squares = document.getElementsByClassName('square');
const colorPicker = document.querySelector('#colorPicker');
createGrid(16);

function createGrid(squaresNumber) {
  for(i = 1; i <= squaresNumber * squaresNumber; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${100 / squaresNumber}%`;
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
    square.style.backgroundColor = "white";
  }
});

const changeGrid = document.querySelector('#changeGrid');
changeGrid.addEventListener('click', () => {
  let squaresNumber = recursivePrompt();
  // clearGrid:
  for(let square of squares) {
    grid.removeChild(square);
  };
  createGrid(squaresNumber);
});

const recursivePrompt = () => {
  let answer = +prompt('Enter the number of squares per side for the grid', '16');
  if (answer > 100) {
    alert('It\'s too much! The maximum value is 100');
    return recursivePrompt();
  } else if (answer < 1) {
    alert('That is very little! At least it must be 1');
    return recursivePrompt();
  } else {
    return answer;
  }
};