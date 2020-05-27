<template>
<div class="search-input">
  <i class="fas fa-search icon-search text-muted" />
  <input  :class="['form-control', inputClass]"
          :placeholder="placeholder"
          v-model="query"
          @input="debouncedSearch($event)"
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
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    debouncedSearch: debounce( function (ev) {
      this.$emit('debounced-search', ev.target.value)
    }, 500),
    clear () {
      this.query = ''
      this.$emit('debounced-search', this.query)
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
    width: 30px;
    height: 22px;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    left: 10px;
    font-size: 1.3rem;
  }
  input.form-control {
    padding-left: 2em;
    padding-right: 1.5em;
  }
  button.btn-clear {
    position: absolute;
    height: 20px;
    width: 20px;
    right: .5em;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1rem;
    padding: 0;
    color: $muted;
    &:hover {
      color: $pink;
    }
  }
}
</style>