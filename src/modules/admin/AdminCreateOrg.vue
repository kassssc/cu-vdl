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
        <div class="col-xl-7 col-12">
          <div class="form-row">
            <FormInlineSelect
              class="col-12"
              label="ประเภทองค์กร"
              :btn-class-list="['orange', 'red']"
              v-model="orgFormData.orgType"
              :options="orgTypeOptions" />
            <FormInput
              class="col-12"
              label="ชื่อองค์กร"
              type="text"
              required
              v-model="orgFormData.name" />
          </div>
        </div>
      </div>

      <div class="row py-3 border-b">
        <div class="col-xl-2 col-12">
          <h4>ที่อยู่องค์กร</h4>
        </div>
        <div class="col-xl-7 col-12">
          <div class="form-row">
            
            <FormInput
              class="col-12 mb-2"
              label="เลขที่ ซอย ถนน"
              type="text"
              required
              v-model="orgFormData.addr1" />
            <FormInput
              class="col-12 mb-2"
              label="แขวง เขต / ตำบล อำเภอ"
              type="text"
              required
              v-model="orgFormData.addr2" />
            <FormInput
              class="col-4"
              label="เมือง"
              type="text"
              v-model="orgFormData.city" />
            <FormSelect
              class="col-4"
              form-label="จังหวัด"
              :clearable="false"
              required
              :options="provinces"
              v-model="orgFormData.province" />
            <FormInput
              class="col-4"
              label="รหัสไปรษณีย์"
              type="text"
              maxlength="5"
              required
              v-model="orgFormData.zip" />
          </div>
        </div>
      </div>

      <div class="row py-3 border-b">
        <div class="col-xl-2 col-12">
          <h4>อัพโหลดเอกสาร</h4>
        </div>
        <div class="col-xl-7 col-12">
          <div class="form-row">
            <FormFileUpload
              class="col"
              label="ภ.พ.20"
              required />
            <FormFileUpload
              class="col"
              label="ใบจดทะเบียนบริษัท"
              required />
          </div>
        </div>
      </div>

      <div class="row py-3">
        <div class="col-xl-2 col-12">
        </div>
        <div class="col-xl-7 col-12">
          <div class="form-row">
            <div class="form-group col-6">
              <button class="btn btn-primary btn-block loading"
                      @click="createOrg()"
                      :disabled="submitting">
                <template v-if="submitting">
                  <LoadingAnimation />
                </template>
                <template v-else>
                  <i class="fas fa-plus btn-inner-icon" />
                  สร้างองค์กร
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { CREATE_ORG } from '@/graphql/org'
import { getJWT } from '@/vue-apollo'

export default {
  name: 'admin-create-org',
  data () {
    return {
      submitting: false,
      orgFormData: {
        orgType: null,
        name: '',
        addr1: '',
        addr2: '',
        city: '',
        province: '',
        zip: ''
      },
      orgTypeOptions: [
        { name: 'ฟาร์ม', id: 1 },
        { name: 'บริษัทสัตวแพทย์', id: 2 }
      ],
      provinces: [
        'กรุงเทพฯ',
        'กระบี่',
        'กาญจนบุรี',
        'กาฬสินธุ์',
        'กำแพงเพชร',
        'ขอนแก่น',
        'จันทบุรี',
        'ฉะเชิงเทรา',
        'ชลบุรี',
        'ชัยนาท',
        'ชัยภูมิ',
        'ชุมพร',
        'เชียงใหม่',
        'เชียงราย',
        'ตรัง',
        'ตราด',
        'ตาก',
        'นครนายก',
        'นครปฐม',
        'นครพนม',
        'นครราชสีมา',
        'นครศรีธรรมราช',
        'นครสวรรค์',
        'นนทบุรี',
        'นราธิวาส',
        'น่าน',
        'บึงกาฬ',
        'บุรีรัมย์',
        'ปทุมธานี',
        'ประจวบคีรีขันธ์',
        'ปราจีนบุรี',
        'ปัตตานี',
        'พระนครศรีอยุธยา',
        'พะเยา',
        'พังงา',
        'พัทลุง',
        'พิจิตร',
        'พิษณุโลก',
        'เพชรบุรี',
        'เพชรบูรณ์',
        'แพร่',
        'ภูเก็ต',
        'มหาสารคาม',
        'มุกดาหาร',
        'แม่ฮ่องสอน',
        'ยโสธร',
        'ยะลา',
        'ร้อยเอ็ด',
        'ระนอง',
        'ระยอง',
        'ราชบุรี',
        'ลพบุรี',
        'ลำปาง',
        'ลำพูน',
        'เลย',
        'ศรีสะเกษ',
        'สกลนคร',
        'สงขลา',
        'สตูล',
        'สมุทรปราการ',
        'สมุทรสงคราม',
        'สมุทรสาคร',
        'สระแก้ว',
        'สระบุรี',
        'สิงห์บุรี',
        'สุโขทัย',
        'สุพรรณบุรี',
        'สุราษฎร์ธานี',
        'สุรินทร์',
        'หนองคาย',
        'หนองบัวลำภู',
        'อ่างทอง',
        'อำนาจเจริญ',
        'อุดรธานี',
        'อุตรดิตถ์',
        'อุทัยธานี',
        'อุบลราชธานี',
      ],
    }
  },
  methods: {
    async createOrg () {
      this.submitting = true
      const {
        orgType, addr1, addr2, city, province, zip, name
      } = this.orgFormData
      const address = `${addr1}\n${addr2}\n${city} ${province} ${zip}`
      try {
        let res = await this.$apollo.mutate({
          mutation: CREATE_ORG,
          variables: {
            jwt: getJWT(),
            orgType,
            address,
            name
          }
        })
        const newOrgIndex = res.data.create_org.result.index
        this.$router.push({
          name: 'admin-orgs-list',
          params: { id: newOrgIndex }
        })
      } catch (err) {
        console.log(err)
        this.submitting = false
      }
    }
  }
}
</script>