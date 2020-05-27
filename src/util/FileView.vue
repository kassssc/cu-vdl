<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelSize">
    {{ label }}
  </label>
  <div class="d-flex hover-appear-wrapper">
    <h5 class="hover-appear view-file-label">ดูไฟล์</h5>
    <button class="btn btn-block text-left"
            :class="btnClass">
      <i  v-if="iconClass"
          class="fas btn-inner-icon mr-2"
          :class="iconClass" />
      {{ fileName }}
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'file-view',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelSize: {
      type: String,
      default: ''
    },
    fileLink: {
      type: String,
      default: null
    },
    fileName: {
      type: String,
      default: 'ดูไฟล์'
    },
    btnClass: {
      type: String,
      default: 'btn-secondary'
    },
    iconClass: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.view-file-label {
  position: absolute;
  top: 0;
  bottom: 0;
  right: .5em;
  margin: auto;
  height: 50%;
  pointer-events: none;
}
</style>