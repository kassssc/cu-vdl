<template>
<div  v-if="!$apollo.loading"
      id="titlebar"
      class="d-flex justify-content-between align-items-center"
      :class="{'scrolled': is_in_no_scroll_route }">
  <div class="d-flex align-items-center">
    <div id="logo-img" />
    <h4 class="text-primary d-none d-lg-block">
      หน่วยชันสูตรโรคสัตว์กลาง จุฬาลงกรณ์มหาวิทยาลัย
    </h4>
    <h4 class="text-primary d-none d-md-block d-lg-none">
      หน่วยชันสูตรโรคสัตว์กลาง จุฬาฯ
    </h4>
    <h4 class="text-primary d-md-none">
      CU VDL
    </h4>
  </div>
  <nav  v-if="auth.logged_in" class="d-flex">
    <router-link  :to="{ name: 'main' }"
                  tag="a"
                  class="btn btn-transparent mr-2">
      <i class="fas fa-home btn-inner-icon"></i>
      หน้าหลัก
    </router-link>

    <template v-if="auth.is_admin">
      <router-link  :to="{name: 'submissions-list'}"
                    tag="a"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-list btn-inner-icon"></i>
        การส่งตัวอย่าง
      </router-link>
      <router-link  :to="{name: 'admin'}"
                    tag="a"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-tools btn-inner-icon"></i>
        บริหารระบบ
      </router-link>
    </template>

    <template v-else>
      <router-link :to="{name: 'submissions-list'}"
                  tag="a"
                  class="btn btn-transparent mr-2">
        <i class="fas fa-file-invoice btn-inner-icon"></i>
        ติดตามผลการทดสอบ
      </router-link>
      <router-link :to="{name: 'invoice-list'}"
                  tag="a"
                  class="btn btn-transparent mr-2">
        ฿ รายการ Invoice
      </router-link>
    </template>

    <router-link  :to="{name: 'submit-samples'}"
                  tag="a"
                  class="btn btn-transparent mr-2">
      <i class="fas fa-vial btn-inner-icon"></i>
      {{ auth.is_admin? 'สร้างการส่งตัวอย่าง' : 'ส่งตัวอย่าง' }}
    </router-link>

    <router-link  :to="{name: 'account'}"
                  tag="a"
                  class="btn btn-transparent mr-2">
      <span class="mr-2">{{ auth.name }}</span>
      <i class="fas fa-cog btn-inner-icon mr-0"></i>
    </router-link>
    <button class="btn btn-transparent btn-icon"
            @click="logout_and_go_to_home()">
      <i class="fas fa-sign-out-alt" />
    </button>
    
  </nav>

  <nav v-else class="d-flex">
    <!-- <scrollactive active-class="scrollactive-active"
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
    </scrollactive> -->
    <router-link  :to="{ name: 'main' }"
                  class="btn btn-transparent mr-2"
                  exact>
      <i class="fas fa-home btn-inner-icon"></i>
      หน้าหลัก
    </router-link>
    <router-link  :to="{ name: 'services' }"
                  class="btn btn-transparent mr-2">
      <i class="fas fa-microscope btn-inner-icon"></i>
      การบริการของเรา
    </router-link>
    <router-link  :to="{ name: 'org-chart' }"
                  class="btn btn-transparent mr-2">
      <i class="fas fa-user-graduate btn-inner-icon"></i>
      บุคลากร
    </router-link>
    <router-link  :to="{ name: 'contact' }"
                  class="btn btn-transparent mr-2">
      <i class="fas fa-phone btn-inner-icon"></i>
      ติดต่อสอบถาม
    </router-link>
    <router-link  :to="{ name: 'pathogen-bank' }"
                  class="btn btn-transparent mr-2">
      <i class="fas fa-bacterium btn-inner-icon"></i>
      Pathogen Bank
    </router-link>
    <router-link  :to="{name: 'login'}"
                  tag="a"
                  class="btn btn-primary ml-2 px-4">
      <i class="fas fa-sign-in-alt btn-inner-icon" />
      เข้าสู่ระบบ
    </router-link>
  </nav>

</div>
</template>

<script>
import { on_logout } from '@/vue-apollo'
import { AUTH_DATA } from '@/graphql/local'
import { USER_NOTIFICATIONS } from '@/graphql/user'

export default {
  name: 'title-bar',
  data () {
    return {
      no_scroll_routes: [
        'submissions-list',
        'invoice-list'
      ]
    }
  },
  computed: {
    is_in_no_scroll_route () {
      return /^admin/.test(this.$route.name) || this.no_scroll_routes.includes(this.$route.name)
    }
  },
  methods: {
    async logout_and_go_to_home () {
      await on_logout(this.$apollo.provider.defaultClient)
      if (this.$route.name !== 'home') {
        this.$router.push('/')
      }
    },
    on_scroll () {
      const title_bar = document.getElementById('titlebar')
      if (window.pageYOffset > 20) {
        title_bar.classList.add('scrolled')   
      } else {
        title_bar.classList.remove('scrolled')
      }
    },
    set_titlebar_scroll () {
      const title_bar = document.getElementById('titlebar')
      if (this.is_in_no_scroll_route) {
        title_bar.classList.add('scrolled')
        window.onscroll = () => { }
      } else {
        title_bar.classList.remove('scrolled')
        window.onscroll = () => { this.on_scroll() }
      }
    }
  },
  watch: {
    '$route.name': function () { this.set_titlebar_scroll() }
  },
  mounted () {
    if (!this.is_in_no_scroll_route) {
      window.onscroll = () => { this.on_scroll() }
    }
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth
    },
    notifications: {
      query: USER_NOTIFICATIONS,
      update: data => data.get_backuser.result
    }
  }
}
</script>

<style scoped lang="scss">
#titlebar {
  z-index: 999;
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: $titlebar-height;
  border-bottom: 1px solid transparent;
  transition: all 100ms ease-in-out;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: $outer-padding-sm;
  padding-right: $outer-padding-sm;
  @include backdrop-blur;
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
// Firefox style fixes for no backdrop-filter support
@-moz-document url-prefix() {
  #titlebar {
    background: $body-bg;
  }
}
</style>