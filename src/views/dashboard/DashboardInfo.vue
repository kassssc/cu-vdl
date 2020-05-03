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
            label="ชื่อจริง"
            :value="`${user.title}${user.firstName}`"
            disabled />
          <FormInput
            class="col-5"
            label="นามสกุล"
            :value="user.lastName"
            disabled />
          <div class="w-100"></div>
          <FileView
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
          <FormInput
            class="col-5"
            label="หมายเลขโทรศัพท์"
            disabled
            :value="user.phone" />
        </div>
      </div>
    </div>
  
    <template v-if="userIsEmployee">
      <div class="row border-bottom-lighter w-100 py-3 mb-3">
        <div class="col-xl-2 col-12">
          <h4>ข้อมูลองค์กร</h4>
        </div>
        <div class="col-xl-10 col-12">
          <div class="form-row">
            <FormInput
              class="col-10"
              label="ชื่อองค์กร"
              :value="org.name"
              disabled />
            <FormInput
              class="col-10"
              label="ที่อยู่"
              :value="org.addr.line1"
              disabled />
            <FormInput
              class="col-10"
              :value="org.addr.line2"
              disabled />
            <FormInput
              class="col-4"
              label="เมือง"
              :value="org.addr.city"
              disabled />
            <FormInput
              class="col-4"
              label="จังหวัด"
              :value="org.addr.province"
              disabled />
            <FormInput
              class="col-2"
              label="รหัสไปรษณีย์"
              :value="org.addr.zip"
              disabled />
            <FileView
              class="col-5"
              label="ภ.พ.20"
              file-name="ภพ20_somkuan_farm.pdf"
              icon-class="fa-file-alt" />
            <FileView
              class="col-5"
              label="ใบจดทะเบียนบริษัท"
              file-name="registration_somkuan_farm.pdf"
              icon-class="fa-file-alt" />
          </div>
        </div>
      </div>
    
      <!-- <div class="border-bottom-lighter row w-100 py-3 mb-3">
        <div class="col-xl-2 col-12">
          <h4>
            ผู้ติดต่อหลัก
          </h4>
        </div>
        <div class="col-xl-10 col-12">
          <div class="form-row">
            <FormInput
              class="col-5"
              label="ชื่อ นามสกุล"
              :value="`${org.mainContactPerson.firstName} ${org.mainContactPerson.lastName}`"
              disabled />
            <div class="w-100"></div>
            <FormInput
              class="col-5"
              label="อีเมล"
              :value="org.mainContactPerson.email"
              disabled />
            <FormInput
              class="col-5"
              label="หมายเลขโทรศัพท์"
              :value="org.mainContactPerson.phone"
              disabled />
          </div>
        </div>
      </div> -->
    </template>
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
      'userIsEmployee'
    ])
  },
}
</script>