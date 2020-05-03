<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelSize">
    {{ label }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life text-primary icon-sm" />
  </label>
  <textarea :class="['form-control', inputClass]"
            v-bind="$attrs"
            v-on="listeners" />
</div>
</template>

<style lang="scss">
textarea.form-control {
  line-height: 1.2em;
  padding: 0.5em
}
</style>

<script>
export default {
  name: 'form-input',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    labelSize: {
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