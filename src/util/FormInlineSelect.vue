<template>
<div class="flex-column">
  <label v-if="label" class="form-label mb-0">
    {{ label }}
  </label>
  <div class="d-flex">
    <button v-for="(option, idx) in options"
            :key="idx"
            class="btn btn-secondary btn-option no-wrap"
            :class="btnClass"
            :disabled="value === option.id"
            @click="onOptionClick(option.id)">
      <i  v-show="value === option.id && tick"
          class="fas fa-check btn-inner-icon" />
      {{ option.name }}
    </button>
  </div>

  <div class="modal fade" id="warnModal" tabindex="-1" role="dialog" aria-labelledby="warnModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title text-primary " id="warnModalLabel">
            <i class="fas fa-exclamation-triangle icon-md mr-1" />
            คำเตือน
          </h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i class="fas fa-times icon-md" /></span>
          </button>
        </div>
        <div class="modal-body py-0">
          <h4 class="text-dark">{{ warningMsg }}</h4>
        </div>
        <div class="modal-footer d-flex flex-nowrap">
          <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
            ยกเลิก
          </button>
          <button type="button" class="btn btn-primary w-100"
                  @click="selectOption(optionToBeSelected)">
            ยืนยันว่าจะเปลี่ยน
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.btn-option {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  &[disabled] {
    opacity: 1;
    @include color-primary-white;
  }
  &:not(:last-child) {
    margin-right: 17px;
  }
}
</style>

<script>
import $ from 'jquery'

export default {
  name: 'form-inline-select',
  props: {
    label: {
      type: String
    },
    value: {
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