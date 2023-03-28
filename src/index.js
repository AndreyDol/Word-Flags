// Создай фронтенд часть приложения поиска данных о стране по её частичному или полному имени.

//import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
//import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

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

// Додає слухача на кнопку
refs.button.addEventListener('click', onSearch);

function onSearch(event) {
  // очистка списку країн та інформації про країну
  //refs.countriesInfo.innerHTML = '';
  refs.countriesList.innerHTML = '';

  // перевірка, якщо значення не пустий рядок

  if (foundData !== {}) {
    console.log(foundData);
    const randomCountry = random(foundData);

    console.log(generateCheckCountry(foundData, randomCountry, 5));
    console.log(randomCountry);
    console.log(foundData[randomCountry]);
    insertContent(
      foundData[randomCountry],
      generateCheckCountry(foundData, randomCountry, 5)
    );

    if (foundData.length === 0) {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    }
  }
}
// Розмітка для однієї країни
const createListCountries = (
  item,
  checkContry
) => `<li class="list list__info"><img src="${item.flags.png}" alt="${item.flags.alt}" width="300" height="200"/>
  </li>
   <h2>   </h2>
   <form>
  <label>
      <input type="radio" name="question">
      ${checkContry[0]}
    </label>
  <br>
  <label>
      <input type="radio" name="question">
       ${checkContry[1]}
    </label>
     <br>
     <label>
      <input type="radio" name="question">
       ${checkContry[2]}
    </label>
     <br>
     <label>
      <input type="radio" name="question">
       ${checkContry[3]}
    </label>
     <br>
     <label>
      <input type="radio" name="question">
      ${checkContry[4]}
    </label>
</form>
  `;

// Додавання в DOM
const insertContent = (array, checkContry) => {
  const result = createListCountries(array, checkContry);
  refs.countriesList.insertAdjacentHTML('beforeend', result);
};
