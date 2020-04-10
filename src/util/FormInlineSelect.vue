<template>
<div class="form-group flex-column">
  <label v-if="label" class="form-label mb-0">
    {{ label }}
  </label>
  <div class="d-flex">
    <a v-for="(option, idx) in options"
            :key="idx"
            class="btn btn-secondary btn-option"
            :class="{'selected': value === option.id}"
            @click="selectOption(option.id)">
      {{ option.name }}
    </a>
  </div>
</div>
</template>

<style lang="scss" scoped>
.btn-option {
  width: 100%;
  transition: 150ms ease-in-out;
  &.selected {
    color: $bg;
    background: $chula;
    cursor: default;
  }
  &:not(:last-child) {
    margin-right: 17px;
  }
}
</style>

<script>
export default {
  name: 'form-inline-select',
  props: {
    label: {
      type: String
    },
    value: {
      type: Number
    },
    options: {
      type: Array
    }
  },
  methods: {
    selectOption (optionId) {
      this.$emit('input', optionId)
      this.$emit('change')
    }
  }
}
</script>