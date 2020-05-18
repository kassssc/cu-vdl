<template>
<div  :id="modalId"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      :data-backdrop="dataBackdrop">
  <div  class="modal-dialog"
        :class="modalDialogClass"
        role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="modal-header" />
        <button v-if="xClose"
                type="button"
                class="close btn"
                data-dismiss="modal"
                aria-label="Close">
          <span aria-hidden="true"><i class="fas fa-times icon-md" /></span>
        </button>
      </div>
      <div class="modal-body py-0">
        <slot name="modal-body" />
      </div>
      <div class="modal-footer">
        <slot name="modal-footer" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'modal',  
  props: {
    modalId: {
      type: String,
      required: true
    },
    dataBackdrop: {
      default: true
    },
    modalDialogClass: {
      type: String,
      default: 'modal-md modal-dialog-centered'
    },
    xClose: {
      type: Boolean,
      default: false
    }
  },
}

</script>

<style lang="scss" scoped>
.modal {
  font-family: 'CHULALONGKORN';
}
</style>