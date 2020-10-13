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
    <div class="row py-3 border-b">
      <div class="col-lg-2 col-10">
        <h4>ข้อมูลส่วนตัว</h4>
      </div>
      <div class="col-lg-7 col-10">
        <div class="form-row">
          <FormSelect
            class="col-2"
            form-label="คำนำหน้า"
            :clearable="false"
            :searchable="false"
            required
            :options="nameTitles"
            v-model="userFormData.title" />
          <FormInput
            class="col-4"
            label="ชื่อจริง"
            type="text"
            required
            v-model="userFormData.firstName" />
          <FormInput
            class="col-6"
            label="นามสกุล"
            type="text"
            required
            v-model="userFormData.lastName" />
          <FormFileUpload
            class="col-12"
            label="สำเนาบัตรประชาชน"
            required />
        </div>
      </div>
    </div>

    <div class="row py-3 border-b">
      <div class="col-lg-2 col-10">
        <h4>ที่อยู่</h4>
      </div>
      <div class="col-lg-7 col-10">
        <div class="form-row">
          <FormInput
            class="col-12 mb-2"
            label="เลขที่ ซอย ถนน"
            type="text"
            required
            v-model="userFormData.addr1" />
          <FormInput
            class="col-12 mb-2"
            label="แขวง เขต / ตำบล อำเภอ"
            type="text"
            required
            v-model="userFormData.addr2" />
          <FormInput
            class="col-4"
            label="เมือง"
            type="text"
            v-model="userFormData.city" />
          <FormSelect
            class="col-4"
            form-label="จังหวัด"
            :clearable="false"
            required
            :options="provinces"
            v-model="userFormData.province" />
          <FormInput
            class="col-4"
            label="รหัสไปรษณีย์"
            type="text"
            maxlength="5"
            required
            v-model="userFormData.zip" />
        </div>
      </div>
    </div>

    <div class="row py-3 border-b">
      <div class="col-lg-2 col-10">
        <h4>ข้อมูลติดต่อ</h4>
      </div>
      <div class="col-lg-7 col-10">
        <div class="form-row">
          <FormInput
            class="col"
            label="อีเมล"
            type="text"
            required
            v-model="userFormData.email" />
          <FormInput
            class="col"
            label="หมายเลขโทรศัพท์"
            type="text"
            maxlength="10"
            required
            v-model="userFormData.phone"
            @focus="unformatPhone()"
            @blur="formatPhone()" />
        </div>
      </div>
    </div>

    <div class="row py-3 border-b">
      <div class="col-lg-2 col-10">
        <h4>ตั้งรหัสผ่านชั่วคราว</h4>
      </div>
      <div class="col-lg-7 col-10">
        <div class="form-row">
          <FormInput
            class="col"
            label="รหัสผ่าน"
            type="text"
            required
            v-model="userFormData.password" />
          <FormInput
            class="col"
            label="ยืนยันรหัสผ่าน"
            type="text"
            required
            v-model="userFormData.confirmPassword" />
          
        </div>
      </div>
    </div>

    <div class="row py-3 border-b">
      <div class="col-lg-2 col-10">
        <h4>องค์กรที่เป็นตัวแทน</h4>
      </div>
      <div class="col-lg-7 col-10">
        <div class="form-row">
          <FormSelect
            class="col"
            form-label="เลือกอย่างน้อย 1 องค์กร"
            label="name"
            placeholder="ค้นหาและเลือกได้หลายองค์กร..."
            :multiple="true"
            :close-on-select="false"
            :reduce="option => option.index"
            :get-option-label="option => option.name"
            :options="orgSelect"
            required
            v-model="userFormData.submitterOf" />
        </div>
      </div>

    </div>

    <div class="row py-3">
      <div class="col-lg-2 col-12"></div>
      <div class="col-lg-7 col-12">
        <div class="form-row">
          <div class="form-group col-6">
            <button class="btn btn-primary btn-block loading"
                    @click="createUser()"
                    :disabled="submitting">
              <template v-if="submitting">
                <LoadingAnimation />
              </template>
              <template v-else>
                <i class="fas fa-user-plus btn-inner-icon"></i>
                สร้าง Account
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
import { getJWT } from '@/vue-apollo'
import { CREATE_USER } from '@/graphql/user'
import { ORGS_LIST } from '@/graphql/org'

export default {
  name: 'admin-create-user',
  data () {
    return {
      submitting: false,
      userFormData: {
        submitterOf: [],
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        //nationalId: null
      },
      nameTitles: [
        'นาย',
        'นาง',
        'น.ส.',
        'น.สพ.',
        'สพ.ญ.',
        'ดร.',
        'ผศ.',
        'รศ.',
        'ศ.'
      ]
    }
  },
  methods: {
    async createUser () {
      this.submitting = true
      // form validation
      const {
        password,
        submitterOf,
        title,
        firstName,
        lastName,
        email,
        phone,
      } = this.userFormData
      try {
        let res = await this.$apollo.mutate({
          mutation: CREATE_USER,
          variables: {
            jwt: getJWT(),
            password,
            submitterOf,
            title,
            firstName,
            lastName,
            email,
            phone,
          }
        })
        const newUserIndex = res.data.create_backuser.result.index
        this.$router.push({
          name: 'admin-users-list',
          params: { id: newUserIndex }
        })
      } catch (err) {
        console.log(err)
        this.submitting = false
      }
    },
    formatPhone () {
      let cleaned = ('' + this.userFormData.phone).replace(/\D/g, '')
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        this.userFormData.phone = match[1] + '-' + match[2] + '-' + match[3]
      }
      return null
    },
    unformatPhone () {
      this.userFormData.phone = this.userFormData.phone.replace(/-/g, '')
    }
  },
  apollo: {
    orgSelect: {
      query: ORGS_LIST,
      variables () {
        return {
          jwt: getJWT(),
          searchQuery: ''
        }
      },
      update: data => data.search_org.result
    }
  }
}
</script>