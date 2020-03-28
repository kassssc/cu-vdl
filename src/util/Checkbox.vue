<template>
<div class="checkbox" @click="updateValue()">
  <div class="box d-flex justify-content-center align-items-center"
       :class="{'checked': value}">
    <i v-if="value" class="fas fa-check"></i>
  </div>
  <label class="form-label mb-0 ml-2">
    {{ label }}
  </label>
  <input type="checkbox"
         ref="hiddenInput"
         :value="internalValue"
         v-model="internalValue"
         @change="$emit('input', $event.target.value === 'true')"
         class="hidden-input">
</div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  .box {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    background: $grey;
    i {
      font-size: 0.8em;
      color: $bg;
    }
    &.checked {
      background: $chula;
    }
  }
}
.hidden-input {
  display: none;
}
label {
  cursor: pointer;
}
</style>

<script>
export default {
  name: 'checkbox',
  props: {
    label: {
      type: String
    },
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      internalValue: undefined
    }
  },
  methods: {
    updateValue () {
      this.$refs.hiddenInput.click()
    }
  }
}
</script>