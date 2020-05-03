<template>
<div class="checkbox position-relative">
  <div class="box d-flex justify-content-center align-items-center my-1"
       :class="{
         'checked': value,
         'disabled': disabled
       }">
    <i class="fas fa-check" />
  </div>
  <div  v-if="label"
        class="w-100 d-flex justify-content-between">
    <label class="ml-2"
           :class="[labelSize, {'disabled': disabled}]">
      {{ label }}
    </label>
    <label class="ml-2"
           :class="{'disabled': disabled}">
      {{ secondaryLabel }}
    </label>
  </div>
  <input type="checkbox"
         :checked="value"
         @input="onChange($event.target.checked)"
         class="hidden-input"
         :disabled="disabled" >
</div>
</template>

<style lang="scss" scoped>
.hidden-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
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
      color: $light;
      opacity: 0;
      visibility: hidden;
    }
    &.checked {
      background: $primary;
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
    color: $dark;
    &.lg {
      font-size: 1.3rem;
      margin-top: .2em;
    }
    @include unselectable;
    &.disabled {
      color: $muted;
    }
  }
}
</style>

<script>
export default {
  name: 'form-checkbox',
  props: {
    label: {
      default: '',
      type: String
    },
    labelSize: {
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
    }
  },
  methods: {
    onChange (newVal) {
      this.$emit('input', newVal)
      this.$emit('change')
    }
  }
}
</script>