<template>
<div class="search-input">
  <i class="fas fa-search icon-search text-muted" />
  <input  :class="['form-control', inputClass]"
          :placeholder="placeholder"
          v-model="query"
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
    search (ev) {
      this.$emit('search', ev.target.value)
    },
    clear () {
      this.query = ''
      this.$emit('search', this.query)
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
    right: .5em;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 1.2em;
    padding: 0;
    color: $muted;
    &:hover {
      color: $pink;
    }
  }
}
</style>