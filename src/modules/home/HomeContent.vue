<template>
<div v-if="auth" class="mt-5 pt-5">
  <div  v-if="auth.logged_in"
        class="subnav d-flex justify-content-center border-b p-2">
    <div class="subnav-inner w-100 d-flex align-items-center ">
      <router-link  :to="{ name: 'home' }"
                    class="btn btn-transparent mr-2"
                    exact>
        <i class="fas fa-home btn-inner-icon"></i>
        หน้าหลัก
      </router-link>
      <router-link  :to="{ name: 'services' }"
                    class="btn btn-transparent mr-2"
                    exact>
        <i class="fas fa-microscope btn-inner-icon"></i>
        การบริการของเรา
      </router-link>
      <router-link  :to="{ name: 'org-chart' }"
                    class="btn btn-transparent mr-2"
                    exact>
        <i class="fas fa-user-graduate btn-inner-icon"></i>
        บุคลากร
      </router-link>
      <router-link  :to="{ name: 'contact' }"
                    class="btn btn-transparent mr-2"
                    exact>
        <i class="fas fa-phone btn-inner-icon"></i>
        ติดต่อสอบถาม
      </router-link>
      <router-link  :to="{ name: 'pathogen-bank' }"
                    class="btn btn-transparent">
        <i class="fas fa-bacterium btn-inner-icon"></i>
        Pathogen Bank
      </router-link>
    </div>
  </div>
  <div  class="page page-lg py-4"
        :class="auth.logged_in? 'home-content-height-with-subnav' : 'home-content-height'">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
  <FooterSection />
</div>
</template>

<script>
import FooterSection from './FooterSection'
import { AUTH_DATA } from '@/graphql/local'

export default {
  name: 'home-content',
  components: {
    FooterSection
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth
    },
  }
}
</script>

<style lang="scss" scoped>
.subnav-inner {
  max-width: 1500px;
}
.home-content-height {
  min-height: calc(100vh - #{$titlebar-height} - #{$footer-height});
}
.home-content-height-with-subnav {
  min-height: calc(100vh - #{$titlebar-height} - #{$subnav-height} - #{$footer-height});
}
</style>