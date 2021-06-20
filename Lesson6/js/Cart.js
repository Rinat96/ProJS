import {
  CartItem
} from "./CartItem.js";

export const Cart = {
  inject: ['API', "getJson"],

  components: {
    CartItem
  },

  data() {
    return {
      cartUrl: '/getBasket.json',
      cartItems: [],
      imgCart: 'https://via.placeholder.com/100x50',
      showCart: false
    }
  },

  methods: {
    addProduct(product) {
      this.getJson(`${this.API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let prod = Object.assign({
                quantity: 1
              }, product);
              this.cartItems.push(prod)
            }
          } else {
            alert('Error');
          }
        })
    },

    remove(item) {
      this.getJson(`${this.API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(item), 1)
            }
          }
        })
    },
  },

  mounted() {
    this.getJson(`${this.API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartItems.push(el);
        }
      });
  },

  template: `
  <button class="basket-button" type="button" @click="showCart = !showCart">Корзина</button>
  <div class="basket-block" v-show="showCart">
  <p v-if="!cartItems.length">Корзина пуста</p>
    <CartItem v-for="item of cartItems" :key="item.id_product" :img="imgCart" :cartItem="item"
    @remove="remove"
    >
    </CartItem>
  </div>`
}