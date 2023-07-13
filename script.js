const grid = document.querySelector('#grid');
const squares = document.getElementsByClassName('square');

function createGrid(squaresPerSide) {
  let totalSquares = squaresPerSide * squaresPerSide;
  let widthOfSquare = `${100 / squaresPerSide}%`;
  for(let i = 1; i <= totalSquares; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.width = widthOfSquare;
    square.style.height = widthOfSquare;
    square.style.backgroundColor = '#ffffff';
    square.style.border = `1px solid rgba(0, 0, 0, ${gridMeshOpacity.value / 100})`;
    square.addEventListener('mouseover', setMode);
    square.addEventListener('mouseover', highlightCurrentSquare);
    grid.appendChild(square);
  }
};

// Deactivate dragging
grid.addEventListener('mousedown', (e) => {
  e.preventDefault();
});

let isDrawing = false;
window.addEventListener('mousedown', (e) => {
  isDrawing = true;
  if (e.target.classList.contains('square')) {
    setMode(e);
  }
});
window.addEventListener('mouseup', () => {
  isDrawing = false;
});

let currentMode = 'colorPicker';
function setMode(e) {
  if (!isDrawing) return;
  switch (currentMode) {
    case 'colorPicker':
      e.target.style.backgroundColor = colorPicker.value;
      break;
    case 'randomColor':
      e.target.style.backgroundColor = getRandomColor();
      break;
    case 'darkeningEffect':
      e.target.style.backgroundColor = getDarkeningEffect(e);
      break;
    case 'brighteningEffect':
      e.target.style.backgroundColor = getBrighteningEffect(e);
      break;
  }
};

function highlightCurrentSquare(e) {
  let rgbValues = e.target.style.backgroundColor.match(rgbRegExp);
  if (rgbValues.filter(value => +value < 100).length > 1) {
    e.target.style.boxShadow = 'inset 0 0 3px 1px rgb(255, 255, 255, 1)';
    e.target.style.borderRadius = '10px';
    grid.style.backgroundColor = '#fff'
  } else {
    e.target.style.boxShadow = 'inset 0 0 3px 1px rgb(0, 0, 0, 0.5)';
    e.target.style.borderRadius = '10px';
    grid.style.backgroundColor = '#000'
  }
  e.target.addEventListener('mouseout', (e) => {
      e.target.style.boxShadow = 'none';
      e.target.style.borderRadius = '0px';
    });
};

const changeGrid = document.querySelector('#changeGrid');
changeGrid.addEventListener('click', (e) => {
// IF the square root of the number of total squares is equal to e.target.value, make no change.
// e.g. √256 (total squares) = 16 (e.target.value)
  if (Math.sqrt(squares.length) == e.target.value) return;
  let squaresPerSide = e.target.value;
  while (grid.lastChild) {
    grid.lastChild.remove()
  };
  createGrid(squaresPerSide);
});

const showGridSize = document.querySelector('output[for="changeGrid"]');
changeGrid.addEventListener('input', (e) => {
  showGridSize.textContent = `${e.target.value} x ${e.target.value}`;
});

const gridMeshOpacity = document.querySelector('#gridMeshOpacity');
const showGridMeshOpacity = document.querySelector('output[for="gridMeshOpacity"]');
gridMeshOpacity.addEventListener('input', (e) => {
  let opacityValue = e.target.value / 100;
  showGridMeshOpacity.textContent = opacityValue;
  for (let square of squares) {
    square.style.border = `1px solid rgba(0, 0, 0, ${opacityValue})`;
  }
});

const colorPicker = document.querySelector('#colorPicker');
const paletteColors = document.querySelectorAll('.paletteColor');
const currentColors = [];
// Add background colors and events to default colors:
for (let color of paletteColors) {
  color.style.backgroundColor = color.value;
  color.addEventListener('click', selectColor);
  currentColors.push(color.value);
};

function selectColor(e) {
  colorPicker.value = e.target.value;
  setColorPickerMode();
};

