import {
  Products
} from "./Products.js";
import {
  Cart
} from "./Cart.js"

import {
  Search
} from "./Search.js";

import {
  Error
} from "./Error.js";


const App = {

  components: {
    Cart,
    Products,
    Search,
    Error
  },

  data() {
    return {
      API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`
    }
  },

  provide() {
    return {
      API: this.API,
      getJson: this.getJson
    }
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          this.$refs.error.setError(error);
        })
    }
  },

}

Vue.createApp(App).mount('#app')