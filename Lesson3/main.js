const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductList {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.Products = [];

    this.fetchProducts()
      .then(data => {
        this.goods = [...data];
        this.render();
        this.sumItems();
      });
  }

  // fetchData() {
  //   this.data = [{
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
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(`Ошибка при соединении с сервером`);
      })
  }
  render() {
    const block = this.container;

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.Products.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render())
    }
  }

  sumItems() {
    let sum = 0;
    for (const products of this.Products) {
      sum += products.price;
    }
    console.log(sum);
    return sum;

  }
}

class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return ` <div class="goods-item">
    <img src="${this.img}" alt="${this.id}">
      <div class="goods-item__content"> 
       <h3 class="goods-title">Название товара: ${this.title}</h3>
       <span>ID товара: ${this.id}</span>
       <p class="goods-text">Цена товара: ${this.price}</p>
       <button class="btn goods-btn">Купить</button>
     </div>
 </div>`
  }
}


/**Задание №2
 * Про классы по корзине
 */

class Cart {
  /** Свойства корзины  
   * products - массив из элементов корзины;
   * container - для формирования разметки корзины из элементов;
   */

  /**методы корзины
   * 
   * render() - выводить весь список элементов;
   * math() - расчет конечной стоимости товаров;
   * post() - отправка полученных данных (наименование товара, количество) на сервер;
   */
}

class CartItem {
  /**свойства элемента корзины
   * img - картинка (обложка);
   * title - загаловок;
   * price - цена товара;
   * amount - количество товаров.
   */

  /**методы элемента корзины;
   * render() - отрисовка элемента товара (html разметка);
   */
}




const list = new ProductList('.products');