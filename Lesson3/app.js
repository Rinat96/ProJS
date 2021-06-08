const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  /*Метод отрисовки разметки одного товара*/
  renderItem() {
    return ` <div class="goods-item">
    <img src="${this.img}" alt="${this.id}">
      <div class="goods-item__content"> 
       <h3 class="goods-title">Название товара: ${this.title}</h3>
       <span>ID товара: ${this.id}</span>
       <p class="goods-text">Цена товара: ${this.price}</p>
       <button class="btn goods-btn" id="${this.id}">Купить</button>
     </div>
 </div>`
  }
}


class ProductsList {
  products = [];

  constructor() {
    this.dataProducts = [];
  }

  /*Методы списка товараов*/

  /*Выполнение всего кода*/

  init() {
    this.fetchProducts()
      .then(() => {
        this.renderItems();
      });
  }

  /*Данные товаров*/

  // fetchProducts() {
  //   this.dataProducts = [{
  //       title: 'Shirt',
  //       id: 1,
  //       price: 200
  //     },
  //     {
  //       title: 'Socks',
  //       id: 2,
  //       price: 50
  //     },
  //     {
  //       title: 'Jacket',
  //       id: 3,
  //       price: 350
  //     },
  //     {
  //       title: 'Shoes',
  //       id: 4,
  //       price: 250
  //     }
  //   ];
  // }

  fetchProducts() {
    const responce = fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = responce.json();
      this.dataProducts = catalogItems;
    } else {
      console.log(`Ошибка при соединении с сервером`);
    }
  }

  /*Вывод списка товаров*/
  renderItems() {
    let listHtml = '';
    this.dataProducts.forEach(product => {
      const productItem = new ProductItem(
        product.product_name,
        product.price,
        product.id_product,
        product.img
      );
      listHtml += productItem.renderItem();
    });
    document.querySelector('.products').innerHTML = listHtml;
  }

  sumItems() {
    let sum = 0;
    for (const products of this.dataProducts) {
      sum += products.price;
    }
    return sum;
  }
}


/*Задание №2 корзина*/

class Cart {


}

const list = new ProductsList();
list.init();
console.log(list.sumItems());







// const list = new ProductsList();
// list.init();