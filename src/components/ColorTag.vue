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