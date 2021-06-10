let text = document.querySelector('.random_text').innerText;

/*Задание №1*/

document.querySelector('.random_text').insertAdjacentHTML('beforeend', `<div style = "color: green;font-weight:700; margin-top:15px" class="random_text2">Задание№1 ${text.replace(/'/igm, '"')} </div>`);

/*Задание №2*/

let RegExp = /'\B|\B'/g;

document.querySelector('.random_text').insertAdjacentHTML('beforeend', `<div style = "font-weight:700; margin-top:15px" class="random_text2">Задание№2 ${text.replace(RegExp, '"')} </div>`);

/*Задание №3*/

const formEl = document.querySelector('form');
const nameUser = document.getElementById('name');
const telUser = document.getElementById('tel');
const emailUser = document.getElementById('email');
const userText = document.getElementById('text');


formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  let result = true;

  let name = nameUser;
  if (nameValid(name) == false) {
    result = false;
  }

  let tel = telUser;
  if (telValid(tel) == false) {
    result = false;
  }

  let email = emailUser;
  if (emailValid(email) == false) {
    result = false;
  }

  let text = userText;
  if (textValid(text) == false) {
    result = false;
  }

  if (result == true) {
    console.log(`Все гуд`);
    document.querySelector('.result').innerHTML = ` <span style = "color: green; font-weight:700; margin-top:15px">Все гуд!</span>`;
  } else {
    console.log(`Все бед`);
    document.querySelector('.result').innerHTML = `<span style = "color: red; font-weight:700; margin-top:15px">Что то не так! Проверь!</span>`;
  }
});

/*Валидация имени*/
let nameValid = (nameUser) => {
  let regExpName = /^[A-Za-zА-Яа-я]+$/;
  if (nameUser.value == '') {
    nameUser.classList.add('error');
    nameUser.placeholder = 'Заполните Имя!';
    return false;
  }
  if (nameUser.value.match(regExpName)) {
    nameUser.classList.remove('error');
    return true;
  } else {
    nameUser.classList.add('error');
    nameUser.placeholder = 'Заполните Имя!';
    return false;
  }
}

/*Валидация телефона*/
let telValid = (tel) => {
  let regExpName = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
  if (tel.value == '') {
    tel.classList.add('error');
    tel.placeholder = 'Заполните телефон!';
    return false;
  }
  if (tel.value.match(regExpName)) {
    tel.classList.remove('error');
    return true;
  } else {
    tel.classList.add('error');
    tel.placeholder = 'Заполните телефон!';
    return false;
  }
}

/*Валидация почты*/
let emailValid = (email) => {
  let regExpName = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
  if (email.value == '') {
    email.classList.add('error');
    email.placeholder = 'Заполните email!';
    return false;
  }
  if (email.value.match(regExpName)) {
    email.classList.remove('error');
    return true;
  } else {
    email.classList.add('error');
    email.placeholder = 'Заполните email!';
    return false;
  }
}

/*Валидация сообщения*/
let textValid = (text) => {
  if (text.value == '') {
    text.classList.add('error');
    text.placeholder = 'Напишите сообщение';
    return false;
  } else {
    text.classList.remove('error');
    return true;
  }
}