<template>
<div class="sub-nav-content content-height">
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-user-plus icon-lg mr-1"></i>
        สร้าง Account ตัวแทนส่งตัวอย่าง
      </h3>
    </div>
  </div>

  <div class="font-chatthai">
    <div class="row py-3 border-bottom-lighter">
      <div class="col-xl-3 col-12">
        <h4>ประเภท Account</h4>
      </div>
      <div class="col-xl-8 col-12">
        <div class="form-row">
          <FormInlineSelect 
            class="col-10"
            :btn-class-list="['purple', 'pink']"
            :options="userTypeOptions" 
            v-model="userFormData.accountType" />
        </div>
      </div>
    </div>

    <div class="row py-3">
      <div class="col-xl-3 col-12">
        <h4>ข้อมูลตัวแทนส่งตัวอย่าง</h4>
      </div>
      <div class="col-xl-8 col-12">
        <div class="form-row">
          <FormSelect
            class="col-2 d-flex align-items-end"
            :clearable="false"
            :searchable="false"
            required
            :options="nameTitles" />
          <FormInput
            class="col-3"
            label="ชื่อจริง"
            type="Text"
            required
            v-model="userFormData.firstName" />
          <FormInput
            class="col-5"
            label="นามสกุล"
            type="Text"
            required
            v-model="userFormData.lastName" />
          <FormInput
            class="col-5"
            label="อีเมล"
            type="Text"
            required
            v-model="userFormData.email" />
          <FormInput
            class="col-5"
            label="หมายเลขโทรศัพท์"
            type="Text"
            required
            v-model="userFormData.phone" />
          <FormFileUpload
            class="col-5"
            label="สำเนาบัตรประชาชน"
            required />
        </div>
      </div>
    </div>

    <div  v-if="userFormData.accountType !== null"
          class="row w-100 pt-4 pb-3 border-top-lighter">
      <div class="col-xl-3 col-12">
        <h4>{{ userFormData.accountType === 1? 'องค์กรประจำ' : 'องค์กรที่เป็นตัวแทน' }}</h4>
      </div>

      <div class="col-xl-8 col-12">
        <div class="form-row">
          <FormSelect
            v-if="userFormData.accountType === 1"
            class="col-10"
            form-label="เลือกองค์กร"
            label="name"
            placeholder="ค้นหาองค์กร..."
            :clearable="false"
            :reduce="option => option.id "
            :options="orgOptions"
            required
            v-model="userFormData.org" />
          <FormSelect
            v-else
            class="col-10"
            form-label="เลือกอย่างน้อย 1 องค์กร"
            label="name"
            placeholder="ค้นหาและเลือกได้หลายองค์กร..."
            :multiple="true"
            :close-on-select="false"
            :reduce="option => option.id"
            :options="orgOptions"
            required
            v-model="userFormData.orgs" />
        </div>
      </div>
    </div>

    <div class="row w-100 py-4 border-top-lighter">
      <div class="col-xl-3 col-12"></div>
      <div class="col-xl-8 col-12">
        <div class="form-row">
          <div class="form-group col-5">
            <button class="btn btn-primary btn-lg btn-block">
              <i class="fas fa-user-plus btn-inner-icon"></i>
              สร้าง Account
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
  name: 'admin-create-user',
  computed: {
    ...mapGetters([
      'orgOptions',
      'nameTitles'
    ])
  },
  data () {
    return {
      userFormData: {
        accountType: null,
        org: 0,
        orgs: [],
        customerList: [],
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        nationalId: null
      },
      userTypeOptions: [
        { id: 1, name: 'พนักงานประจำ'},
        { id: 2, name: 'Freelance'}
      ],
    }
  }
}
</script>