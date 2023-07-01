const grid = document.querySelector('#grid');
const squares = document.getElementsByClassName('square');
const colorPicker = document.querySelector('#colorPicker');
let currentMode = 'colorPicker';
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
      switch (currentMode) {
        case 'colorPicker':
          square.style.backgroundColor = colorPicker.value;
          break;
        case 'randomColor':
          square.style.backgroundColor = getRandomColor();
          break;
      }
    })
  }
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
  } else if (answer > 100) {
    alert('It\'s too much! The maximum value is 100');
    return recursivePrompt();
  } else if (answer < 3) {
    alert('That is very little! At least it must be 3');
    return recursivePrompt();
  } else {
    return answer;
  }
};

const colorPalette = document.querySelector('#colorPalette');

let currentColors = [];
for (let color of colorPalette.children) {
  currentColors.push(color.value);
};

colorPicker.addEventListener('change', (e) => {
// IF the new color does not exist in the color palette, it is added to the color palette.
  if (currentColors.indexOf(e.target.value) === -1) {
    let option = document.createElement('option');
    option.value = e.target.value;
    colorPalette.appendChild(option);
    currentColors.push(e.target.value);
  }
  btnColorPicker.style.backgroundColor = colorPicker.value;
});

function getRandomColor() {
  let getRandomNumber = () => Math.floor(Math.random() * 256);
  let color = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
  return color;
};

const btnColorPicker = document.querySelector('#modeColorPicker');
btnColorPicker.addEventListener('click', () => {
  currentMode = 'colorPicker';
  setMode();
});

const btnRandomColor = document.querySelector('#modeRandomColor');
btnRandomColor.addEventListener('click', () => {
  currentMode = 'randomColor';
  setMode();
});