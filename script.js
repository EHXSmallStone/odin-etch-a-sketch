const grid = document.querySelector('#grid');
createGrid(16);
let currentMode = "setBlackMode";
setMode();

function createGrid(squaresNumber) {
  for(i = 1; i <= squaresNumber * squaresNumber; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${100 / squaresNumber}%`;
    grid.appendChild(square);
  }
};

function clearGrid() {
  let squares = document.querySelectorAll('.square');
  for(let square of squares) {
    grid.removeChild(square);
  }
};

const btnChangeGrid = document.querySelector('#changeGrid');
btnChangeGrid.addEventListener('click', () => {
  let squaresNumber = recursivePrompt();
  clearGrid();
  createGrid(squaresNumber);
  setMode();
});

const recursivePrompt = () => {
  let answer = +prompt('Enter the number of squares per side for the grid', '16');
  if (answer > 100) {
    alert('It\'s too much! The maximum value is 100');
    return recursivePrompt();
  } else {
    return answer;
  }
};

function setMode() {
  let squares = document.querySelectorAll('.square');
  for (let square of squares) {
    square.addEventListener('mouseover', () => {
      if (currentMode === 'setBlackMode') {
        square.style.backgroundColor = 'black';
      } else if (currentMode === 'setBlueMode') {
        square.style.backgroundColor = 'blue';
      }
    })
  };
}

const setModeButtons = document.querySelectorAll('.setMode');
for (let button of setModeButtons) {
  button.addEventListener('click', (e) => {
    currentMode = e.target.id;
    setMode();
  })
};