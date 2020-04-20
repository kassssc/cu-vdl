<template>
<div  class="file-input form-control pointer d-flex align-items-center justify-content-between"
      tabIndex="0"
      @click="$refs.hiddenInput.click()">
  <label class="pointer">เลือกไฟล์...</label>
  <i class="fas fa-file-upload"></i>
  <input  type="file"
          ref="hiddenInput"
          class="d-none">
</div>
</template>

<style lang="scss" scoped>
.file-input {
  i { color: $muted; }
  &:hover i {
    color: $primary;
  }
}
label {
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