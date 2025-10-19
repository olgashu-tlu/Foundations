const colors = ["green", "red", "purple", "aqua", "blue", "black", "white", "yellow"];


const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");

const colorText = document.querySelector("#colorPanel");
const colorCode = document.querySelector("#colorCode");

// Color
function ranrandomColor()
{
    console.log('First btn clicked');
    let colorIndex = Math.floor(Math.random()*colors.length);
    console.log(colorIndex);

    colorPanel.style.backgroundColor = colors[colorIndex];
    colorCode.innerText = colors[colorIndex];

}
btn1.addEventListener('click',ranrandomColor);


// RGB
function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const rgbColor = `rgb(${r}, ${g}, ${b})`;

  colorPanel.style.backgroundColor = rgbColor;
  colorCode.innerText = rgbColor;
}
btn2.addEventListener("click", randomRGB);

// HEX 
function randomHEX() {
  let hex = "#";
  const hexChars = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) {
    hex += hexChars[Math.floor(Math.random() * 16)];
  }

  colorPanel.style.backgroundColor = hex;
  colorCode.innerText = hex;
}
btn3.addEventListener("click", randomHEX);
