<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelClass">
    {{ label }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life" />
  </label>
  <input  :class="[
            'form-control',
            inputClass,
            { 'is-invalid': is_invalid }
          ]"
          ref="Inputbox"
          v-bind="$attrs"
          v-on="listeners"
          :disabled="disabled">
  <ErrorBox v-if="invalid" :msg="errorMsg" />
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
    },
    invalid: {
      type: Boolean,
      default: false
    },
    errorMsg: {
      type: String,
      default: null
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: ev => this.$emit('input', ev.target.value),
      }
    },
    /* noValue () {
      return !this.$attrs.value
    }, */
    is_invalid () {
      return this.invalid // || (this.required && this.noValue)
    },
    /* errorMessageDisplay () {
      if (this.formTouched) {
        if (this.invalid) {
          return this.errorMsg
        } else if (this.required && this.noValue) {
          return 'จำเป็นต้องใส่ข้อมูล'
        }
      }
      return null
    } */
  },
  data () {
    return {
      formTouched: false
    }
  }
}
</script>

<style lang="scss">
input.form-control.input-pink:focus {
  box-shadow: 0 0 0 .2rem $pink;
}
</style>