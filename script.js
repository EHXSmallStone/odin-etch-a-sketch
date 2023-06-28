const gridContainer = document.querySelector('#gridContainer');

for(i = 1; i <= 256; i++) {
  let square = document.createElement('div');
  square.style.width = "6.25%"
  square.classList.add('square');
  gridContainer.appendChild(square);
}

let squares = document.querySelectorAll('.square');
for (let square of squares) {
  square.addEventListener('mouseover', () => {
    square.style.backgroundColor = 'black';
  })
};

const btnChangeGrid = document.querySelector('#changeGrid');
btnChangeGrid.addEventListener('click', () => {
  let answer = +prompt('Enter the number of squares per side for the grid', '16');
  if (answer > 100) {
    alert('It\'s too much! The maximum value is 100')
    return;
  }

  for(let square of squares) {
    gridContainer.removeChild(square);
  }

  for(i = 1; i <= answer * answer; i++) {
    let square = document.createElement('div');
    square.style.width = `${100 / answer}%`;
    square.classList.add('square');
    gridContainer.appendChild(square);
  }

  squares = document.querySelectorAll('.square');
  for (let square of squares) {
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'black';
    })
  };
});