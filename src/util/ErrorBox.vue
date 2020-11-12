<template>
<div class="error-box vertical-align-middle mt-2 text-center font-cu">
  <i class="fas fa-exclamation icon-sm mr-2" />{{ msg }}
</div>
</template>

<script>
export default {
  name: 'error-box',
  props: {
    msg: {
      type: String,
      default: 'ข้อมูลไม่ถูกต้อง'
    }
  }
}
</script>

<style lang="scss" scoped>
.error-box {
  @include unselectable;
  @include input-btn-padding;
  border-radius: $border-radius;
  background: rgba($red, .2);
  font-weight: bold;
  font-size: 1.2rem;
  height: 2.1rem;
  color: $danger;
}
</style>