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
      <div class="modal-header pb-0">
        <slot name="modal-header" />
        <button v-if="xClose"
                type="button"
                class="close btn"
                data-dismiss="modal"
                aria-label="Close">
          <span aria-hidden="true"><i class="fas fa-times" /></span>
        </button>
      </div>
      <div class="modal-body">
        <slot name="modal-body" />
      </div>
      <div class="modal-footer p-0">
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
.btn.close {
  position: absolute;
  top: .5rem; right: .5rem;
  &:hover {
    color: $red;
  }
}
</style>