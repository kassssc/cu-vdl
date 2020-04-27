<template>
<div id="app">
  <router-view />
</div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss'; // Bootstrap
@import '@/styles/styles.scss';           // App global styles
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>

export default {
  name: 'app',
  data() {
    return {
    }
  },
  methods: {
    onScroll() {
      const navbar = document.getElementById('titlebar')
      if (window.pageYOffset > 20) {
        navbar.classList.add('scrolled')   
      } else {
        navbar.classList.remove('scrolled')
      }
      const submitSampleNav = document.getElementById('submit-sample-nav')
      if (submitSampleNav) {
        if (window.pageYOffset > 75) {
          submitSampleNav.classList.add('fixed')   
        } else {
          submitSampleNav.classList.remove('fixed')   
        }
      }
    }
  },
  mounted() {
    window.onscroll = () => { this.onScroll() }
  }
}
</script>