colorPicker.addEventListener('click', setColorPickerMode);
colorPicker.addEventListener('change', (e) => {
  if (!currentColors.includes(e.target.value)) {
    let input = document.createElement('input');
    input.classList.add('paletteColor');
    input.type = 'button';
    input.value = e.target.value;
    input.style.backgroundColor = e.target.value;
    input.addEventListener('click', selectColor);
    document.querySelector('#colorPaletteContainer').appendChild(input);
    currentColors.push(e.target.value);
  }
});

function getRandomColor() {
  let getRandomNumber = () => Math.floor(Math.random() * 256);
  let color = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
  return color;
};

let rgbRegExp = /\d{1,3}/g;
function getDarkeningEffect(e) {
  let detectedColor = e.target.style.backgroundColor;
  if (detectedColor && detectedColor !== 'rgb(0, 0, 0)') {
    let rgbValues = detectedColor.match(rgbRegExp);
    let subtractedValues = rgbValues.map(value => value - 10);
    // Softer darkening. For subtract 10% per iteration is -25.5
    let result = `rgb(${subtractedValues[0]}, ${subtractedValues[1]}, ${subtractedValues[2]})`;
    return result;
  }
};

function getBrighteningEffect(e) {
  let detectedColor = e.target.style.backgroundColor;
  if (detectedColor && detectedColor !== 'rgb(255, 255, 255)') {
    let rgbValues = detectedColor.match(rgbRegExp);
    let subtractedValues = rgbValues.map(value => +value + 10);
    let result = `rgb(${subtractedValues[0]}, ${subtractedValues[1]}, ${subtractedValues[2]})`;
    return result;
  }
};

const eraseGrid = document.querySelector('#eraseGrid');
eraseGrid.addEventListener('click', () => {
  let answer = prompt('Are you sure you want to clean the grid?\n\npress ENTER key to confirm\npress ESC key to cancel', 'y');
  if (!answer) {
    return;
  } else {
    answer = answer.toLowerCase();
  }
  if (answer && answer == 'y' || answer == 'yes') {
    for (let square of squares) {
      square.style.backgroundColor = '#ffffff';
    }
  } else {
    return;
  }
});

const setModeButtons = Array.from(document.querySelectorAll('.setModeButton'));
setModeButtons.forEach((button) => {
  button.addEventListener('mousedown', changeMode);
});

function changeMode(e) {
  currentMode = e.target.value;
  e.target.classList.add('currentMode');
  setModeButtons.filter(button => button.value !== currentMode).
  forEach(button => button.classList.remove('currentMode'));
};

const btnColorPicker = setModeButtons[0];
btnColorPicker.classList.add('currentMode');

function setColorPickerMode() {
  if (currentMode == 'colorPicker') return;
  currentMode = 'colorPicker';
  btnColorPicker.classList.add('currentMode');
  setModeButtons.filter(button => button.value !== currentMode).
  forEach(button => button.classList.remove('currentMode'));
}

// Insert draws

const fillEmptySquares = () => {
  Array.from(squares).
  filter(square => !square.style.backgroundColor).
  forEach(square => square.style.backgroundColor = '#fff');
};

const insertDraw = (squaresPerSide, array, index = 0) => {
  let totalSquares = squaresPerSide * squaresPerSide;
  let widthOfSquare = `${100 / squaresPerSide}%`;
  for(let i = 1; i <= totalSquares; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.width = widthOfSquare;
    square.style.height = widthOfSquare;
    square.style.backgroundColor = array[i + index];
    square.style.border = `1px solid rgba(0, 0, 0, ${gridMeshOpacity.value / 100})`;
    square.addEventListener('mouseover', setMode);
    square.addEventListener('mouseover', highlightCurrentSquare);
    grid.appendChild(square);
  }
  fillEmptySquares();
};

import { blueBird32 } from './drawings.js';
insertDraw(32, blueBird32);