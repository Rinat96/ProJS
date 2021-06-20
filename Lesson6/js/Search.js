export const Search = {
  data() {
    return {
      userSearch: ''
    }
  },

  template: `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
              <input class="search__input" type="text" v-model.lazy="userSearch">
              <button class="search__text" type="submit">Найти</button>
            </form>`
};