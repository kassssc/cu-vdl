<template>
<div class="page max-width-1500 d-flex align-items-start">
  <div id="admin-nav" class="sub-nav sticky p-4">
    <h2 class="mb-4 ml-3">บริหารระบบ</h2>
    <router-link  :to="{name: 'admin-create-user'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-user-plus btn-inner-icon-lg"></i> สร้าง Account
    </router-link>
    <router-link  :to="{name: 'dashboard-edit'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact
                  disabled>
      <i class="fas fa-users btn-inner-icon-lg"></i> รายการ Account
    </router-link>
    <router-link  :to="{name: 'dashboard'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact
                  disabled>
      <i class="fas fa-sitemap btn-inner-icon-lg"></i> รายการ องค์กร
    </router-link>
    <router-link  :to="{name: 'submitsamples'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact
                  disabled>
      <i class="fas fa-vial  btn-inner-icon-lg"></i> สร้างการส่งตัวอย่าง
    </router-link>

  </div>
  <div id="admin-content" class="border-left-lighter">
    <router-view />
  </div>
</div>
</template>

<style lang="scss" scoped>
$nav-width: 325px;
#admin-nav {
  width: $nav-width;
}
#admin-content {
  width: calc(100% - #{$nav-width});
  min-height: $content-height;
}
.notifications-badge {
  position: absolute;
  text-align: center;
  font-weight: bold;
  padding: 0 0.25em;
  height: 25px;
  margin-top: auto;
  margin-bottom: auto;
  top: 0; bottom: 0; left: 185px;
  border-radius: 5px;
  @include color-primary-white;
  p {
    font-size: 1.3rem;
    margin-top: -2px;
    margin-bottom: 0px;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'admin-panel',
  computed: {
    ...mapGetters([
      'userIsCU',
      'userIsEmployee',
      'userIsFreelance',
    ])
  }
}
</script>