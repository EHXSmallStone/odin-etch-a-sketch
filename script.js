const grid = document.querySelector('#grid');
let currentMode = "setBlackMode";
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

const changeGrid = document.querySelector('#changeGrid');
changeGrid.addEventListener('click', () => {
  let squaresNumber = recursivePrompt();
  // clearGrid:
  let squares = document.querySelectorAll('.square');
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

const eraseGrid = document.querySelector('#eraseGrid');
eraseGrid.addEventListener('click', () => {
  let squares = document.querySelectorAll('.square');
  for (let square of squares) {
    square.style.backgroundColor = "white";
  }
});