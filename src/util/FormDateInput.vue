<template>
<div class="form-group">
  <label v-if="label">
    {{ label }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life text-primary icon-sm" />
  </label>
  <datepicker v-bind="$attrs"
              v-on="listeners"
              :language="th"
              :disabled="disabled"
              :highlighted="{ dates: [new Date()] }"
              :bootstrap-styling="true">
    <div slot="afterDateInput" class="append-icon">
      <i class="far fa-calendar-alt" />
    </div>
  </datepicker>
</div>
</template>

<style lang="scss">
.vdp-datepicker .input-group {
  position: relative;
  input {
    border-radius: 0.25rem !important;
    background: $accent;
    cursor: pointer;
    &[disabled="disabled"] {
      background: $accent-light;
      cursor: default;
    }
  }
  .append-icon {
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    right: 5px;
    width: 20px;
    height: 20px;
    z-index: 10;
    color: $muted;
    pointer-events: none;
  }
}

.vdp-datepicker__calendar {
  @include dropdown-menu;
  * {
    border-width: 0 !important;
  }
  span.cell {
    border-radius: 3px;
    font-size: 1.2rem;
    &.day, &.month, &.year {
      &.selected {
        background: $primary;
        color: $light;
        cursor: default !important;
      }
      &:not(.blank):not(.disabled):not(.selected):hover {
        background: $accent;
        color: $primary;
        border-color: transparent;
      }
    }
    &.day-header {
      color: $muted;
      font-size: 1.1rem;
    }
  }
  header span {
    &.prev, &.next, &.day__month_btn, &.month__year_btn {
      border-radius: 3px;
      font-size: 1.4rem;
      &:hover {
        background: $accent !important;
      }
    } 
  }
}
</style>

<script>
import Datepicker from 'vuejs-datepicker'
import { th } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'form-date-input',
  components: { Datepicker },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: ev => this.$emit('input', ev),
      }
    }
  },
  data () {
    return { th: th }
  }
}
</script>