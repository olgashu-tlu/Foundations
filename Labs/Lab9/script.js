let grades = [50,89,75,84,99,52];
let sum = 0;

//using a normal array indexing--------
for(let i = 0; i<grades.length; i+=2)
{
    if(i%3 ==0)
    sum += grades[i];
}

console.log(sum);
let result = sum/ (grades.length)/2;
console.log(result);





// using for of loop--------------------
sum=0;
for(let item of grades)
{
     sum += item;
}

console.log(sum);
result = sum/ grades.length;
console.log(result);




//const countries = ["Germany", "France", "Italy", "USA", "Canada"];
//let country1 = countries[0];
//let country2 = countries[1];
//let country3 = countries[2];

//let [country1, country2, country3] = countries;

//[country1, ,... country2] = countries;//---------------///?????
//console.log(country1, country2);

//countries.forEach((value) =>{
 //   console.log("This is", value);
//})




//countries.forEach((value, index) =>{
  //  console.log("This is", value, "of index", index);
//})


//function printNum(value, index){
   // console.log("This is", value, "of index", index);
//}


const numbers = [15,23,8,42,4];
const firstLargeNumber = numbers.find(num => num ===5); // if num =5

if (!firstLargeNumber){
console.log("Sorry could not find");
}
console.log(!firstLargeNumber);


