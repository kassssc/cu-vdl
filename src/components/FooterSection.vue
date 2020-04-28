<template>
<div class="footer">
  <h6>
    <i class="far fa-copyright mr-1" />
    {{ $t(`footer`) }}
  </h6>
</div>
</template>

<style lang="scss" scoped>
.footer {
  width: 100vw;
  height: $footer-height;
  //background: $primary;
  color: $white;
  display: flex;
  align-items: center;
  padding-left: 2em;
  background: linear-gradient(to right, $primary, $placeholder);
}
</style>

<script>
export default {
  name: 'footer-section'
}
</script>