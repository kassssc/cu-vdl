<template>
<div class="form-group">
  <label  v-if="label"
          class="form-label"
          :class="labelClass">
    {{ label }}
  </label>
  <div class="d-flex">
    <button v-for="(option, idx) in options"
            :key="idx"
            class="btn btn-secondary btn-option no-wrap"
            :class="[
              btnClass,
              btnClassList? btnClassList[idx] : '',
              { 'selected': value === option.id }
            ]"
            :disabled="disabled"
            @click="onOptionClick(option.id)">
      <i  v-show="value === option.id && tick"
          class="fas fa-check btn-inner-icon mr-0" />
      {{ option.name }}
    </button>
  </div>

  <Modal  modal-id="warnModal"
          modal-dialog-class="modal-sm modal-dialog-centered"
          x-close>
    <template #modal-header>
      <h3 class="text-primary">
        <i class="fas fa-exclamation-triangle icon-md mr-1" />
        คำเตือน
      </h3>
    </template>
    <template #modal-body>
      <h4 class="text-dark">{{ warningMsg }}</h4>
    </template>
    <template #modal-footer>
      <div class="w-100 d-flex flex-nowrap">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-primary ml-2 w-100"
                @click="selectOption(optionToBeSelected)">
          ยืนยันว่าจะเปลี่ยน
        </button>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'form-inline-select',
  props: {
    label: {
      type: String,
      default: null
    },
    labelClass: {
      type: String,
      default: ''
    },
    value: {
      required: true
    },
    options: {
      type: Array
    },
    warnBeforeChange: {
      type: Boolean,
      default: false
    },
    warningMsg: {
      type: String,
      default: 'ข้อมูลที่กรอกไว้บางส่วนอาจจะหายถ้าเปลี่ยนตัวเลือกนี้'
    },
    btnClass: {
      type: String,
      default: null
    },
    tick: {
      type: Boolean,
      default: true
    },
    btnClassList: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      optionToBeSelected: null
    }
  },
  methods: {
    onOptionClick (optionId) {
      if (this.warnBeforeChange) {
        this.optionToBeSelected = optionId
        $('#warnModal').modal('show')
      } else {
        this.selectOption(optionId)
      }
    },
    selectOption (optionId) {
      $('#warnModal').modal('hide')
      this.optionToBeSelected = null
      this.$emit('input', optionId)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
button.btn-option {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  &.selected {
    @include color-primary-white;
    pointer-events: none;
    &.teal { background: $teal; }
    &.blue { background: $blue; }
    &.purple { background: $purple; }
    &.pink { background: $pink; }
    &[disabled] {
      opacity: 1
    }
  }
  &:not(:last-child) {
    margin-right: 17px;
  }
}
</style>