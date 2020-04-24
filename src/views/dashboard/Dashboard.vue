<template>
<div class="page max-width-1500 d-flex align-items-start">
  <div id="dashboard-nav" class="sub-nav sticky p-4">
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

    <template v-if="userIsEmployee">
      <div class="mb-4 w-100 border-bottom-lighter"></div>
      <h2 class="mb-3 ml-3">องค์กร</h2>
      <router-link  :to="{name: 'dashboard-employee-submitters'}"
                    class="btn btn-transparent btn-block btn-lg"
                    exact>
        <i class="fas fa-users btn-inner-icon-lg"></i> รายชื่อตัวแทนส่งตัวอย่าง
      </router-link>
      <router-link  :to="{name: 'dashboard-employee-addsubmitter'}"
                    class="btn btn-transparent btn-block btn-lg"
                    exact>
        <i class="fas fa-user-plus btn-inner-icon-lg"></i> เพิ่มตัวแทนส่งตัวอย่าง
      </router-link>
    </template>

    <template v-else-if="userIsFreelance">
      <div class="mb-4 w-100 border-bottom-lighter"></div>
      <h2 class="mb-3 ml-3">การส่งตัวอย่าง</h2>
      <router-link  :to="{name: 'dashboard-freelance-orgs'}"
                    class="btn btn-transparent btn-block btn-lg"
                    exact>
        <i class="fas fa-users btn-inner-icon-lg"></i> รายชื่อองค์กรที่เป็นตัวแทน
      </router-link>
      <router-link  :to="{name: 'dashboard-freelance-addorg'}"
                    class="btn btn-transparent btn-block btn-lg"
                    exact>
        <i class="fas fa-user-plus btn-inner-icon-lg"></i> ขอเป็นตัวแทนองค์กร
      </router-link>
    </template>
    
  </div>
  <div id="dashboard-content" class="border-left-lighter">
    <router-view />
  </div>
</div>
</template>

<style lang="scss" scoped>
$nav-width: 350px;
#dashboard-nav {
  width: $nav-width;
}
#dashboard-content {
  width: calc(100% - #{$nav-width});
  min-height: $content-height;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'userIsCU',
      'userIsEmployee',
      'userIsFreelance',
    ])
  }
}
</script>