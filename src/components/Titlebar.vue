<template>
<div id="titlebar">
  <div class="titlebar-inner d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
      <div id="logo-img" />
      <h4 class="text-bold color-pink mb-0">
        {{ $t(`title`) }}
      </h4>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <navbar />
      <router-link to="/login"
                   tag="button"
                   class="custom pink lg ml-3">
        {{ $t(`general.login`) }}
      </router-link>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
#logo-img {
  width: 60px;
  height: 60px;
  margin-right: 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url('../assets/logo.png');
  transition: all 100ms ease-in-out;
}
#titlebar {
  position: fixed;
  top: 0; left: 0;
  padding: 0 30px;
  width: 100vw; 
  backdrop-filter: blur(15px);
  border-bottom: 1px solid transparent;
  transition: border 100ms ease-in-out;
  &.scrolled {
    border-bottom: 1px solid $grey;
    .titlebar-inner {
      height: 70px;
    }
    #logo-img {
      width: 40px;
      height: 40px;
    }
  }
  .titlebar-inner {
    margin: auto;
    width: 100%;
    height: 95px;
    padding-top: 1em;
    padding-bottom: 1em;
    transition: height 100ms ease-in-out;
  }
}
</style>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'title-bar',
  components: {
    'navbar': Navbar,
  },
  data: () => {
    return {
    }
  },
  methods: {
    handleTitlebarOnScroll() {
      const navbar = document.getElementById('titlebar')
      if (window.pageYOffset > 20) {
        navbar.classList.add('scrolled')   
      } else {
        navbar.classList.remove('scrolled')
      }
    }
  },
  mounted() {
    window.onscroll = () => { this.handleTitlebarOnScroll() }
  }
}
</script>
