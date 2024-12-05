const listItems = document.getElementById("nav-list").getElementsByTagName("li");

let section1 = document.getElementsByClassName('statistic')[0];
let section2 = document.getElementsByClassName('inCome')[0];
let section3 = document.getElementsByClassName('costs')[0];
let section4 = document.getElementsByClassName('nav-container')[0];

listItems[0].addEventListener("click", () => {
    section1.scrollIntoView({ behavior: 'smooth' });
});
listItems[1].addEventListener("click", () => {
    section2.scrollIntoView({ behavior: 'smooth' });
});
listItems[2].addEventListener("click", () => {
    section3.scrollIntoView({ behavior: 'smooth' });
});
listItems[3].addEventListener("click", () => {
    section4.scrollIntoView({ behavior: 'smooth' });
});


const localData = {
    salary: 0,
    deposit: 0,
    savings: 0,
    other: 0,
    Food: 0,
    Car: 0,
    "Public transport": 0,
    Clothes: 0,
    Utilities: 0,
    "Housing fee": 0,
    Anything: 0,
    firstVisit: 0,
    chartType: "bar"
};        
if (!localStorage.getItem('firstVisit')) {
    Object.entries(localData).forEach(([key, value]) => {
        localStorage.setItem(key, value);
    });
    localStorage.setItem('firstVisit', 'true');
}
    
 
