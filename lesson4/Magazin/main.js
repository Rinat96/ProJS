const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


/**
 * Базовый класс листа (списка) товаров
 * что в корзине, что в каталоге 
 */
class List {
  constructor(url, container) {
    this.container = container; //контейнер разметки
    this.url = url;
    this.products = []; //массив из товаров
    this.productsList = [];
    this.filteredProducts = [];
    this.init();
  }

  /**
   * Получение данных с свервера
   * @param url 
   * @returns {Promise}
   */

  getJson(url) {
    return fetch(`${API_URL}/catalogData.json`)
      .then(data => data.json())
      .catch(error => console.log(`Ошибка при соединении с сервером`))
  }

  /**
   * Обработка полученых данных
   * @param  data 
   */

  handelData(data) {
    this.products = [...data];
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


  render() {
    for (const product of this.products) {
      const productObject = new this.list[this.constructor.name](product);
      this.productsList.push(productObject);
      this.container.insertAdjacentHTML('beforeend', productObject.render());
    }

    // let listHtml = '';
    // this.products.forEach(product => {
    //   const productObject = new ProductItem(product);
    //   listHtml += productObject.render();
    // });
    // this.container.innerHTML = listHtml;

    // for (let product of this.products) {
    //   const productObject = new ProductItem(product);
    //   this.productsList.push(productObject);
    //   this.container.insertAdjacentHTML('beforeend', productObject.render());
  }

  /**
   * Фильтр товаров на странице
   * @param  value 
   */
  filter(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredProducts = this.productsList.filter(product =>
      regexp.test(product.product_name));
    this.render();
  }

  init() {
    return false;
  }
}

/**
 * Базовый класс элемента товара
 * чтов корзине, что в каталоге
 */

class Item {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="goods-item" data-id="${this.id_product}">
    <img src="${this.img}" alt="${this.id}">
      <div class="goods-item__content"> 
       <h3 class="goods-title">Название товара: ${this.title}</h3>
       <span>ID товара: ${this.id}</span>
       <p class="goods-text">Цена товара: ${this.price}</p>
       <button class="btn buy-btn" data-id="${this.id}">Купить</button>
     </div>
 </div>`
  };
}

/**
 * Наследуюем полностью все свойства и методы класса Item
 * так как мы его наследуем послностью, без добавления в него каких либо
 * свойств и методов, внутри {} ни чего не пишем, оставляем пустые
 */
class ProductItem extends Item {}

/**
 * Класс каталог товаров, наследуем от базового класса List (список)
 */

class ProductList extends List {
  /**
   * Через super наследуем основные свойства класса list
   * и добавляем свои
   * @param {.product} selector 
   * @param {/catalogData.json} url 
   */

  constructor(container = '.products', url = '/catalogData.json') {
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handelData(data));
  }

  init() {
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        this.cart.addProduct(e.target);
      }
    });
    // document.querySelector('.search-form').addEventListener('submit', e => {
    //   e.preventDefault();
    //   this.filter(document.querySelector('.search-field').value)
    // })
  }

}


/**
 * Класс корзины товаров, так же наследуем от класса List
 */
class Basket extends List {
  constructor(container = '.basket-block ', url = '/getBasket.json') {
    super(url, container);
    this.getJson()
      .then(data => this.handelData(data.contents));
  }


  addProduct(element) {
    this.getJson(`${API_URL}/addToBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find) {
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          alert('Error');
        }
      })

  }

  delProduct() {
    this.getJson(`${API_URL}/deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this._updateCart(find);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  updateBasket() {
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.cart-quantity').textContent = `Quantity: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity*product.price}`;
  }

  init() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')) {
        this.removeProduct(e.target);
      }
    })
  }


}

/**
 * Класс товаров в корзине, наследуем от базового класса List (список)
 */
class BasketItem extends Item {
  constructor(element, img = 'https://via.placeholder.com/100x50') {
    super(element, img);
    this.quantity = element.quantity;
  }

  render() {
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
      <p class="product-price">${this.quantity*this.price}</p>
      <button class="del-btn" data-id="${this.id_product}">&times;</button>
    </div>
  </div>`
  }
}


const basket = new ProductList();
// new ProductList(basket);

// const list = new ProductList();



// document.querySelector('.search__text').addEventListener('click', (e) => {
//   const value = document.querySelector('.search__input').value;
//   console.log(value);
//   list.filter(value);
// });