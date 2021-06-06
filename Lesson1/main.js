const goods = [{
    title: 'Shirt',
    img: '',
    id: 1,
    price: 200,
  },
  {
    title: 'Socks',
    img: '',
    id: 2,
    price: 50
  },
  {
    title: 'Jacket',
    img: '',
    id: 3,
    price: 350
  },
  {
    title: 'Shoes',
    img: '',
    id: 4,
    price: 250
  },
];

const renderGoodsItem = (title = '-', id = 0, price = 0, img = "https://via.placeholder.com/200x150") => {
  return `
  <div class="goods-item">
    <img src="${img}" alt="${id}">
      <div class="goods-item__content"> 
        <h3 class="goods-title">Название товара: ${title}</h3>
        <span>ID товара: ${id}</span>
        <p class="goods-text">Цена товара: ${price}</p>
        <button class="btn goods-btn">Купить</button>
      </div>
  </div>`
};

const renderGoodsList = list => {
  document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.id, item.price)).join('');
};

renderGoodsList(goods);