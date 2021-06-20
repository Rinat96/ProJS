export const CartItem = {
  props: ['img', 'cartItem'],
  emits: ['remove'],

  template: `
  <div class="cart-item">
    <div class="cart-content">
      <img :src="img" alt="cartItem.product_name">
      <div class="cart-desc">
        <p class="cart-title">{{cartItem.product_name}}</p>
        <p class="cart-quantity">Quantity: {{cartItem.quantity}}</p>
        <p class="cart-single-price">{{cartItem.price}}</p>
      </div>
    </div>
    <div class="right-block">
      <p class="cart-price">{{cartItem.price * cartItem.quantity}} </p>
      <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
    </div>
  </div>`
}