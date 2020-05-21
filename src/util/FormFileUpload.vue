<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelSize">
    {{ label }}
    <i  v-if="required"
        class="fas fa-star-of-life" />
  </label>
  <div  class="file-input form-control pointer d-flex align-items-center justify-content-between"
        :class="inputClass"
        tabIndex="0"
        @click="$refs.hiddenInput.click()">
    <label class="inner">เลือกไฟล์...</label>
    <i class="fas fa-file-upload" />
    <input  type="file"
            ref="hiddenInput"
            class="d-none">
  </div>
</div>
</template>

<style lang="scss" scoped>
.file-input {
  i { color: $muted; }
  &:hover i {
    color: $primary;
  }
}
label.inner {
  margin-top: 0.15em;
  margin-bottom: 0;
  font-size: 1em;
  color: $placeholder;
}
</style>

<script>
export default {
  name: 'form-file-upload',
  props: {
    inputClass: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    labelSize: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      file: undefined
    }
  },
  methods: {
  }
}
</script>