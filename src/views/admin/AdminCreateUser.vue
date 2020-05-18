<template>
  <div class="p-4">

    <div class="row">
      <div class="col-12">
        <h3 class="mb-4">
          <i class="fas fa-user-plus icon-lg mr-1"></i>
          สร้าง Account ตัวแทนส่งตัวอย่าง
        </h3>
      </div>
    </div>

    <div class="font-chatthai">
      <div class="border-bottom-lighter row w-100 py-3">
        <div class="col-xl-3 col-12">
          <h4>ประเภท Account</h4>
        </div>
        <div class="col-xl-8 col-12">
          <div class="form-row">
            <FormInlineSelect 
              class="col-10"
              :options="userTypeOptions" 
              v-model="userFormData.accountType" />
          </div>
        </div>
      </div>
  
      <div class="row w-100 py-3">
        <div class="col-xl-3 col-12">
          <h4>ข้อมูลตัวแทนส่งตัวอย่าง</h4>
        </div>
        <div class="col-xl-8 col-12">
          <div class="form-row">
            <FormSelect
              class="col-2 d-flex align-items-end"
              :clearable="false"
              :searchable="false"
              :options="nameTitles" />
            <FormInput
              class="col-3"
              label="ชื่อจริง"
              type="Text"
              v-model="userFormData.firstName" />
            <FormInput
              class="col-5"
              label="นามสกุล"
              type="Text"
              v-model="userFormData.lastName" />
            <FormInput
              class="col-5"
              label="อีเมล"
              type="Text"
              v-model="userFormData.email" />
            <FormInput
              class="col-5"
              label="หมายเลขโทรศัพท์"
              type="Text"
              v-model="userFormData.phone" />
            <FormFileUpload
              class="col-5"
              label="สำเนาบัตรประชาชน" />
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
            <FormInlineSelect
              class="col-10"
              v-if="userFormData.accountType === 1"
              :options="createOrgOptions" 
              v-model="willCreateOrg" />
            <FormSelect
              v-else
              class="col-10"
              label="name"
              placeholder="ค้นหาและเลือกได้หลายองค์กร..."
              :multiple="true"
              :close-on-select="false"
              :reduce="option => option.id"
              :options="orgOptions"
              v-model="userFormData.orgs" />
          </div>
        </div>
      </div>

      <template v-if="userFormData.accountType === 1">
        <template v-if="willCreateOrg === true">
          <div class="row w-100 mb-3">
            <div class="col-xl-3 col-12">
              <h4>ข้อมูลองค์กร</h4>
            </div>
            <div class="col-xl-8 col-12">
              <div class="form-row">
                <FormInput
                  class="col-10 mb-2"
                  label="ชื่อองค์กร"
                  type="text"
                  required
                  v-model="userFormData.org.name" />
                <FormInput
                  class="col-10 mb-2"
                  label="เลขที่ ซอย ถนน"
                  type="text"
                  required
                  v-model="userFormData.org.addr1" />
                <FormInput
                  class="col-10 mb-2"
                  label="แขวง เขต / ตำบล อำเภอ"
                  type="text"
                  required
                  v-model="userFormData.org.addr2" />
                <FormInput
                  class="col-4 mb-2"
                  label="เมือง"
                  type="text"
                  v-model="userFormData.org.city" />
                <FormInput
                  class="col-4 mb-2"
                  label="จังหวัด"
                  type="text"
                  required
                  v-model="userFormData.org.province" />
                <FormInput
                  class="col-2 mb-2"
                  label="รหัสไปรษณีย์"
                  type="number"
                  required
                  v-model="userFormData.org.zip" />
              </div>
            </div>
          </div>
    
          <div class="row pb-4">
            <div class="col-xl-3 col-12">
              <h4>อัพโหลดเอกสาร</h4>
            </div>
            <div class="col-xl-8 col-12">
              <div class="form-row">
                <FormFileUpload
                  class="col-5"
                  label="ภ.พ.20"
                  required />
                <FormFileUpload
                  class="col-5"
                  label="ใบจดทะเบียนบริษัท"
                  required />
              </div>
            </div>
          </div>
        </template>
  
        <div  v-else-if="willCreateOrg === false"
              class="row w-100 pb-4">
          <div class="col-xl-3 col-12"></div>
          <div class="col-xl-8 col-12">
            <div class="form-row">
              <FormSelect
                class="col-10"
                form-label="เลือกองค์กร"
                label="name"
                placeholder="ค้นหาองค์กร..."
                :clearable="false"
                :reduce="option => option.id "
                :options="orgOptions"
                v-model="userFormData.org" />
            </div>
          </div>
        </div>
      </template>

      <div class="row w-100 py-4 border-top-lighter">
        <div class="col-xl-3 col-12">
        </div>
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
      willCreateOrg: null,
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
      createOrgOptions: [
        { id: true, name: 'สร้างองค์กรใหม่ด้วย'},
        { id: false, name: 'เพิ่มให้องค์กรที่มีอยู่แล้ว'}
      ]
    }
  }
}
</script>