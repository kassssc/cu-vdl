<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelSize">
    {{ label }}
  </label>
  <div class="d-flex">
    <button class="btn btn-block text-left"
            :class="btnClass">
      <i  v-if="iconClass"
          class="fas btn-inner-icon mr-2"
          :class="iconClass" />
      {{ fileName }}
    </button>
    <button class="btn btn-download"
            :class="btnClass">
      <i class="fa fa-file-download" />
    </button>
  </div>
</div>
</template>

<style lang="scss" scoped>
button.btn.btn-download {
  margin-left: 8.5px;
}
</style>

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