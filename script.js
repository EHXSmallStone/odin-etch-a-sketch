const gridContainer = document.querySelector('.gridContainer');

for(i = 1; i <= 256; i++) {
  let square = document.createElement('div');
  square.classList.add('square');
  gridContainer.appendChild(square);
}

const squares = document.querySelectorAll('.square');
for (let square of squares) {
  square.addEventListener('mouseover', () => {
    square.style.backgroundColor = 'black';
  })
};