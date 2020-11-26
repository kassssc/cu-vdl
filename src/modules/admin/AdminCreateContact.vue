<template>
  <div  v-if="!$apollo.loading"
        class="page page-sm py-4 pl-0 pr-3">
    <div class="row mb-2">
      <div class="col-12">
        <h4>
          <i class="fas fa-id-card mr-1"></i>
          สร้าง Contact
        </h4>
      </div>
    </div>

    <div class="font-chatthai">
      <div class="row py-3 border-b">
        <div class="col-md-3 col-12">
          <h4>เพิ่มเป็น Contact ของ</h4>
        </div>
        <div class="col-md-9 col-lg-8 col-12">
          <div class="form-row">
            <FormSelect
              class="col-12"
              form-label="เลือก Account ผู้ส่งตัวอย่าง"
              :clearable="false"
              :reduce="o => o.index"
              :get-option-label="o => o.default_contact.name"
              :options="submitters"
              required
              v-model="form.user_index" />
          </div>
        </div>
      </div>

      <div class="row py-3 border-b">
        <div class="col-md-3 col-12">
          <h4>ประเภท Contact</h4>
        </div>
        <div class="col-md-9 col-lg-8 col-12">
          <div class="form-row">
            <FormInlineSelect
              class="col-12"
              :btn-class-list="['red', 'orange']"
              :options="['องค์กร', 'บุคคล']"
              v-model="form.contact_type" />
          </div>
        </div>
      </div>

      <div class="row py-3 border-b">
        <div class="col-md-3 col-12">
          <h4>ข้อมูล</h4>
        </div>
        <div class="col-md-9 col-lg-8 col-12">
          <div class="form-row">
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

      <div class="row py-3 border-b">
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

      <div class="row py-4 font-cu">
        <div class="col-md-3 col-12"></div>
        <div class="col-md-9 col-lg-8 col-12">
          <div class="form-row">
            <div class="form-group col-12 mb-0">
              <button class="btn btn-primary btn-lg btn-block loading"
                      @click="submit_create_contact()"
                      :disabled="submitting">
                <template v-if="submitting">
                  <LoadingAnimation />
                </template>
                <template v-else>
                  <i class="fas fa-plus btn-inner-icon" />
                  สร้าง Contact
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
import { CREATE_CONTACT } from '@/graphql/contact'
import { SUBMITTERS_LIST } from '@/graphql/user'
import { get_jwt } from '@/vue-apollo'

export default {
  name: 'admin-create-contact',
  data () {
    return {
      submitting: false,
      include_english: false,
      form_error: null,
      form: {
        contact_type: 'องค์กร',
        user_index: null,
        name: null,
        name_eng: null,
        address: null,
        address_eng: null,
      }
    }
  },
  methods: {
    on_english_toggle (english) {
      if (!english) {
        this.form.name_eng = null
        this.form.address_eng = null
      }
    },
    valid_form () {
      const form_filled = this.form.user_index && this.form.name && this.form.address
      const english_info_valid = !this.include_english || (this.form.name_eng && this.form.address_eng)
      return form_filled && english_info_valid
    },
    async submit_create_contact () {
      if (!this.valid_form()) {
        this.form_error = 'กรุณากรอกข้อมูลให้ครบ'
        return
      }
      this.submitting = true
      try {
        let res = await this.$apollo.mutate({
          mutation: CREATE_CONTACT,
          variables: {
            jwt: get_jwt(),
            ...this.form
          }
        })
        const new_contact_index = res.data.create_contact.result.index
        this.$router.push({
          name: 'admin-contacts-list',
          params: { id: new_contact_index }
        })
      } catch (err) {
        console.log(err)
        this.submitting = false
        this.form_error = 'ระบบขัดข้อง กรุณาลองใหม่ในภายหลัง'
      }
    }
  },
  apollo: {
    submitters: {
      query: SUBMITTERS_LIST,
      variables () {
        return {
          jwt: get_jwt()
        }
      },
      update: data => data.search_backuser.result
    }
  }
}
</script>