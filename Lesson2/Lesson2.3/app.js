class BurgerParam {

  constructor(item) {
    this.name = item.value;
    this.price = +item.dataset['price'];
    this.calories = +item.dataset['cal'];
  }
}



class Burger {
  /*свойства*/

  constructor(size, stuffing, topping) {
    this.size = new BurgerParam(this.getItem(size));
    this.stuffing = new BurgerParam(this.getItem(stuffing));
    this.topping = this.getTopping(topping);
  }

  /*методы*/

  /** метод №1 для получения ВЫБРАННОГО элемента input с помощью строкового литерала, и псевдо элемента checked*/

  getItem(name) {
    return document.querySelector(`input[name="${name}"]:checked`);
  }

  /*метод, который позволяет с помощью цикла for перебрать массив из выбранных
  элементов и получить их с помощью класса Параметров*/

  getTopping(name) {
    let item = [];
    this.allToppings(name).forEach(element => {
      item.push(new BurgerParam(element))
    });
    return item;
  }


  allToppings(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
  }



  /**Метод поулчения общей стоимости товара */

  calculatePrice() {
    let sum = this.size.price + this.stuffing.price;
    this.topping.forEach(topping => {
      sum += topping.price
    });
    return sum;
  }

  /**Метод поулчения общей стоимости товара */

  calculateCalories() {
    let sum = this.size.calories + this.stuffing.calories;
    this.topping.forEach(topping => {
      sum += topping.calories
    });
    return sum;
  }


  /*Метод отрисовки полученной суммы*/

  // renderSum() {
  //   let form = document.querySelector('form');
  //   console.log(form);
  //   form.insertAdjacentHTML('beforeend', `
  //   <div class="sum">
  //       <p class="sum__price">Итого: <span id="sum__price">${this.calculatePrice()}</span></p>
  //       <p class="sum__cal">Количество калорий: <span id="sum__cal">${this.calculateCalories()}</span> </p>
  //     </div>
  //   `);
  //};


  renderSum(sum__price, sum__cal) {
    document.getElementById('sum__price').textContent = this.calculatePrice();
    document.getElementById('sum__cal').textContent = this.calculateCalories();
  }
};








document.querySelector('button').onclick = event => {
  event.preventDefault();
  let burger = new Burger('size', 'stuffing', 'topping');
  console.log(burger);
  burger.renderSum('#sum__price', '#sum_cal');
};

































// const items = document.querySelectorAll('input');

// const nemObject = [];

// document.querySelector('.btn').onclick = (event) => {
//   event.preventDefault();


//   console.log(({
//     items
//   }));


//   items.forEach(function (element) {
//     let obj = {
//       name: element.value,
//       cal: element.dataset['cal'],
//       price: element.dataset['price'],
//     };
//   });

// };


// btn.addEventListener('click', name());



// function name() {
//   items.forEach(function (element) {
//     if (element.checked) {
//       let obj = {
//         name: element.value,
//         cal: element.dataset['cal'],
//         price: element.dataset['price'],
//       };
//       nemObject.push(obj);
//     }

//   });

// }



// console.log(nemObject);




/*
items.forEach(element => {
  // if (element.checked) {
  //   let obj = {
  //     name: element.value,
  //     cal: element.dataset['cal'],
  //     price: element.dataset['price'],
  //   };
  // };



  let obj = {
    name: element.value,
    cal: element.dataset['cal'],
    price: element.dataset['price'],
  };
});

*/