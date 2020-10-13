<template>
<div  class="light-tag"
      :class="[color, size]">
  <div  class="small-square mr-1"
        :class="color" />
  {{ label }}
</div>
</template>

<script>
export default {
  name: 'color-tag',
  props: {
    color: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ''
    },
    label : {
      type: String,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.light-tag {
  @include unselectable;
  border-radius: $border-radius;
  padding: 0 .4em;
  display: inline-block;
  font-size: .95em;
  font-weight: bold;
  &.lg {
    font-size: 1.3em;
    @include input-btn-padding;
  }
  .small-square { vertical-align: middle; }
  &.primary { background: rgba($primary, .2); }
  &.pink    { background: rgba($pink, .2); }
  &.purple  { background: rgba($purple, .2); }
  &.grey    { background: rgba($medium, .2); }
  &.red     { background: rgba($red, .2); }
  &.green   { background: rgba($green, .2); }
  &.blue    { background: rgba($blue, .2); }
  &.orange  { background: rgba($orange, .2); }
  &.teal    { background: rgba($teal, .2); }
  &.blue    { background: rgba($blue, .2); }
}
</style>