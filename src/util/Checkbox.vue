<template>
<div class="checkbox"
     @click="updateValue()">
  <div class="box d-flex justify-content-center align-items-center my-1"
       :class="{
         'checked': internalValue,
         'disabled': disabled
       }">
    <i class="fas fa-check" />
  </div>
  <div class="w-100 d-flex justify-content-between">
    <label class="ml-2"
           :class="{'disabled': disabled}">
      {{ label }}
    </label>
    <label class="ml-2"
           :class="{'disabled': disabled}">
      {{ secondaryLabel }}
    </label>
  </div>
  <input type="checkbox"
         ref="hiddenInput"
         :value="internalValue"
         v-model="internalValue"
         @change="onChange()"
         class="hidden-input">
</div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  cursor: pointer;
  .box {
    min-width: 20px;
    height: 20px;
    border-radius: 3px;
    background: $accent;
    transition: all 100ms ease-in-out;
    i {
      font-size: 0.8em;
      color: $bg;
      opacity: 0;
      visibility: hidden;
    }
    &.checked {
      background: $chula;
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
    cursor: pointer;
    margin-top: 0.27em;
    margin-bottom: 0.2em;
    font-size: 1.15rem;
    color: $text-medium ;
    @include unselectable;
    &.disabled {
      color: $muted;
    }
  }
}
.hidden-input {
  display: none;
}
</style>

<script>
export default {
  name: 'checkbox',
  props: {
    label: {
      default: '',
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
    }
  },
  data () {
    return {
      internalValue: false
    }
  },
  methods: {
    updateValue () {
      if (!this.disabled) {
        this.$refs.hiddenInput.click()
      }
    },
    onChange () {
      this.$emit('input', this.internalValue)
      this.$emit('change')
    }
  },
  beforeMount () {
    this.internalValue = this.value
  },
  watch: {
    value (val) {
      this.internalValue = val
    }
  }
}
</script>