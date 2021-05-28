const goods = [{
    title: 'Shirt',
    id: 1,
    price: 200,
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
  },
];

const renderGoodsItem = (title = '-', id = '-', price = '-') => {
  return `
  <div class="goods-item">
    <h3 class="goods-title">Название товара: ${title}</h3>
      <span>ID товара: ${id}</span>
    <p class="goods-text">Цена товара: ${price}</p>
  </div>`
};

const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.id, item.price));

  document.querySelector('.goods-list').innerHTML = goodsList.join('');
};

renderGoodsList(goods);