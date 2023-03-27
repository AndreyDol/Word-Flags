// Создай фронтенд часть приложения поиска данных о стране по её частичному или полному имени.

import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

// Пошук поля вводу та місця для додавання списку в DOM
const refs = {
  name: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countriesInfo: document.querySelector('.country-info'),
};

// Додає слухача та використовує функцію debounce, яка робить HTTP-запит через 300мс після того, як користувач перестав вводити текст
refs.name.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    // записуємо в змінну введене значення користувачем (trim прибирає пробіли)
    let inputEl = refs.name.value.trim();

// очистка списку країн та інформації про країну
    refs.countriesInfo.innerHTML = "";
    refs.countriesList.innerHTML = "";

// перевірка, якщо значення не пустий рядок
    
if(inputEl !== ""){
    fetchCountries(inputEl).then(foundData => {
      // якщо масив більше 10 країн, то відображається повідомлення
      if (foundData.length > 10) {
        // використання бібліотеки Notiflix для відображення повідомлення
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name`
        );
      }
      // якщо масив більше 2 та меньше 10 країн, то виводить розмітку (прапор, країна)
      if ((foundData.length > 2) & (foundData.length < 10)) {
        insertContent(foundData);
      }
      // якщо масив з 1 країни, то виводить інформацією для однієї країни (прапор, назва, столиця, населення, мови)
      if (foundData.length === 1) {
        insertContentInfo(foundData);
      }
        // якщо користувач ввів не иснуючу назву країни, то відображає повідомлення
      if (foundData.length === 0) {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
      }
    })
  }
 };
    // Розмітка для однієї країни
    const createListCountries =
      item => `<li class="list list__info"><img src="${item.flags.png}" alt="${item.flags.alt}" width="30" height="20"/>
  <p class = "text">  ${item.name.official}</p></li>`;
        
   

// Перебір масива
const generateContent = (array) => array.reduce((acc, item) => {
    return acc + createListCountries(item);
}, "");


// Додавання в DOM
const insertContent = (array) => {
    const result = generateContent(array);
    refs.countriesList.insertAdjacentHTML('beforeend', result);
};


// Розмітка з інформацією для однієї країни (прапор, назва, столиця, населення, мови)
const createInfoCountries = item =>
    `<li class="list"><img src="${
  item.flags.png
}" alt="${item.flags.alt}" width="60" hight="40"/>
  <p class="name"><b>${item.name.official}</b></p>
  <p><b>Capital</b>: ${item.capital}</p>
   <p><b>Population</b>: ${item.population}</p>
   <p><b>Languages</b>: ${Object.values(item.languages).join(", ")}</p></li>
  `;


  // Перебір масива
const generateContentInfo = (array) => array.reduce((acc, item) => {
   
    return acc + createInfoCountries(item);
}, "");


// Додавання в DOM
const insertContentInfo = (array) => {
    const result = generateContentInfo(array);
    refs.countriesInfo.insertAdjacentHTML('beforeend', result);
};