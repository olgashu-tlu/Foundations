const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];


const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");

const colorText = document.querySelector("#colorPanel");
const colorCode = document.querySelector("#colorCode");


function ranrandomColor()
{
    console.log('First btn clicked');
    let colorIndex = Math.floor(Math.random()*colors.length);
    console.log(colorIndex);

    colorPanel.style.backgroundColor = colors[colorIndex];
    colorText.innerText = colors[1];

}
btn1.addEventListener('click',ranrandomColor);

//generate new value using rgba(133,122,200)