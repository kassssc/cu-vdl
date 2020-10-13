<template>
<div class="page page-xl d-flex align-items-start">
  <div class="sub-nav">
    <h3 class="mb-3 ml-3 d-none d-xl-inline-block">บริหารระบบ</h3>
    <router-link  :to="{name: 'admin-users-list' }"
                  class="btn btn-transparent btn-block btn-lg">
      <i class="fas fa-users btn-inner-icon-lg"></i>
      <div class="d-none d-xl-inline-block">
        รายการ Account
      </div>
    </router-link>
    <router-link  :to="{ name: 'admin-orgs-list' }"
                  class="btn btn-transparent btn-block btn-lg">
      <i class="fas fa-sitemap btn-inner-icon-lg"></i>
      <div class="d-none d-xl-inline-block">
        รายการ องค์กร
      </div>
    </router-link>
    <router-link  :to="{ name: 'admin-create-user' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-user-plus btn-inner-icon-lg"></i>
      <div class="d-none d-xl-inline-block">
        สร้าง Account
      </div>
    </router-link>
    <router-link  :to="{ name: 'admin-create-org' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-plus-square btn-inner-icon-lg"></i>
      <div class="d-none d-xl-inline-block">
        สร้างองค์กร
      </div>
    </router-link>
    <!-- <router-link  :to="{ name: 'submit-samples' }"
                  class="btn btn-transparent btn-block btn-lg"
                  exact>
      <i class="fas fa-vial btn-inner-icon-lg"></i>
      <div class="d-none d-xl-inline-block">
        สร้างการส่งตัวอย่าง
      </div>
    </router-link> -->

  </div>
  <div class="flex-1">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</div>
</template>

<script>
export default {
  name: 'admin-panel'
}
</script>