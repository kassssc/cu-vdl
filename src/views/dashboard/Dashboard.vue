<template>
<div class="page page-lg d-flex">
  <div class="sub-nav">
    <h2 class="mb-4 ml-3">Account</h2>
    <router-link  :to="{name: 'dashboard'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-address-card btn-inner-icon-lg"></i> ข้อมูล Account
    </router-link>
    <router-link  :to="{name: 'dashboard-edit'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-edit btn-inner-icon-lg"></i> แก้ไขข้อมูล Account
    </router-link>
    <router-link  v-if="userIsEmployee"
                  :to="{name: 'dashboard-employee-org'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-sitemap btn-inner-icon-lg"></i> ข้อมูลองค์กร
    </router-link>
    <router-link  v-if="userIsFreelance"
                  :to="{name: 'dashboard-freelance-orgs'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-sitemap btn-inner-icon-lg"></i> องค์กรที่เป็นตัวแทน
    </router-link>
  </div>
  <div class="sub-nav-content content-height">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'userIsAdmin',
      'userIsEmployee',
      'userIsFreelance',
    ])
  }
}
</script>