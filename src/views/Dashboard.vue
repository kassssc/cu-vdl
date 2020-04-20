<template>
<div class="page max-width-1500 d-flex align-items-start">
  <div id="dashboard-nav" class="sticky p-4">
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
    <router-link  :to="{name: 'dashboard-submitters'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-users btn-inner-icon-lg"></i> รายชื่อตัวแทนส่งตัวอย่าง
    </router-link>
    <router-link  :to="{name: 'dashboard-add'}"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-user-plus btn-inner-icon-lg"></i> เพิ่มตัวแทนส่งตัวอย่าง
    </router-link>
  </div>
  <div id="content">
    <router-view />
  </div>
</div>
</template>

<style lang="scss" scoped>
$sidebar-width: 350px;
#dashboard-nav {
  width: $sidebar-width;
  a {
    text-align: left;
    margin-bottom: .75em;
  }
}
#content {
  width: calc(100% - #{$sidebar-width});
  min-height: calc(100vh - #{$titlebar-height} - #{$footer-height});
  border-left: 1px solid $accent;
}
</style>

<script>
export default {
  name: 'dashboard'
}
</script>