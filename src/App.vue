<template>
<div id="app">
  <transition name="fade">
    <router-view />
  </transition>
</div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss'; // Bootstrap
@import '@/styles/styles.scss';           // App global styles
</style>