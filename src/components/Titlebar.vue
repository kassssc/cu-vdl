<template>
<div  id="titlebar"
      class="d-flex justify-content-between align-items-center">
  <div class="d-flex align-items-center">
    <div id="logo-img" />
    <h4 class="text-primary d-none d-xl-block">
      หน่วยชันสูตรโรคสัตว์กลาง จุฬาลงกรณ์มหาวิทยาลัย
    </h4>
    <h4 class="text-primary d-none d-lg-block d-xl-none">
      หน่วยชันสูตรโรคสัตว์กลาง จุฬาฯ
    </h4>
  </div>
  <div  v-if="loggedIn"
        class="d-flex align-items-stretch">
    <router-link  :to="{name: 'home'}"
                  tag="a"
                  class="btn btn-transparent mr-2"
                  exact>
      <i class="fas fa-home btn-inner-icon"></i>
      หน้าหลัก
    </router-link>

    <template v-if="userIsAdmin">
      <router-link  :to="{name: 'submissionslist'}"
                    tag="a"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-list btn-inner-icon"></i>
        การส่งตัวอย่าง
      </router-link>
      <router-link  :to="{name: 'admin-requests'}"
                    tag="a"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-scroll btn-inner-icon"></i>
        ตอบรับคำขอ
        <div class="notifications-badge">
          <p>4</p>
        </div>
      </router-link>
      <router-link  :to="{name: 'admin-create-user'}"
                    tag="a"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-tools btn-inner-icon"></i>
        บริหารข้อมูล
      </router-link>
    </template>

    <template v-else>
      <router-link :to="{name: 'submissionslist'}"
                  tag="a"
                  class="btn btn-transparent mr-2">
        <i class="fas fa-file-invoice btn-inner-icon"></i>
        ติดตามผลและรายงาน
      </router-link>
      <router-link  :to="{name: 'submitsamples'}"
                    tag="a"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-vial btn-inner-icon"></i>
        ส่งตัวอย่าง
      </router-link>
    </template>
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
                  class="btn btn-transparent mr-2">
      <span class="mr-2">{{ user.firstName }}</span>
      <span class="d-xl-inline d-none mr-2">{{ user.lastName }}</span>
      <i class="fas fa-cog btn-inner-icon mr-0"></i>
    </router-link>
    <button class="btn btn-transparent btn-icon d-flex"
            @click="logoutAndNavigateToHome()">
      <i class="fas fa-sign-out-alt" />
    </button>
    
  </div>

  <div  v-else
        class="d-flex align-items-center">
    <scrollactive active-class="scrollactive-active"
                  :offset="80"
                  :modify-url="false"
                  highlight-first-item
                  class="d-flex align-items-center">
      <a  href="#home"
          class="btn btn-transparent scrollactive-item mr-2">
        <i class="fas fa-home btn-inner-icon"></i>
        หน้าหลัก
      </a>
      <a  href="#services"
          class="btn btn-transparent scrollactive-item mr-2">
        <i class="fas fa-microscope btn-inner-icon"></i>
        การบริการของเรา
      </a>
      <a  href="#orgchart"
          class="btn btn-transparent scrollactive-item mr-2">
        <i class="fas fa-user-graduate btn-inner-icon"></i>
        บุคลากร
      </a>
      <a  href="#contact"
          class="btn btn-transparent scrollactive-item mr-2">
        <i class="fas fa-phone btn-inner-icon"></i>
        ติดต่อสอบถาม
      </a>
    </scrollactive>
    <router-link  :to="{name: 'login'}"
                  tag="button"
                  class="btn btn-primary ml-3 px-4">
      <i class="fas fa-sign-in-alt btn-inner-icon" />
      เข้าสู่ระบบ
    </router-link>
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
  display: inline-block;
  text-align: center;
  font-weight: bold;
  padding: 0 0.25em;
  border-radius: 5px;
  height: 24px;
  margin-left: .1em;
  @include color-primary-white;
  p {
    font-size: 0.8em;
    margin-bottom: 0px;
  }
}
/*
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
.lang-selector {
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

export default {
  name: 'title-bar',
  computed: {
    ...mapGetters([
      'nav',
      'loggedIn',
      'user',
      'userIsAdmin'
    ])
  },
  methods: {
    ...mapActions([
			'logout',
    ]),
    logoutAndNavigateToHome () {
      this.logout()
      if (this.$route.name !== 'home') {
        this.$router.push('/')
      }
    }
  }
}
</script>
