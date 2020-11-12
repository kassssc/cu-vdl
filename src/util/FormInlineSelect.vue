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
              { 'selected': value === option }
            ]"
            :disabled="disabled"
            @click="onOptionClick(option)">
      <i  v-show="value === option && tick"
          class="fas fa-check btn-inner-icon" />
      {{ option }}
    </button>
  </div>

  <Modal  modal-id="warnModal"
          modal-dialog-class="modal-sm modal-dialog-centered"
          x-close>
    <template #modal-header>
      <h3 class="text-primary">
        <i class="fas fa-exclamation-triangle mr-1" />
        คำเตือน
      </h3>
    </template>
    <template #modal-body>
      <h4 class="text-dark">{{ warningMsg }}</h4>
      <div class="form-row mt-4">
        <div class="form-group col-4 mb-0">
          <button type="button"
                  class="btn btn-secondary btn-block"
                  data-dismiss="modal">
            ยกเลิก
          </button>
        </div>
        <div class="form-group col-8 mb-0">
          <button type="button"
                  class="btn btn-primary btn-block"
                  @click="selectOption(option_to_be_selected)">
            ยืนยันว่าจะเปลี่ยน
          </button>
        </div>        
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
      option_to_be_selected: null
    }
  },
  methods: {
    onOptionClick (option) {
      if (this.warnBeforeChange) {
        this.option_to_be_selected = option
        $('#warnModal').modal('show')
      } else {
        this.selectOption(option)
      }
    },
    selectOption (option) {
      $('#warnModal').modal('hide')
      this.option_to_be_selected = null
      this.$emit('input', option)
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
    &.orange { background: $orange; }
    &.red { background: $red; }
    &.yellow { background: $yellow; }
    &[disabled] {
      opacity: 1
    }
  }
  &:not(:last-child) {
    margin-right: 17px;
  }
}
</style>