<template>
<div id="app">
  <router-view />
</div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss'; // Bootstrap
@import '@/styles/styles.scss';           // App global styles
</style>

<script>
export default {
  name: 'app',
  methods: {
    onScroll () {
      const navbar = document.getElementById('titlebar')
      if (window.pageYOffset > 20) {
        navbar.classList.add('scrolled')   
      } else {
        navbar.classList.remove('scrolled')
      }
    }
  },
  mounted () {
    window.onscroll = () => { this.onScroll() }
  }
}
</script>
