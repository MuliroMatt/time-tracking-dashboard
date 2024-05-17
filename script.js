const allCards = document.querySelectorAll('.report__card__front');
const timeframeBtns = document.querySelector('.report__card__back__list');
const cards = Array.from(allCards).slice(1);
// timeframeBtns.style.backgroundColor = 'blue'

let myData = [];
let timeframe = 'monthly';
let previousTimeframe = 'Last Month';

const addDataToCard = () => {
   for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      let data = myData[i];
      const timeData = myData[i].timeframes[timeframe];
      card.innerHTML = '';
      if (myData.length > 0) {
         let newReport = document.createElement('div');
         newReport.innerHTML = `
            <div class="report__card__front__top">
              <span class="report__card__front__top__title">${data.title}</span>
              <a class="report__card__front__top__ellipsis" href=""><img src="images/icon-ellipsis.svg" alt="icon-ellipsis"></a>
            </div>
            <div class="report__card__front__time">
              <h2 class="report__card__front__time__current">${timeData.current}hrs</h2>
              <span class="report__card__front__time__previous">${previousTimeframe} - ${timeData.previous}hrs</span>
            </div>`;
         card.appendChild(newReport);
      }
   }
};

timeframeBtns.addEventListener('click', (e) => {
   const buttons = timeframeBtns.querySelectorAll('a');
   buttons.forEach((button) => button.classList.remove('active'));
   e.target.classList.add('active');
   
   if (e.target.innerHTML == 'Daily') {
      timeframe = 'daily';
      previousTimeframe = 'Yesterday';
   } else if (e.target.innerHTML == 'Weekly') {
      timeframe = 'weekly';
      previousTimeframe = 'Last Week';
   } else if (e.target.innerHTML == 'Monthly') {
      timeframe = 'monthly';
      previousTimeframe = 'Last Month';
   }
   addDataToCard();
});

const initApp = async () => {
   try {
      const response = await fetch('data.json');
      const data = await response.json();
      myData = data;
      addDataToCard();
   } catch (error) {
      console.log('Something went wrog');
   }
};
initApp();
