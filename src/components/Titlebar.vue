<template>
<div id="titlebar" class="d-flex justify-content-between align-items-center">
  <div class="d-flex align-items-center">
    <div id="logo-img" />
    <h4 class="text-primary">
      {{ $t(`title`) }}
    </h4>
  </div>
  <div class="d-flex align-items-center">
    <navbar />
    <!-- <div class="lang-selector d-flex align-items-center mr-3">
      <button v-for="lang in langs"
              :key="lang"
              class="btn btn-lang text-uppercase"
              :class="{'selected': $i18n.locale === lang}"
              @click="$i18n.locale = lang">
        {{ lang }}
      </button>
    </div> -->
    <router-link v-if="!loggedIn"
                  :to="{name: 'login'}"
                  tag="button"
                  class="btn btn-primary btn-width-md ml-3">
      {{ $t(`general.login`) }}
    </router-link>
    <div v-if="loggedIn"
          class="d-flex align-items-center">
      <h5 class="mx-3">
        สมควร สมสกุล
      </h5>
      <button class="btn btn-transparent"
              @click="logout()">
        <i class="fas fa-sign-out-alt" />
      </button>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
#titlebar {
  z-index: 9999;
  position: fixed;
  top: 0; left: 0;
  padding: 1em 30px;
  width: 100%; 
  height: 95px;
  backdrop-filter: blur(15px);
  border-bottom: 1px solid transparent;
  transition: all 100ms ease-in-out;
  &.scrolled {
    border-bottom: 1px solid $light-accent;
    height: 70px;
    #logo-img {
      width: 40px;
      height: 40px;
    }
  }
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
}
.lang-selector {
  height: 30px;
  width: 60px;
  border-radius: 5px;
  border: 2px solid $chula;
  button.btn.btn-lang {
    height: 30px;
    width: 30px;
    font-size: 1rem;
    color: $chula;
    padding: 0.15em 0.3em;
    background: transparent;
    border-radius: 5px;
    &:hover {
      color: $chula;
    }
    &.selected {
      color: $bg;
      background: $chula;
      cursor: default;
    }
  }
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'title-bar',
  components: {
    Navbar
  },
  data () {
    return {
      langs: ['th', 'en'] 
    }
  },
  computed: {
    ...mapGetters([
      'loggedIn',
    ])
  },
  methods: {
    ...mapActions([
			'loginout',
    ]),
    logout () {
      this.loginout(false)
      this.$router.push('/')
    }
  }
}
</script>
