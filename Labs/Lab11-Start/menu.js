const menuList = [
    {
      id: 1,
      title: "buttermilk pancakes",
      category: "breakfast",
      price: 15.99,
      img: "./images/item-1.jpeg",
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: "diner double",
      category: "lunch",
      price: 13.99,
      img: "./images/item-2.jpeg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: "godzilla milkshake",
      category: "shakes",
      price: 6.99,
      img: "./images/item-3.jpeg",
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: "country delight",
      category: "breakfast",
      price: 20.99,
      img: "./images/item-4.jpeg",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: "egg attack",
      category: "lunch",
      price: 22.99,
      img: "./images/item-5.jpeg",
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: "oreo dream",
      category: "shakes",
      price: 18.99,
      img: "./images/item-6.jpeg",
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 7,
      title: "bacon overflow",
      category: "breakfast",
      price: 8.99,
      img: "./images/item-7.jpeg",
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 8,
      title: "american classic",
      category: "lunch",
      price: 12.99,
      img: "./images/item-8.jpeg",
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
      id: 9,
      title: "quarantine buddy",
      category: "shakes",
      price: 16.99,
      img: "./images/item-9.jpeg",
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
  ];
  
//   return `<div class="menu-item-col">
//   <img src= alt=>
//   <div class="item-info">
//       <header>
//           <h4></h4>
//           <h4 class="price"></h4>
//       </header>
//       <p class="item-text"></p>
//   </div>
// </div>`

// return `<button class="filter-btn" type="button" data-id=  >  </button>`

const sectionCenter = document.querySelector(".menu-wrap-section");//get parent element
const demoItem = document.querySelector(".menu-item-col");//get demo content element
sectionCenter.removeChild(demoItem); //remove div with demo content
const btnContainer = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", function () {

  for (let item of menuList){ 
    const menuItem = this.document.createElement("div");
    menuItem.classList.add("menu-item-col");

    const itemImage = this.document.createElement("img");
    itemImage.src = item.img;
    itemImage.alt = item.title;
    menuItem.appendChild(itemImage);

    const itemInfo = this.document.createElement("div");
    itemInfo.classList.add("item-info");

    const itemHeader = this.document.createElement("header");

    const itemTitle = this.document.createElement("h4");
    itemTitle.textContent = item.title;
    itemHeader.appendChild(itemTitle);

    const itemPrice = this.document.createElement("h4");
    itemPrice.classList.add("price");
    itemPrice.textContent = item.price;
    itemHeader.appendChild(itemPrice);
    
    itemInfo.appendChild(itemHeader);

    const itemDescription = this.document.createElement("p");
    itemDescription.classList.add("item-text");
    itemDescription.textContent = item.desc;
    itemInfo.appendChild(itemDescription);

    menuItem.appendChild(itemInfo);
    sectionCenter.appendChild(menuItem);

  }

    
});
