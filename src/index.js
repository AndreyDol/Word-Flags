// Создай фронтенд часть приложения поиска данных о стране по её частичному или полному имени.

//import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
//import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '800px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  fontSize: '24px',
  // ...
});

let flagName = '';
let score = 0;
let randomCountry = -1;

const random = data => Math.floor(Math.random() * (data.length - 1));

let foundData = {};
//Запрос даних
const fetchUsers = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const users = await response.json();
  return users;
};

const doStuff = async () => {
  try {
    foundData = await fetchUsers();
    console.log(users);
  } catch (error) {
    console.log(error.message);
  }
};

doStuff();

// Пошук поля вводу та місця для додавання списку в DOM
const refs = {
  name: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countriesInfo: document.querySelector('.country-info'),
  button: document.querySelector('.button'),
  buttonClue: document.querySelector('.button-clue'),
};

function generateCheckCountry(data, oneCounry, mount) {
  let arrayCheckCountry = [];
  let randomCountryNumber;
  const randomI = Math.floor(Math.random() * mount);
  for (let i = 0; i < mount; i++) {
    if (i === randomI) randomCountryNumber = oneCounry;
    else randomCountryNumber = random(foundData);
    arrayCheckCountry.push(data[randomCountryNumber].name.official);
  }

  return arrayCheckCountry;
}

onSearch();


// Додає слухача на кнопку
refs.buttonClue.addEventListener('click', onClue);
refs.button.addEventListener('click', onSearch);
function onClue(event) {
  const clue = Math.floor(Math.random() * 3)+1;

  console.log(foundData[randomCountry]);
  if (randomCountry !== -1 && clue === 1) {
    Notiflix.Notify.info(`capital: ${foundData[randomCountry].capital}`);
  }
if (randomCountry!==-1 && clue === 2) {
    Notiflix.Notify.info(`continent: ${foundData[randomCountry].continents}`); 
  }
  if (randomCountry !== -1 && clue === 3) {
    Notiflix.Notify.info(
      `langlanguages: ${Object.values(foundData[randomCountry].languages).join(
        ', '
      )}`
    );
  }
 };

function onSearch(event) {
  let delay = 1000;
  const check = document.querySelectorAll('input');
 // console.log(check);

  const inputCheck = check => {
    for (let i = 0; i < check.length; i++) {
      const input = check[i];
      //console.log(input.checked);
      if (input.checked === true) return input.attributes.value.value;
    }
    return false;
  };

  if (check.length !== 0 && inputCheck(check) === false) {
    Notiflix.Notify.failure(`Oops, please select one answer`);
    return false;
  }

  if (check.length > 0) {
    console.log(inputCheck(check));
    console.log(flagName);
    if (inputCheck(check) === flagName) {
      score += 1;
      Notiflix.Notify.success(`Сorrectly !  + 1`);
      delay = 1000;
     // console.log(score);
    }
    else {
      Notiflix.Notify.failure(`Wrong. It was ${flagName}`);delay = 3000;
    }
  }
setTimeout(() => {
  // очистка списку країн та інформації про країну
  refs.countriesList.innerHTML = '';

  // перевірка, якщо значення не пустий рядок

  if (foundData !== {}) {
    console.log(foundData);
    randomCountry = random(foundData);

    // console.log(generateCheckCountry(foundData, randomCountry, 5));
    // console.log(randomCountry);
    // console.log(foundData[randomCountry]);
    flagName = foundData[randomCountry].name.official;

    insertContent(
      foundData[randomCountry],
      generateCheckCountry(foundData, randomCountry, 5)
    );
  }
}, delay);
}
  
// Розмітка для однієї країни
const createListCountries = (item, checkContry) => `  <h2>Score:  ${score}</h2>
<li class="list list__info"><img src="${item.flags.png}" alt="${item.flags.alt}" width="300" height="200"/>
  </li>
   <h2>   </h2>
   <form>
  <label>
      <input type="radio" name="question" value="${checkContry[0]}">
      ${checkContry[0]}
    </label>
  <br>
  <label>
      <input type="radio" name="question" value="${checkContry[1]}">
       ${checkContry[1]}
    </label>
     <br>
     <label>
      <input type="radio" name="question" value="${checkContry[2]}">
       ${checkContry[2]}
    </label>
     <br>
     <label>
      <input type="radio" name="question" value="${checkContry[3]}">
       ${checkContry[3]}
    </label>
     <br>
     <label>
      <input type="radio" name="question" value="${checkContry[4]}">
      ${checkContry[4]}
    </label>
</form>
  `;

// Додавання в DOM
const  insertContent = (array, checkContry) => {
  const result = createListCountries(array, checkContry);
  refs.countriesList.insertAdjacentHTML('beforeend', result);
};
