export const ProductItem = {
  props: ['img', 'product'],

  data() {
    return {
      cartAPI: this.$root.$refs.cart,
    }
  },

  template: `
  <div class="goods-item">
  <img :src="img" :alt="product.product_name">
  <div class="goods-item__content">
    <h3 class="goods-title">Название товара: {{product.product_name}}</h3>
    <span>ID товара: {{product.id_product}}</span>
    <p class="goods-text">{{product.price}}</p>
    <button class="btn buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
  </div>
</div>`
};