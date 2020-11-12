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
  methods: {
    on_scroll () {
      const navbar = document.getElementById('titlebar')
      if (window.pageYOffset > 20) {
        navbar.classList.add('scrolled')   
      } else {
        navbar.classList.remove('scrolled')
      }
    }
  },
  mounted () {
    window.onscroll = () => { this.on_scroll() }
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss'; // Bootstrap
@import '@/styles/styles.scss';           // App global styles
</style>