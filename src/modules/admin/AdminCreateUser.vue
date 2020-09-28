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
            :options="nameTitles"
            v-model="userFormData.title" />
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
            v-model="userFormData.phone"
            @focus="unformatPhone()"
            @blur="formatPhone()" />
          <FormInput
            class="col-5"
            label="รหัสผ่าน"
            type="Text"
            required
            v-model="userFormData.password" />
          <FormInput
            class="col-5"
            label="ยืนยันรหัสผ่าน"
            type="Text"
            required
            v-model="userFormData.confirmPassword" />
          <FormFileUpload
            class="col-5"
            label="สำเนาบัตรประชาชน"
            required />
        </div>
      </div>
    </div>

    <div class="row pt-4 pb-3 border-t">
      <div class="col-xl-3 col-12">
        <h4>องค์กรที่เป็นตัวแทน</h4>
      </div>
      <div class="col-xl-8 col-12">
        <div class="form-row">
          <FormSelect
            class="col-10"
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

    <div class="row py-4 border-t">
      <div class="col-xl-3 col-12"></div>
      <div class="col-xl-8 col-12">
        <div class="form-row">
          <div class="form-group col-5">
            <button class="btn btn-primary btn-lg btn-block"
                    @click="createUser()">
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

<script>
import { getJWT } from '@/vue-apollo'
import { CREATE_USER } from '@/graphql/user'
import { ORGS_LIST } from '@/graphql/org'

export default {
  name: 'admin-create-user',
  data () {
    return {
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