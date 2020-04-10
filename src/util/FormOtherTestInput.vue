<template>
<div class="form-row mt-2">
  <div class="form-group col-7 mb-0 d-flex">
    <input type="text"
           ref="testNameInput"
           class="form-control form-control-sm"
           v-model="internalValue.name"
           @blur="onNameInputBlur()">
  </div>
  <div class="form-group col-2 mb-0 position-relative">
    <input type="number" min="0" 
           class="form-control form-control-sm text-right w-75"
           v-model.number="internalValue.sampleCount"
           @focus="$event.target.select()"
           @blur="onCountInputBlur()">
    <a class="btn btn-sm btn-x"
       @click="onDelete()">
      <i class="fas fa-times" />
    </a>
  </div>
</div>
</template>

<style lang="scss" scoped>
.btn-x {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 28px;
  width: 28px;
  &:hover {
    color: $chula;
    background: transparent;
  }
  i {
    font-size: 0.9rem;
  }
}
</style>

<script>
export default {
  name: 'form-other-test-input',
  props: [
    'sampleCount'
  ],
  computed: {
    isInvalid () {
      return false
    }
  },
  data () {
    return {
      internalValue: {
        sampleCount: null,
        name: ''
      }
    }
  },
  methods: {
    onCountInputBlur () {
      // Floor to not allow decimals
      let newCount = Math.floor(this.internalValue.sampleCount)
      // Set to null if left empty or negative
      if (!newCount || newCount <= 0) {
        newCount = null
      // Set to 100 if larger than 100
      } else if (newCount > 100) {
        newCount = 100
      }
      this.internalValue.sampleCount = newCount 
      this.$emit('input', this.internalValue)
      this.$emit('change')
    },
    onNameInputBlur () {
      this.$emit('input', this.internalValue)
    },
    onDelete () {
      this.$emit('delete')
      this.$emit('change')
    }
  }
}
</script>