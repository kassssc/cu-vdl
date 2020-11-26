<template>
<div class="checkbox position-relative d-flex align-items-center pointer">
  <div class="box d-flex justify-content-center align-items-center"
       :class="[
          {
            'checked': value,
            'disabled': disabled
          },
          color
       ]">
    <i class="fas fa-check" />
  </div>
  <div  v-if="label"
        class="w-100 d-flex justify-content-between">
    <label class="ml-2"
           :class="[labelClass, {'disabled': disabled}]">
      {{ label }}
    </label>
    <label  v-if="secondaryLabel"
            class="ml-2"
            :class="{'disabled': disabled}">
      {{ secondaryLabel }}
    </label>
  </div>
  <slot name="label"></slot>
  <input type="checkbox"
         :checked="value"
         @input="on_change($event.target.checked)"
         class="hidden-input"
         :disabled="disabled" >
</div>
</template>

<script>
export default {
  name: 'form-checkbox',
  props: {
    label: {
      default: '',
      type: String
    },
    labelClass: {
      default: undefined,
      type: String
    },
    secondaryLabel: {
      default: undefined,
      type: String
    },
    value: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    color: {
      default: '',
      type: String
    }
  },
  methods: {
    on_change (new_val) {
      this.$emit('input', new_val)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.hidden-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.checkbox {
  padding: .3em 0;
  .box {
    min-width: 1.35em;
    height: 1.35em;
    border-radius: .2em;
    background: $accent;
    transition: all 100ms ease-in-out;
    i {
      font-size: .85em;
      color: $light;
      opacity: 0;
      visibility: hidden;
    }
    &.checked {
      background: $primary;
      &.pink    { background: $pink; }
      &.red     { background: $red; }
      &.orange  { background: $orange; }
      &.yellow  { background: $yellow; }
      i {
        opacity: 1;
        visibility: visible;
      }
    }
    &.disabled {
      background: $accent-light;
    }
  }
  label {
    margin: 0;
    font-size: 1.25em;
    color: $dark;
    &.label-lg {
      font-size: 1.4em;
    }
    &.label-xl {
      font-size: 1.6em;
    }
    @include unselectable;
    &.disabled {
      color: $muted;
    }
  }
}
</style>