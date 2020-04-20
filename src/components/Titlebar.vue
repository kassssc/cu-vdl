<template>
<div  id="titlebar"
      class="d-flex justify-content-between align-items-center">
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

    <!-- CHANGE WEBSITE LANG - PHASE 2
    <div class="lang-selector d-flex align-items-center mr-3">
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
    <div  v-if="loggedIn"
          class="d-flex align-items-center">
      
    <!-- DROP DOWN NOTIFICATIONS - PHASE 2
      <div class="dropdown ml-3 mr-3">
        <button class="btn btn-transparent btn-icon focusable"
                type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-bell"></i>
        </button>
        <div class="notifications-badge font-chatthai">
          <p>8</p>
        </div>
        <div class="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
    -->

      <router-link  :to="{name: 'dashboard'}"
                    tag="a"
                    class="btn btn-transparent btn-icon mx-1 d-none d-xl-block">
        {{ user.firstName + ' ' + user.lastName }}
        <i class="fas fa-cog ml-1"></i>
      </router-link>
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
  width: 100%; 
  height: $titlebar-height;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all 100ms ease-in-out;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: $outer-padding-sm;
  padding-right: $outer-padding-sm;
  @include media-breakpoint-up(lg) {
    padding-left: $outer-padding;
    padding-right: $outer-padding;
  }
  &.scrolled {
    border-bottom: 1px solid $accent;
    height: $titlebar-height-scrolled;
    #logo-img {
      width: 40px;
      height: 40px;
    }
  }
  #logo-img {
    @include logo;
    width: 60px;
    height: 60px;
    margin-right: 15px;
    transition: all 100ms ease-in-out;
  }
}
.notifications-badge {
  position: absolute;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0 0.25em;
  height: 20px;
  top: -4px;
  left: 26px;
  border-radius: 5px;
  @include color-primary-white;
  p {
    margin-top: -3px;
    margin-bottom: 0px;
  }
}
/* .lang-selector {
  height: 30px;
  width: 60px;
  border-radius: 5px;
  border: 2px solid $primary;
  button.btn.btn-lang {
    height: 30px;
    width: 30px;
    font-size: 1rem;
    color: $primary;
    padding: 0.15em 0.3em;
    background: transparent;
    border-radius: 5px;
    &:hover {
      color: $primary;
    }
    &.selected {
      color: $white;
      background: $primary;
      cursor: default;
    }
  }
} */
// Firefox style fixes for no backdrop-filter support
@-moz-document url-prefix() {
  #titlebar {
    background: $body-bg;
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
      'user'
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
