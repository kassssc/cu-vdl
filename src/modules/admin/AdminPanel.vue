<template>
<div class="page page-lg">
  <div class="content-height">
    <div class="sticky-submenu admin-panel d-flex align-items-center px-2 pb-2">
      <router-link  :to="{name: 'admin-users-list' }"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-users btn-inner-icon"></i>
        รายชื่อ Account
      </router-link>
      <router-link  :to="{ name: 'admin-contacts-list' }"
                    class="btn btn-transparent mr-2">
        <i class="fas fa-address-book btn-inner-icon"></i>
        รายชื่อ Contact
      </router-link>
      <router-link  :to="{ name: 'admin-invoice-list' }"
                    class="btn btn-transparent mr-2">
        ฿ รายการ Invoice
      </router-link>
      <router-link  :to="{ name: 'admin-create-user' }"
                    class="btn btn-transparent mr-2"
                    exact>
        <i class="fas fa-user-plus btn-inner-icon"></i>
        สร้าง Account
      </router-link>
      <router-link  :to="{ name: 'admin-create-contact' }"
                    class="btn btn-transparent mr-2"
                    exact>
        <i class="fas fa-id-card btn-inner-icon"></i>
        สร้าง Contact
      </router-link>
    </div>
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

<style lang="scss" scoped>
.admin-panel {
  height: $subnav-height;
}
</style>