<template>
<div class="form-group">
  <label v-if="label">
    {{ label }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life" />
  </label>
  <vue-simple-suggest
    v-bind="$attrs"
    v-on="listeners"
    :destyled="true" />
</div>
</template>

<script>
export default {
  name: 'form-suggest-input',
  components: {
    VueSimpleSuggest: () => import(/* webpackChunkName: "group-form" */ 'vue-simple-suggest')
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: ev => this.$emit('input', ev),
      }
    }
  }
}
</script>

<style lang="scss">
.vue-simple-suggest {
  position: relative;
  .input-wrapper input {
    border-radius: $border-radius;
    background: $input-bg;
    font-size: $input-btn-font-size;
    font-weight: bold;
    color: $default;
    border-width: 0px;
    width: 100%;
    padding: 0.25rem 0.75rem;
    transition: all 150ms ease-in-out;
    &:focus {
      box-shadow: $input-focus-box-shadow;
      outline: none;
    }
  }
  ul.suggestions {
    list-style: none;
    opacity: 1;
    overflow: hidden;
    @include dropdown-menu;
    .suggest-item, .misc-item {
      @include dropdown-option;
      &.hover {
        background: $accent;
        color: $default;
      }
      &.selected {
        color: $primary;
      }
    }
  }
}
</style>