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
    square.style.backgroundColor = '#ffffff';
    square.style.width = widthOfSquare;
    grid.appendChild(square);
  }
  addEvents();
};

function addEvents() {
  for (let square of squares) {
    square.removeEventListener('mouseover', setMode);
    square.addEventListener('mouseover', setMode);
  }
};

function setMode(e) {
  switch (currentMode) {
    case 'colorPicker':
      e.target.style.backgroundColor = colorPicker.value;
      break;
    case 'randomColor':
      e.target.style.backgroundColor = getRandomColor();
      break;
    case 'darkeningEffect':
      e.target.style.backgroundColor = getDarkeningEffect(e);
  }
};

const eraseGrid = document.querySelector('#eraseGrid');
eraseGrid.addEventListener('click', () => {
  for (let square of squares) {
    square.style.backgroundColor = '#ffffff';
  }
});

const changeGrid = document.querySelector('#changeGrid');
changeGrid.addEventListener('click', e => {
  let squaresPerSide = e.target.value;
  while (grid.lastChild) {
    grid.lastChild.remove()
  };
  createGrid(squaresPerSide);
});

const showGridSize = document.querySelector('#showGridSize');
changeGrid.addEventListener('input', e => {
  showGridSize.textContent = `${e.target.value} x ${e.target.value}`;
});

const gridMeshOpacity = document.querySelector('#gridMeshOpacity');
const showGridMeshOpacity = document.querySelector('#showGridMeshOpacity');
gridMeshOpacity.addEventListener('input', e => {
  let opacityValue = e.target.value / 100;
  showGridMeshOpacity.textContent = opacityValue;
  for (let square of squares) {
    square.style.border = `1px solid rgba(0, 0, 0, ${opacityValue})`;
  }
});

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
  if (currentMode !== 'colorPicker') {
    currentMode = 'colorPicker';
    addEvents();
  }
});

const btnRandomColor = document.querySelector('#modeRandomColor');
btnRandomColor.addEventListener('click', () => {
  if (currentMode !== 'randomColor') {
    currentMode = 'randomColor';
    addEvents();
  }
});

const btnDarkeningEffect = document.querySelector('#modeDarkeningEffect');
btnDarkeningEffect.addEventListener('click', () => {
  if (currentMode !== 'darkeningEffect') {
    currentMode = 'darkeningEffect';
    addEvents();
  }
});

// Softer darkening. For subtract 10% per iteration is -25.5
function getDarkeningEffect(e) {
  let detectedColor = e.target.style.backgroundColor;
  if (detectedColor && detectedColor !== 'rgb(0, 0, 0)') {
    let regExp = /\d{1,3}/g;
    let rgbValues = detectedColor.match(regExp);
    let subtractedValues = rgbValues.map(value => {
      return value - 10;
    })
    let result = `rgb(${subtractedValues[0]}, ${subtractedValues[1]}, ${subtractedValues[2]})`;
    return result;
  }
};