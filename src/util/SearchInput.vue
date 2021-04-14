<template>
<div class="search-input">
  <i class="fas fa-search icon-search text-placeholder" />
  <input  :class="['form-control', inputClass]"
          :placeholder="placeholder"
          v-model="query"
          ref="searchInput"
          @input="search($event)"
          @focus="$event.target.select()">
  <button v-show="query"
          class="btn btn-clear"
          @click="clear()">
    <i class="fas fa-times" />
  </button>
</div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'search-input',
  inheritAttrs: false,
  props: {
    inputClass: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'ค้นหา...'
    },
    initialQuery: {
      type: String,
      default: null
    },
    debounceInterval: {
      type: Number,
      default: 300
    }
  },
  beforeMount () {
    if (this.initialQuery) {
      this.query = this.initialQuery
    }
  },
  data () {
    return {
      query: null
    }
  },
  computed: {
    debounced_search () {
      return debounce( (query) => {
        this.$emit('debounced-search', query)
      }, this.debounceInterval)
    }
  },
  methods: {
    search (ev) {
      const query = ev.target.value === ''? null : ev.target.value
      this.$emit('search', query)
      this.debounced_search(query)
    },
    clear () {
      this.query = null
      this.$emit('search', this.query)
      this.debounced_search(this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  position: relative;
  i.icon-search {
    position: absolute;
    pointer-events: none;
    height: 1em;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    left: 10px;
    font-size: 1.3em;
  }
  input.form-control {
    padding-left: 2em;
    padding-right: 1.5em;
  }
  button.btn-clear {
    position: absolute;
    right: .7em;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    padding: 0;
    font-size: 1.1em;
    color: $placeholder;
    &:hover {
      color: $red;
    }
  }
}
</style>