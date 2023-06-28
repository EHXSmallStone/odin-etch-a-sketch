const gridContainer = document.querySelector('.gridContainer');

for(i = 1; i <= 256; i++) {
  let square = document.createElement('div');
  square.classList.add("square");
  gridContainer.appendChild(square);
}