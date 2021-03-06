const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class Item {
  rendered = false;
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    ({
      product_name: this.product_name,
      price: this.price,
      id_product: this.id_product
    } = product);
    this.img = img;
  }

  render() {
    this.rendered = true;
    return `<div class="goods-item" data-id="${this.id_product}">
    <img src="${this.img}" alt="${this.product_name}">
      <div class="goods-item__content"> 
       <h3 class="goods-title">Название товара: ${this.product_name}</h3>
       <span>ID товара: ${this.id_product}</span>
       <p class="goods-text">Цена товара: ${this.price}</p>
       <button class="btn buy-btn" data-id="${this.id_product}">Купить</button>
     </div>
 </div>`
  }
}

class ProductsItem extends Item {}

class BasketItem extends Item {
  constructor(product, img = 'https://via.placeholder.com/100x50') {
    super(product, img);
    this.quantity = product.quantity; //количество
  }

  changeQuantity(count) {
    this.quantity += count;
    this.updateItem();
  }

  render() {
    this.rendered = true;
    return `
        <div class="cart-item" data-id="${this.id_product}">
        <div class="cart-content">
          <img src="${this.img}" alt="Some image">
          <div class="cart-desc">
            <p class="cart-title">${this.product_name}</p>
            <p class="cart-quantity">Quantity: ${this.quantity}</p>
            <p class="cart-single-price">${this.price} each</p>
          </div>
        </div>
        <div class="right-block">
          <p class="cart-price">${this.quantity*this.price}</p>
          <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
      </div>`
  }


  updateItem() {
    const block = document.querySelector('.cart-item[data-id="${this.id_product}"]');
    block.querySelector('.cart-quantity').textContent = `Quantity: ${this.quantity}`;
    block.querySelector('.cart-price').textContent = `${this.quantity*this.price}`;
  }

  removeItem() {
    document.querySelector('.cart-item[data-id="${this.id_product}"]').remove();
  }



}

class List {
  static itemsMap = {
    Products: ProductsItem,
    Basket: BasketItem
  }

  constructor(selector, url) {
    this.container = document.querySelector(selector); //контейнер разметки
    this.url = url;
    this.init();
  }


  init() {}

  /**
   * Получение данных с свервера
   * @param url 
   */

  getJson(url) {
    return fetch(`${API_URL + this.url}`)
      .then(data => data.json())
      .catch(error => console.log(`Ошибка при соединении с сервером`))
  }

  /**
   * Обработка полученых данных
   * @param  data 
   */

  handelData(data) {
    for (let item of data) {
      this.products.push(new List.itemsMap[this.constructor.name](item));
    }
    this.render();
  }

  /**
   * Расчет стоимости всех товаров
   * @returns {number}
   */

  sumItems() {
    let sum = 0;
    for (const products of this.products) {
      sum += products.price;
    }
    console.log(sum);
    return sum;
  }

  getItem(id) {
    return this.products.find(element => element.id_product === id);
  }

  render() {
    for (const product of this.products) {
      if (product.rendered) {
        continue;
      }
      this.container.insertAdjacentHTML('beforeend', product.render());
    }
  }

  /**
   * Фильтр товаров на странице
   * @param  value 
   */
  // filter(value) {
  //   const regexp = new RegExp(value, 'i');
  //   this.filteredProducts = this.productsList.filter(product =>
  //     regexp.test(product.product_name));
  //   this.render();
  // }

}

class Products extends List {
  /**
   * Через super наследуем основные свойства класса list
   * и добавляем свои
   * @param {.product} selector 
   * @param {/catalogData.json} url 
   */

  constructor(cart, container = '.products', url = '/catalogData.json') {
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handelData(data));
  }

  init() {
    this.container.addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        const id = +e.target.dataset['id'];
        this.cart.addProduct(this.getItem(id))
      }
    })
  }

}

class Basket extends List {
  constructor(container = '.basket-block', url = '/getBasket.json') {
    super(container, url);
    this.getJson()
      .then(data => this.handelData(data.contents));
  }

  addProduct(element) {
    this.getJson(`${API_URL}/addToBasket.json`)
      .then(data => {
        if (data.result) {
          let find = this.products.find(el => el.id_product === element.id_product);
          if (find) {
            find.changeQuantity(1);
            return
          }
          let prod = Object.assign({
            quantity: 1
          }, product);
          this.handelData([prod]);
        } else {
          console.log('error');
        }
      })
  }


  delProduct(element) {
    this.getJson(`${API_URL}/deleteFromBasket.json`)
      .then(data => {
        if (data.result) {
          if (element.quantity > 1) {
            element.changeQuantity(-1);
            return
          }
          this.products.splice(this.element.indexOf(element), 1);
          element.removeItem();
        } else {
          console.log('error');
        }
      })
  }

  init() {
    this.container.addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')) {
        const id = +e.target.dataset['id'];
        this.removeItem(this.getItem(id))
      }
    });
    document.querySelector('.cart-item').addEventListener('click', () => {
      this.container.classList.toggle('invisible');
    })
  }
}

const basket = new Basket();
const list = new Products(basket);