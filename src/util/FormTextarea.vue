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
            :style="{height}"
            ref="Textarea"
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
  },
  data () {
    return {
      height: '4.5em'
    }
  },
  watch: {
    '$attrs.value': function () {
      //console.log(this.$refs.Textarea.scrollHeight)
      this.recompute_height()
    }
  },
  mounted () {
    this.recompute_height()
  },
  methods: {
    recompute_height() {
      /* if (this.$attrs.disabled == '') {
        this.height = '4.5rem'
      } */
      this.height = `${this.$refs.Textarea.scrollHeight}px`
    }
  }
}
</script>

<style lang="scss">
textarea.form-control {
  line-height: 1.2em;
  padding: 0.5em;
  resize: none;
  min-height: 3.35em;
  &.resize {
    resize: vertical;
  }
}
</style>