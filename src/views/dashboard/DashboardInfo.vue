<template>
<div class="p-4">
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-address-card icon-lg mr-1"></i>
        ข้อมูล Account
      </h3>
    </div>
  </div>

  <div class="font-chatthai">
    <div class="border-bottom-lighter row w-100 py-3 mb-3">
      <div class="col-xl-2 col-12">
        <h4>ข้อมูลผู้ใช้</h4>
      </div>
      <div class="col-xl-10 col-12">
        <div class="form-row">
          <FormInput
            class="col-5"
            input-class="form-control-lg text-primary"
            label="ประเภท Account"
            :value="accountTypes[user.accountType]"
            disabled />
          <div class="w-100"></div>
          <FormInput
            class="col-5"
            label="ชื่อ"
            :value="`${user.title}${user.firstName} ${user.lastName}`"
            disabled />
          <div class="w-100"></div>
          <FileView
            v-if="!userIsAdmin"
            class="col-5"
            label="สำเนาบัตรประชาชน"
            file-name="somkuan_id.pdf"
            icon-class="fa-address-card" />
        </div>
      </div>
    </div>
  
    <div class="border-bottom-lighter row w-100 py-3 mb-3">
      <div class="col-xl-2 col-12">
        <h4>ข้อมูลการติดต่อ</h4>
      </div>
      <div class="col-xl-10 col-12">
        <div class="form-row">
          <FormInput
            class="col-5"
            label="อีเมล"
            disabled
            :value="user.email" />
          <div class="w-100"></div>
          <FormInput
            class="col-5"
            label="หมายเลขโทรศัพท์"
            disabled
            :value="user.phone" />
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
  name: 'dashboard-info',
  computed: {
    ...mapGetters([
      'user',
      'org',
      'accountTypes',
      'userIsAdmin',
    ])
  },
}
</script>