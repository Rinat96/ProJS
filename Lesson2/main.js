class Products {
  data = []; //массив с данными о товаре (сервера)
  products = []; //массив всех элементов товара
  container = null; //будет код html

  constructor(selector) {
    this.container = document.querySelector(selector);
  }

  init() {
    this.fetchData(); //получение данных ссервера
    this.render(); //формирование разметки товара
  } //инициализация того что будет выполнять код

  fetchData() {
    this.data = [{
        title: 'Shirt',
        id: 1,
        price: 200
      },
      {
        title: 'Socks',
        id: 2,
        price: 50
      },
      {
        title: 'Jacket',
        id: 3,
        price: 350
      },
      {
        title: 'Shoes',
        id: 4,
        price: 250
      }
    ];
  }

  render() {
    for (let data of this.data) {
      const product = new ProductItem(data);
      this.products.push(product);
      this.container.insertAdjacentHTML('beforeend', product.render())
    } //итерация массива данных с сервера
  }
}

class ProductItem {
  title = '';
  price = 0;
  id = 0;
  img = '';

  constructor(product, img = 'https://via.placeholder.com/200x150') {
    ({
      title: this.title,
      price: this.price,
      id: this.id
    } = product); //деструктуризация объекда чтобы не создавать новый! Как бы присваиваем имеющимся переменным (title, price, id и т.д.) их свойство обеъекта
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
  } //возвращает кусочек кода для одного объекта
}

const list = new Products('.products');

list.init();


/**Задание №2
 * Про классы по корзине
 */

class Cart {
  /** Свойства корзины  
   * products - массив из элементов корзины;
   * container - для формирования разметки корзины из элементов;
   */

  /**методы корзины
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