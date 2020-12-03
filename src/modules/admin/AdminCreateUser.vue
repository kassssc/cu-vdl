<template>
<div class="page page-sm py-4 pl-0 pr-3">
  <div class="row mb-2">
    <div class="col-12">
      <h4>
        <i class="fas fa-user-plus mr-1"></i>
        สร้าง Account
      </h4>
    </div>
  </div>

  <div class="font-chatthai">
    <div class="row py-3 border-b">
      <div class="col-md-3 col-12">
        <h4>ประเภท Account</h4>
      </div>
      <div class="col-md-9 col-lg-8 col-12">
        <div class="form-row">
          <FormInlineSelect
            class="col-12"
            :btn-class-list="['purple', 'pink']"
            :options="['ผู้ส่งตัวอย่าง', 'แอดมิน']"
            @change="on_account_type_change()"
            v-model="account_type" />
        </div>
      </div>
    </div>

    <transition name="fade-no-delay">
      <div v-if="!creating_admin" class="row py-3 border-b">
        <div class="col-md-3 col-12">
          <h4>ข้อมูลเบื้องต้น</h4>
        </div>
        <div class="col-md-9 col-lg-8 col-12">
          <div class="form-row">
            <FormInlineSelect
              class="col-12"
              label="ประเภท Contact"
              :btn-class-list="['orange', 'red']"
              :options="['บุคคล', 'องค์กร']"
              v-model="form.contact_type" />
            <FormContactNameInput
              class="col-12 p-0"
              :contact-type="form.contact_type"
              v-model="form.name" />
            <FormAddressInput
              class="col-12 p-0"
              v-model="form.address" />
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-no-delay">
      <div v-if="!creating_admin" class="row py-3 border-b">
        <div class="col-md-3 col-12">
          <h4>ข้อมูลภาษาอังกฤษ</h4>
        </div>
        <div class="col-md-9 col-lg-8 col-12">
          <div class="form-row">
            <div class="form-group col-9">
              <checkbox
                label="เพิ่มข้อมูลภาษาอังกฤษ"
                label-class="label-lg"
                secondary-label="(ใช้เมื่อต้องการออกรายงานเป็นภาษาอังกฤษ)"
                @input="on_english_toggle($event)"
                v-model="include_english" />
            </div>
          </div>
          <div  v-if="include_english"
                class="form-row">
            <FormContactNameInput
              class="col-12 p-0"
              :contact-type="form.contact_type"
              english
              v-model="form.name_eng" />
            <FormAddressInput
              class="col-12 p-0"
              english
              v-model="form.address_eng" />
          </div>
        </div>
      </div>
    </transition>

    <div class="row py-3 border-b">
      <div class="col-md-3 col-12">
        <h4>{{ creating_admin? 'ข้อมูลแอดมิน' : 'ข้อมูลติดต่อ' }}</h4>
      </div>
      <div class="col-md-9 col-lg-8 col-12">
        <div class="form-row">
          <FormInput
            v-if="creating_admin"
            class="col-12"
            label="ชื่อ Account"
            type="text"
            required
            v-model="form.name" />
          <FormInput
            class="col"
            label="อีเมล (ใช้สำหรับ login)"
            type="text"
            required
            v-model="form.email" />
          <FormPhoneInput
            class="col"
            required
            v-model="form.phone" />
        </div>
      </div>
    </div>

    <div class="row py-4 font-cu">
      <div class="col-md-3 col-12"></div>
      <div class="col-md-9 col-lg-8 col-12">
        <div class="form-row">
          <div class="form-group col-12 mb-0">
            <button class="btn btn-primary btn-block loading btn-lg"
                    @click="submit_create_user()"
                    :disabled="submitting">
              <template v-if="submitting">
                <LoadingAnimation />
              </template>
              <template v-else>
                <i class="fas fa-user-plus btn-inner-icon"></i>
                สร้าง Account
              </template>
            </button>
            <ErrorBox v-if="form_error" :msg="form_error" />
          </div>
        </div>
      </div>
    </div>
    
  </div>

</div>
</template>

<script>
import { CREATE_USER } from '@/graphql/user'

export default {
  name: 'admin-create-user',
  computed: {
    creating_admin () {
      return this.account_type === 'แอดมิน'
    }
  },
  data () {
    return {
      form_error: null,
      submitting: false,
      account_type: 'ผู้ส่งตัวอย่าง',
      include_english: false,
      form: {
        contact_type: 'บุคคล',
        email: null,
        phone: null,
        name: null,
        address: null,
        name_eng: null,
        address_eng: null,
      },
      account_type_map: {
        'ผู้ส่งตัวอย่าง': 201,
        'แอดมิน': 101
      }
    }
  },
  methods: {
    on_english_toggle (english) {
      if (!english) {
        this.form.name_eng = ''
        this.form.nameAddress = ''
      }
    },
    on_account_type_change () {
      this.form.name = null
    },
    valid_form () {
      const form_filled = this.form.email && this.form.phone && this.form.name && this.form.address
      const english_info_valid = !this.include_english || (this.form.name_eng && this.form.address_eng)
      return form_filled && english_info_valid
    },
    async submit_create_user () {
      if (!this.valid_form()) {
        this.form_error = 'กรุณากรอกข้อมูลให้ครบ'
        return
      }
      this.submitting = true
      const account_type = this.account_type_map[this.account_type]
      try {
        let res = await this.$apollo.mutate({
          mutation: CREATE_USER,
          variables: {
            account_type,
            ...this.form
          }
        })
        const new_user_index = res.data.create_backuser.result.index
        this.$router.push({
          name: 'admin-users-list',
          params: { id: new_user_index }
        })
      } catch (err) {
        console.log(err)
        this.submitting = false
        this.form_error = 'ระบบขัดข้อง กรุณาลองใหม่ในภายหลัง'
      }
    }
  },
}
</script>