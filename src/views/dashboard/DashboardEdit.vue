<template>
<div class="p-4">
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-edit icon-lg mr-1"></i>
        แก้ไขข้อมูล Account
      </h3>
    </div>
  </div>

  <div class="font-chatthai">

    <div class="border-bottom-lighter row w-100 py-3 mb-3">
      <div class="col-xl-3 col-12">
        <h4>แก้ไขข้อมูลการติดต่อ</h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <FormInput
            class="col-6"
            label="หมายเลขโทรศัพท์"
            v-model="user.phone" />
          <div class="w-100"></div>
          <div class="form-group col-6">
            <button class="btn btn-primary btn-block mt-2">
              <i class="fas fa-phone btn-inner-icon" />
              เปลี่ยนข้อมูลการติดต่อ
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="border-bottom-lighter row w-100 py-3">
      <div class="col-xl-3 col-12">
        <h4>เปลี่ยนรหัสผ่าน</h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <FormInput
            class="col-6"
            label="รหัสผ่านเก่า"
            type="password" />
          <div class="w-100"></div>
          <FormInput
            class="col-6"
            label="รหัสผ่านใหม่"
            type="password" />
          <div class="w-100"></div>
          <FormInput
            class="col-6"
            label="ยืนยันรหัสผ่านใหม่"
            type="password" />
          <div class="w-100"></div>
          <div class="form-group col-6">
            <button class="btn btn-primary btn-block mt-2">
              <i class="fas fa-key btn-inner-icon" />
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<style lang="scss" scoped>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-edit',
  computed: {
    ...mapGetters([
      'user',
      'org'
    ])
  },
}
</script>