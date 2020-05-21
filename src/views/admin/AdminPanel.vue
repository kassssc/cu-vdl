<template>
<div class="page page-xl d-flex align-items-start">
  <div class="sub-nav">
    <h2 class="mb-4 ml-3">บริหารระบบ</h2>
    <router-link  :to="{ name: 'admin' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-user-plus btn-inner-icon-lg"></i> สร้าง Account
    </router-link>
    <router-link  :to="{ name: 'admin-create-org' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-plus-square btn-inner-icon-lg"></i> สร้างองค์กร
    </router-link>
    <router-link  :to="{name: 'admin-users-list' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-users btn-inner-icon-lg"></i> รายการ Account
    </router-link>
    <router-link  :to="{ name: 'admin-orgs-list' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-sitemap btn-inner-icon-lg"></i> รายการ องค์กร
    </router-link>
    <router-link  :to="{ name: 'submit-samples' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-vial btn-inner-icon-lg"></i> สร้างการส่งตัวอย่าง
    </router-link>

  </div>
  <div class="flex-1">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'admin-panel',
  computed: {
    ...mapGetters([
      'userIsAdmin',
      'userIsEmployee',
      'userIsFreelance',
    ])
  }
}
</script>