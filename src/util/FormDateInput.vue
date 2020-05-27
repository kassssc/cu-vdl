<template>
<div class="form-group">
  <label v-if="label">
    {{ label }}
    <i  v-if="required && !disabled"
        class="fas fa-star-of-life text-primary" />
  </label>
  <datepicker v-bind="$attrs"
              v-on="listeners"
              :language="th"
              :disabled="disabled"
              :highlighted="{ dates: [today] }"
              :bootstrap-styling="true"
              calendar-class="calendar">
    <template #afterDateInput>
      <i class="far fa-calendar-alt append-icon" />
    </template>
  </datepicker>
</div>
</template>

<script>
import { th } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'form-date-input',
  components: {
    Datepicker: () => import (/* webpackChunkName: "group-form" */ 'vuejs-datepicker')
  },
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
    return { 
      th: th,
      today: new Date()
    }
  }
}
</script>

<style lang="scss">
.vdp-datepicker .input-group {
  position: relative;
  input {
    border-radius: $border-radius !important;
    background: $accent;
    cursor: pointer;
    &[disabled] {
      background: $accent-light;
      cursor: default;
    }
  }
  .append-icon {
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    right: .8em;
    height: 1em;
    z-index: 10;
    color: $muted;
    pointer-events: none;
  }
}

.calendar {
  @include dropdown-menu;
  * { border-width: 0 !important; }
  span.cell {
    border-radius: .15em;
    font-size: 1.25em;
    &.day,
    &.month,
    &.year {
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
      font-size: 1.25em;
    }
  }
  header span {
    &.prev,
    &.next,
    &.day__month_btn,
    &.month__year_btn {
      border-radius: .15em;
      font-size: 1.5em;
      &:hover {
        background: $accent !important;
      }
    } 
  }
}
</style>