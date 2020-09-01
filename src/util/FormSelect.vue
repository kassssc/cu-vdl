<template>
<div class="form-group">
  <label v-if="formLabel">
    {{ formLabel }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life" />
  </label>
  <vSelect
    class="custom"
    v-bind="$attrs"
    v-on="listeners"
    :disabled="disabled">
    <template #no-options>
      <div class="py-1 text-muted">
        ไม่มีรายการที่จะแสดง...
      </div>
    </template>
  </vSelect>
</div>
</template>

<script>
export default {
  name: 'form-select',
  components: {
    vSelect: () => import(/* webpackChunkName: "group-form-select" */ 'vue-select')
  },
  inheritAttrs: false,
  props: {
    formLabel: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
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
.v-select.custom {
  border-radius: $border-radius;
  background: $input-bg;
  font-size: $input-btn-font-size;
  font-weight: bold;
  // max-height: ;
  color: $default;
  border-width: 0px;
  width: 100%;
  transition: all 150ms ease-in-out;
  &.vs--open {
    border-width: 0px;
    box-shadow: $input-focus-box-shadow;
  }
  &.vs--disabled {
    * { cursor: default; }
    .vs__dropdown-toggle {
      background: $accent-light;
    }
    .vs__actions {
      display: none;
    }
  }
  .vs__dropdown-toggle {
    padding: 0.19rem 0.75rem;
    border-style: none;
  }
  input.vs__search,
  span.vs__selected,
  .vs__selected-options,
  .vs__actions {
    background: transparent;
    font-weight: bold;
    min-height: 33px;
    color: $default;
    margin: 0;
    padding: 0;
  }
  .vs__actions {
    height: 33px;
  }
  input.vs__search::placeholder {
    color: $placeholder;
  }
  &:not(.vs--single) {
    span.vs__selected {
      padding: 0 .3em;
      margin-right: .3em;
      margin-bottom: .1em;
      margin-top: .1em;
      background: $primary;
      color: $light;
      border-width: 0;
      font-size: 1.3rem;
      min-height: 1.3em;
      button.vs__deselect {
        padding: .4em .1em;
        svg { fill: $placeholder; }
        &:hover svg { fill: $light; }
      }
    }
    &.vs--open input.vs__search {
      width: 100%;
    }
  }
  svg.vs__open-indicator {
    fill: $placeholder;
  }
  .vs__clear {
    margin: 0;
    padding: 0 .5em;
    svg { fill: $placeholder; }
    &:focus, &:hover {
      outline: none;
      svg { fill: $pink; }
    }
  }
  .vs__dropdown-menu {
    @include dropdown-menu;
    .vs__dropdown-option {
      @include dropdown-option;
    }
    .vs__dropdown-option--highlight {
      background: $accent;
    }
    .vs__dropdown-option--selected {
      color: $primary;
    }
  }
}
</style>