<template>
<div class="footer">
  <h6>
    <i class="far fa-copyright mr-1" />
    2020 Faculty of Veterinary Science, Chulalongkorn University
  </h6>
</div>
</template>

<script>
export default {
  name: 'footer-section'
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100vw;
  height: $footer-height;
  color: $white;
  display: flex;
  align-items: center;
  padding-left: 2em;
  font-size: .8rem;
  background: linear-gradient(to right, $primary, $placeholder);
}
</style>