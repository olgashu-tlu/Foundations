// local reviews data
const reviews = [
    {
      id: 1,
      name: 'susan smith',
      job: 'web developer',
      img: 'https://images2.imgbox.com/e0/57/qI5bbwvg_o.jpeg',
      text: "Twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: 'anna johnson',
      job: 'web designer',
      img: 'https://images2.imgbox.com/2e/6e/JAMvTZ56_o.jpeg',
      text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
      id: 3,
      name: 'peter jones',
      job: 'intern',
      img: 'https://images2.imgbox.com/56/88/oJvFN3l5_o.jpeg',
      text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
    },
    {
      id: 4,
      name: 'bill anderson',
      job: 'the boss',
      img: 'https://images2.imgbox.com/8b/1c/vwWNTsCd_o.jpeg',
      text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
  ];

//Select elements from HTML by their id/class
const personImage = document.getElementById("person-img");// image element for the reviewer
const commentEl = document.getElementById("comment");// paragraph with review text
const authorEl = document.getElementById("reviewAuthor"); // element showing the reviewer's name
const jobEl = document.getElementById("job");// element showing the job title

const prevBtn = document.querySelector(".prev-btn");// button for previous review
const nextBtn = document.querySelector(".next-btn");// button for next review
const randomBtn = document.querySelector(".random-btn");// button for random review

// Current state (index of the visible review) 
let currentIndex = 0;

// Function that updates the content on the page
function render() {
  const item = reviews[currentIndex];// get the current review object
  personImage.src = item.img;// update photo
  commentEl.textContent = item.text;// update review text
  authorEl.textContent = item.name;// update reviewer's name
  jobEl.textContent = item.job;// update reviewer's job
}



// Move to the next review
nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex > reviews.length - 1) {
    currentIndex = 0; // if last review reached, go back to the first
  }
  render();
});

// Move to the previous review
prevBtn.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = reviews.length - 1; // if first review reached, go to the last
  }
  render();
});

//Show a random review
randomBtn.addEventListener("click", function () {
  currentIndex = Math.floor(Math.random() * reviews.length);
  render();
});

// Show the first review when the page loads 
render();
