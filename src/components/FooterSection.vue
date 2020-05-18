<template>

<div :class="{'fixed-footer': $route.name !== 'home' && $route.name !== 'submitsamples'}">
  <div class="footer">
    <h6>
      <i class="far fa-copyright mr-1" />
      2020 Faculty of Veterinary Science, Chulalongkorn University
    </h6>
  </div>
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
.fixed-footer {
  position: fixed;
  bottom: 0;
}
</style>

<script>
export default {
  name: 'footer-section'
}
</script>