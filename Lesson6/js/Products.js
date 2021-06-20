import {
  ProductItem
} from "./ProductItem.js";


export const Products = {
  inject: ['API', 'getJson'],

  components: {
    ProductItem,
  },

  data() {
    return {
      catalogUrl: '/catalogData.json',
      products: [],
      filtered: [],
      imgCatalog: 'https://via.placeholder.com/200x150'
    }
  },

  methods: {
    filter(value) {
      this.filtered = this.products.filter(el => new RegExp(value, 'i').test(el.product_name));
    }
  },


  mounted() {
    this.getJson(`${this.API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      });
  },

  template: `<div class="products center">
        <ProductItem v-for="product of filtered" :key="product.id_product" :img="imgCatalog" :product='product'></ProductItem>
      </div>
    `

}