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
  height: 60px;
  background: $chula;
  color: $bg;
  display: flex;
  align-items: center;
  padding-left: 2em;
}
</style>

<script>
export default {
  name: 'footer-section'
}
</script>