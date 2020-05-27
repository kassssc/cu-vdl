<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelSize">
    {{ label }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life" />
  </label>
  <textarea :class="[
              'form-control',
              inputClass,
              { 'resize': resizable }
            ]"
            v-bind="$attrs"
            v-on="listeners" />
</div>
</template>

<script>
export default {
  name: 'form-textarea',
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
    },
    resizable: {
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

<style lang="scss">
textarea.form-control {
  line-height: 1.2em;
  padding: 0.5em;
  resize: none;
  &.resize {
    resize: vertical;
  }
}
</style>