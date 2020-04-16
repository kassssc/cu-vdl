<template>
<div id="titlebar" class="d-flex justify-content-between align-items-center">
  <div class="d-flex align-items-center">
    <div id="logo-img" />
    <h4 class="text-primary d-none d-xl-block">
      {{ $t(`title`) }}
    </h4>
    <h4 class="text-primary d-xl-none">
      หน่วยชันสูตรโรคสัตว์กลาง จุฬาฯ
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
    <router-link  v-if="!loggedIn"
                  :to="{name: 'login'}"
                  tag="button"
                  class="btn btn-primary btn-width-md ml-3">
      {{ $t(`general.login`) }}
    </router-link>
    <div v-if="loggedIn"
          class="d-flex align-items-center">
      <div class="position-relative ml-1 mr-3">
        <button class="btn btn-transparent btn-icon">
          <i class="fas fa-bell"></i>
        </button>
        <div class="notifications-badge font-chatthai">
          8
        </div>
      </div>
      <h5 class="mx-1 d-none d-xl-block">
        สมควร สมสกุล
      </h5>
      <h6 class="mx-1 d-xl-none d-block">
        สมควร สมสกุล
      </h6>
      <button class="btn btn-transparent btn-icon mx-1 d-none d-xl-block">
        <i class="fas fa-cog"></i>
      </button>
      <button class="btn btn-transparent btn-icon ml-1 d-none d-xl-block"
              @click="logout()">
        <i class="fas fa-sign-out-alt" />
      </button>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
#titlebar {
  z-index: 999;
  position: fixed;
  top: 0; left: 0;
  padding: 1em 30px;
  width: 100%; 
  height: 95px;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all 100ms ease-in-out;
  &.scrolled {
    border-bottom: 1px solid $accent;
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
    background-image: url('https://i.ibb.co/PWZBG5p/logo.png');
    transition: all 100ms ease-in-out;
  }
}
.notifications-badge {
  position: absolute;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
  width: 25px;
  height: 26px;
  top: -9px;
  right: -10px;
  border-radius: 5px;
  @include color-chula-white;
}
/* .lang-selector {
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
} */
// Firefox style fixes for no backdrop-filter support
@-moz-document url-prefix(){
  #titlebar {
    background: $bg;
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
