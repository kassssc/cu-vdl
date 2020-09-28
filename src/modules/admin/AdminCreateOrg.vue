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
          <h4>ประเภทองค์กร</h4>
        </div>
        <div class="col-xl-8 col-12">
          <div class="form-row">
            <FormInlineSelect
              class="col-10"
              :btn-class-list="['orange', 'red']"
              v-model="orgFormData.orgType"
              :options="org_typeOptions" />
          </div>
        </div>
      </div>

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
            <FormSelect
              class="col-4 mb-2"
              form-label="จังหวัด"
              :clearable="false"
              required
              :options="provinces"
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

      <div class="row py-3">
        <div class="col-xl-2 col-12">
        </div>
        <div class="col-xl-8 col-12">
          <div class="form-row">
            <div class="form-group col-5">
              <button class="btn btn-primary btn-block"
                      @click="createOrg()">
                <i class="fas fa-plus btn-inner-icon" />
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
import { CREATE_ORG } from '@/graphql/org'
import { getJWT } from '@/vue-apollo'

export default {
  name: 'admin-create-org',
  data () {
    return {
      orgFormData: {
        orgType: null,
        name: '',
        addr1: '',
        addr2: '',
        city: '',
        province: '',
        zip: ''
      },
      org_typeOptions: [
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
      }
    }
  }
}
</script>