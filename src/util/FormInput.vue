<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelClass">
    {{ label }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life text-primary icon-sm" />
  </label>
  <input  :class="['form-control', inputClass]"
          v-bind="$attrs"
          v-on="listeners"
          :disabled="disabled">
</div>
</template>

<script>
export default {
  name: 'form-input',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: ev => this.$emit('input', ev.target.value),
      }
    }
  }
}
</script>