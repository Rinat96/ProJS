export const Error = {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    setError(error) {
      this.text = error
    }
  },

  computed: {
    invisible() {
      return this.text !== ''
    }
  },

  template: `
  <div class="error-block center" v-if="invisible"> 
      <p class="error-msg">
      <button class="close-btn" @click="setError('')">&times;</button>
          {{ text }}
      </p>
  </div>
  `
};