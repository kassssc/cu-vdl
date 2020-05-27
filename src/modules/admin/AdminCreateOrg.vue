<template>
  <div class="sub-nav-content content-height">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-3">
          <i class="fas fa-plus-square icon-lg mr-1"></i>
          สร้างองค์กร
        </h3>
      </div>
    </div>

    <div class="font-chatthai">
      <div class="row py-3 border-b">
        <div class="col-xl-2 col-12">
          <h4>ข้อมูลองค์กร</h4>
        </div>
        <div class="col-xl-8 col-12">
          <div class="form-row">
            <FormInput
              class="col-10 mb-4"
              label="ชื่อองค์กร"
              type="text"
              required
              v-model="orgFormData.name" />
            <FormInput
              class="col-10 mb-2"
              label="เลขที่ ซอย ถนน"
              type="text"
              required
              v-model="orgFormData.addr1" />
            <FormInput
              class="col-10 mb-2"
              label="แขวง เขต / ตำบล อำเภอ"
              type="text"
              required
              v-model="orgFormData.addr2" />
            <FormInput
              class="col-4 mb-2"
              label="เมือง"
              type="text"
              v-model="orgFormData.city" />
            <FormInput
              class="col-4 mb-2"
              label="จังหวัด"
              type="text"
              required
              v-model="orgFormData.province" />
            <FormInput
              class="col-2 mb-2"
              label="รหัสไปรษณีย์"
              type="number"
              required
              v-model="orgFormData.zip" />
          </div>
        </div>
      </div>

      <div class="row py-3 border-b">
        <div class="col-xl-2 col-12">
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

      <div class="row w-100 py-3">
        <div class="col-xl-2 col-12">
        </div>
        <div class="col-xl-8 col-12">
          <div class="form-row">
            <div class="form-group col-5">
              <button class="btn btn-primary btn-lg btn-block">
                <i class="fas fa-plus btn-inner-icon"></i>
                สร้างองค์กร
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'admin-create-org',
  data () {
    return {
      orgFormData: {
        name: '',
        addr1: '',
        addr2: '',
        city: '',
        province: '',
        zip: ''
      }
    }
  }
}
</script>