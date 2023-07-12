const grid = document.querySelector('#grid');
const squares = document.getElementsByClassName('square');

function createGrid(squaresPerSide) {
  let totalSquares = squaresPerSide * squaresPerSide;
  let widthOfSquare = `${100 / squaresPerSide}%`;
  for(i = 1; i <= totalSquares; i++) {
    let square = document.createElement('div');
    square.classList.add('square');
    square.style.width = widthOfSquare;
    square.style.backgroundColor = '#ffffff';
    square.style.border = `1px solid rgba(0, 0, 0, ${gridMeshOpacity.value / 100})`;
    square.addEventListener('mouseover', setMode);
    grid.appendChild(square);
  }
};

// Deactivate dragging
grid.addEventListener('mousedown', (e) => {
  e.preventDefault();
});

let isDrawing = false;
window.addEventListener('mousedown', () => {
  isDrawing = true;
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

colorPicker.addEventListener('change', (e) => {
  // IF the new color does not exist in the color palette, it is added to the color palette:
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
  if (currentMode !== 'colorPicker') currentMode = 'colorPicker';
});

function selectColor(e) {
  colorPicker.value = e.target.value;
  if (currentMode !== 'colorPicker') currentMode = 'colorPicker';
};

const btnColorPicker = document.querySelector('#modeColorPicker');
btnColorPicker.addEventListener('click', () => {
  if (currentMode !== 'colorPicker') currentMode = 'colorPicker';
});

function getRandomColor() {
  let getRandomNumber = () => Math.floor(Math.random() * 256);
  let color = `rgb(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()})`;
  return color;
};

const btnRandomColor = document.querySelector('#modeRandomColor');
btnRandomColor.addEventListener('click', () => {
  if (currentMode !== 'randomColor') currentMode = 'randomColor';
});

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

const btnDarkeningEffect = document.querySelector('#modeDarkeningEffect');
btnDarkeningEffect.addEventListener('click', () => {
  if (currentMode !== 'darkeningEffect') currentMode = 'darkeningEffect';
});

function getBrighteningEffect(e) {
  let detectedColor = e.target.style.backgroundColor;
  if (detectedColor && detectedColor !== 'rgb(255, 255, 255)') {
    let rgbValues = detectedColor.match(rgbRegExp);
    let subtractedValues = rgbValues.map(value => +value + 10);
    let result = `rgb(${subtractedValues[0]}, ${subtractedValues[1]}, ${subtractedValues[2]})`;
    return result;
  }
};

const btnBrighteningEffect = document.querySelector('#modeBrighteningEffect');
btnBrighteningEffect.addEventListener('click', () => {
  if (currentMode !== 'brighteningEffect') currentMode = 'brighteningEffect';
})

const eraseGrid = document.querySelector('#eraseGrid');
eraseGrid.addEventListener('click', () => {
  for (let square of squares) {
    square.style.backgroundColor = '#ffffff';
  }
});

createGrid(16);