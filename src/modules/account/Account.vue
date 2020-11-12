<template>
<div class="page page-md d-flex flex-column">
  <div class="pb-5 content-height-min">
    <div class="row mb-2">
      <div class="col-12">
        <h3 v-if="!$apollo.loading">
          <i class="fas fa-user icon-lg mr-1"></i>
          ข้อมูล Account {{ user.name }}
        </h3>
      </div>
    </div>

    <div  v-if="!$apollo.loading"
          class="font-chatthai">
      <div class="border-b row w-100 py-4">
        <div class="col-3 col-md-2">
          <h4>ข้อมูลผู้ส่งตัวอย่าง</h4>
        </div>
        <div class="col-9 col-md-10 col-xl-8">
          <div class="form-row">
            <div class="form-group col-5">
              <label>ประเภท Account</label>
              <ColorTag
                class="d-block"
                size="lg"
                :label="account_type_label[user.account_type]"
                :color="account_type_colors[user.account_type]" />
            </div>
            <div class="w-100"></div>
            <div class="col-5">
              <div class="form-row">
                <FormInput
                  class="col-12"
                  label="ชื่อ"
                  :value="user.name"
                  disabled />
                <FormTextarea
                  v-if="!auth.is_admin"
                  class="col-12"
                  rows="3"
                  label="ที่อยู่"
                  :value="user.default_contact.address"
                  disabled />
              </div>
            </div>
            <template v-if="!auth.is_admin">
              <div  v-if="has_english_info"
                    class="col-5">
                <div class="form-row">
                  <FormInput
                    class="col-12"
                    label="ชื่อ (ภาษาอังกฤษ)"
                    :value="user.default_contact.name_eng"
                    disabled />
                  <FormTextarea
                    class="col-12"
                    rows="3"
                    label="ที่อยู่ (ภาษาอังกฤษ)"
                    :value="user.default_contact.address_eng"
                    disabled />
                </div>
              </div>
              <div v-else class="col">
                <div class="form-row">
                  <template v-if="!updating_english_info">
                    <div class="form-group col-6">
                      <label></label>
                      <button class="btn btn-secondary btn-block font-cu"
                              @click="updating_english_info = true">
                        <i class="fas fa-globe-americas btn-inner-icon"></i> เพิ่มข้อมูลภาษาอังกฤษ
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <FormContactNameInput
                      class="col-12 p-0"
                      :contact-type="user.default_contact.contact_type"
                      english
                      v-model="english_info.name_eng" />
                    <FormAddressInput
                      class="form-group col-12 p-0"
                      english
                      v-model="english_info.address_eng" />
                    <div class="form-group col-9">
                      <button class="btn btn-primary btn-block font-cu"
                              @click="submit_update_default_contact_english_info()">
                        <i class="fas fa-check btn-inner-icon"></i> บันทึก
                      </button>
                    </div>
                    <div class="form-group col">
                      <button class="btn btn-secondary btn-block font-cu"
                                @click="updating_english_info = false">
                        <i class="fas fa-times btn-inner-icon mr-0" />
                      </button>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    
      <div class="border-b row w-100 py-4">
        <div class="col-3 col-md-2">
          <h4>ข้อมูลการติดต่อ</h4>
        </div>
        <div class="col-9 col-md-10 col-xl-8">
          <div class="form-row">
            <FormInput
              class="col-5"
              label="อีเมล"
              disabled
              :value="user.email" />
          </div>
          <div class="form-row">
            <template v-if="!editing_phone">
              <div class="col-5">
                <div class="form-row">
                  <FormInput
                    class="col-12"
                    disabled
                    label="หมายเลขโทรศัพท์"
                    :value="user.phone" />
                </div>
              </div>
              <div class="col">
                <div class="form-row">
                  <div class="form-group col-6">
                    <label></label>
                    <button class="btn btn-block btn-secondary font-cu"
                            @click="change_phone_number()">
                      <i class="fas fa-edit btn-inner-icon" />
                      แก้ไข
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="col-5">
                <div class="form-row">
                  <FormPhoneInput
                    ref="Phone"
                    class="form-group col-12"
                    v-model="phone_input" />
                </div>
              </div>
              <div class="col">
                <div class="form-row">
                  <div class="form-group col-6">
                    <label></label>
                    <button class="btn btn-primary btn-block font-cu"
                            @click="submit_change_phone_number()">
                      <i class="fas fa-check btn-inner-icon" />
                      บันทึก
                    </button>
                  </div>
                  <div class="form-group col-2 pl-0">
                    <label></label>
                    <button class="btn btn-secondary btn-block font-cu"
                            @click="cancel_change_phone_number()">
                      <i class="fas fa-times btn-inner-icon mr-0" />
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <div class="w-100"></div>
            <div  v-if="phone_error && editing_phone"
                  class="form-group col-5">
              <ErrorBox msg="หมายเลขโทรศัพท์ ไม่ถูกรูปแบบ" />
            </div>
          </div>
        </div>
      </div>

      <div class="border-b row w-100 py-4 font-cu">
        <div class="col-3 col-md-2"></div>
        <div class="col-9 col-md-10 col-xl-8">
          <div class="form-row">
            <div class="form-group col-5">
              <button class="btn btn-block btn-secondary"
                      @click="show_change_password_modal()">
                <i class="fas fa-key btn-inner-icon" />
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
            <div class="w-100"></div>
            <div  v-if="!auth.is_admin"
                  class="form-group col-5 mb-0">
              <button class="btn btn-block btn-danger"
                      @click="show_deactivate_account_modal()">
                <i class="fas fa-ban btn-inner-icon" />
                ระงับการใช้งาน Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div  v-if="!auth.is_admin"
            class="row w-100 py-5">
        <h3 class="font-cu">
          <i class="fas fa-address-book icon-lg mr-1"></i>
          รายชื่อ Contact
        </h3>
        <div class="font-chatthai py-4 col-12">
          <table>
            <thead>
              <tr>
                <th class="nowrap"> 
                  ประเภท
                  <div class="shadow-th" />
                </th>
                <th class="nowrap">
                  ชื่อ
                  <div class="shadow-th" />
                </th>
                <th class="nowrap">
                  ที่อยู่
                  <div class="shadow-th" />
                </th>
                <th class="nowrap">
                  ชื่อ (ภาษาอังกฤษ)
                  <div class="shadow-th" />
                </th>
                <th class="nowrap">
                  ที่อยู่ (ภาษาอังกฤษ)
                  <div class="shadow-th" />
                </th>
              </tr>
            </thead>
            <tbody class="border-t">
              <tr v-for="contact of user.contact_list"
                  :key="contact.index">
                <td class="py-1 nowrap">
                  <ColorTag
                    :label="contact.contact_type"
                    :color="contact_type_colors[contact.contact_type]" />
                </td>
                <td class="py-1 nowrap">
                  <h5>{{ contact.name }}</h5>
                </td>
                <td class="py-1 pre-line squeeze-line small-font">
                  {{ contact.address }}
                </td>
                <td class="py-1 nowrap">
                  <template v-if="contact_has_english_info(contact)">
                    {{ contact.name_eng }}
                  </template>
                  <button v-else
                          class="btn btn-secondary btn-sm font-cu"
                          @click="show_add_english_info_modal(contact)">
                    <i class="fas fa-globe-americas btn-inner-icon"></i>เพิ่มข้อมูลภาษาอังกฤษ
                  </button>
                </td>
                <td class="py-1 pre-line squeeze-line small-font">
                  {{ contact.address_eng }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Modal  modal-id="change-password-modal"
          x-close>
    <template #modal-header>
      <h3 class="text-primary">
        <i class="fas fa-key icon-lg mr-2" />เปลี่ยนรหัสผ่าน
      </h3>
    </template>
    <template #modal-body>
      <div class="form-row d-flex justify-content-center">
        <div class="col-12 mb-3">
          <h5>ท่านจะต้อง login ใหม่หากรหัสผ่านถูกเปลี่ยน</h5>
        </div>
        <FormInput
          class="col-12"
          label="รหัสผ่านเก่า"
          type="password"
          v-model="change_password_modal.old_pass" />
        <FormInput
          class="col-12"
          label="รหัสผ่านใหม่"
          type="password"
          v-model="change_password_modal.new_pass" />
        <FormInput
          class="col-12"
          label="ยืนยันรหัสผ่านใหม่"
          type="password"
          v-model="change_password_modal.confirm_new_pass" />
      </div>
      <div class="form-row mt-4">
        <div class="form-group col-4 mb-0">
          <button type="button"
                  class="btn btn-secondary btn-block"
                  data-dismiss="modal">
            ยกเลิก
          </button>
        </div>
        <div class="form-group col mb-0">
          <button type="button"
                  class="btn btn-primary btn-block"
                @click="submit_change_password()">
          เปลี่ยนรหัสผ่าน
        </button>
        </div>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="deactivate-account-modal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะระงับการใช้งาน Account
      </h3>
    </template>
    <template #modal-body>
      <h4>หากท่านต้องการกลับมาใช้ Account นี้ ท่านจะต้องติดต่อ หน่วยชันสูตรโรคสัตว์กลาง โดยตรงเพื่อนำ Account กลับมาใช้งาน</h4>
      <div class="form-row mt-4">
        <div class="form-group col-4 mb-0">
          <button type="button"
                  class="btn btn-secondary btn-block"
                  data-dismiss="modal">
            กลับไป
          </button>
        </div>
        <div class="form-group col mb-0">
          <button type="button"
                  class="btn btn-danger btn-block"
                @click="submit_deactivate_account()">
            <i class="fas fa-ban btn-inner-icon" />ยืนยันว่าจะระงับการใช้งาน Account
          </button>
        </div>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="add-english-info-modal"
          data-backdrop="static"
          v-if="contact_to_add_english_info"
          x-close>
    <template #modal-header>
      <h3>เพิ่มข้อมูลภาษาอังกฤษ</h3>
    </template>
    <template #modal-body>
      <div class="form-row">
        <FormInput
          class="col-12"
          disabled
          :value="contact_to_add_english_info.name" />
        <FormTextarea
          class="col-12 mb-4"
          rows="3"
          disabled
          :value="contact_to_add_english_info.address" />
        <FormContactNameInput
          class="col-12 p-0"
          :contact-type="contact_to_add_english_info.contact_type"
          english
          v-model="add_english_info_modal.name_eng" />
        <FormAddressInput
          class="col-12 p-0"
          english
          v-model="add_english_info_modal.address_eng" />
      </div>
      <div class="form-row mt-4">
        <div class="form-group col-6 mb-0">
          <button type="button"
                  class="btn btn-secondary btn-block"
                  data-dismiss="modal">
            ยกเลิก
          </button>
        </div>
        <div class="form-group col-6 mb-0">
          <button type="button" class="btn btn-primary btn-block"
                  @click="submit_update_contact_english_info()">
            <i class="fas fa-check btn-inner-icon"></i>บันทึกข้อมูล
          </button>
        </div>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>
import $ from 'jquery'
import { get_jwt, on_logout } from '@/vue-apollo'
import { AUTH_DATA } from '@/graphql/local'
import {
  USER_DETAIL,
  USER_UPDATE_PHONE,
  USER_CHANGE_PASSWORD,
  USER_DEACTIVATE_ACCOUNT
} from '@/graphql/user'
import { UPDATE_CONTACT_ENG_INFO } from '@/graphql/contact'

export default {
  name: 'account',
  computed: {
    has_english_info () {
      return this.user.default_contact.name_eng && this.user.default_contact.address_eng
    }
  },
  data () {
    return {
      phone_input: '',
      phone_error: false,
      updating_english_info: false,
      english_info: {
        name_eng: null,
        address_eng: null,
      },
      change_password_modal: {
        old_pass: null,
        new_pass: null,
        confirm_new_pass: null
      },
      editing_phone: false,
      contact_to_add_english_info: null,
      add_english_info_modal: {
        name_eng: null,
        address_eng: null,
      },
      account_type_label: {
        101: 'แอดมิน',
        201: 'ผู้ส่งตัวอย่าง'
      },
      account_type_colors: {
        101: 'pink',
        201: 'purple'
      },
      contact_type_colors: {
        'บุคคล': 'orange',
        'องค์กร': 'red'
      }
    }
  },
  methods: {
    contact_has_english_info (contact) {
      return !!contact.name_eng && !!contact.address_eng
    },
    change_phone_number () {
      this.editing_phone = true
      this.phone_input = this.user.phone
      setTimeout( () => {
        this.$nextTick( () => this.$refs.Phone.$refs.PhoneInput.$refs.Inputbox.focus() )
      }, 5)
    },
    cancel_change_phone_number () {
      this.editing_phone = false
      this.phone_error = false
      //document.getSelection().removeAllRanges()
    },
    async submit_update_contact_english_info () {
      try {
        let res = await this.$apollo.mutate({
          mutation: UPDATE_CONTACT_ENG_INFO,
          variables: {
            jwt: get_jwt(),
            index: this.contact_to_add_english_info.index,
            ...this.add_english_info_modal
          }
        })
        console.log(res)
        await this.$apollo.queries.user.refetch()
        this.$nextTick( () => $('#add-english-info-modal').modal('hide') )
      } catch (err) {
        console.log(err)
      }
    },
    async submit_update_default_contact_english_info () {
      try {
        let res = await this.$apollo.mutate({
          mutation: UPDATE_CONTACT_ENG_INFO,
          variables: {
            jwt: get_jwt(),
            index: this.user.default_contact.index,
            ...this.english_info
          }
        })
        this.english_info.name_eng = null
        this.english_info.address_eng = null
        await this.$apollo.queries.user.refetch()
        this.$nextTick( () => this.updating_english_info = false )
      } catch (err) {
        console.log(err)
      }
    },
    async submit_change_phone_number () {
      if (this.phone_error) return
      try {
        let res = await this.$apollo.mutate({
          mutation: USER_UPDATE_PHONE,
          variables: {
            jwt: get_jwt(),
            phone: this.phone_input
          }
        })
        await this.$apollo.queries.user.refetch()
        this.$nextTick( () => this.cancel_change_phone_number() )
      } catch (err) {
        console.log(err)
      }
    },
    async submit_change_password () {
      try {
        let res = await this.$apollo.mutate({
          mutation: USER_CHANGE_PASSWORD,
          variables: {
            jwt: get_jwt(),
            old_pass: this.change_password_modal.old_pass,
            new_pass: this.change_password_modal.new_pass
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async submit_deactivate_account () {
      try {
        let res = await this.$apollo.mutate({
          mutation: USER_DEACTIVATE_ACCOUNT,
          variables: {
            jwt: get_jwt(),
            index: this.user.index,
            account_active: false
          }
        })
        $('#deactivate-account-modal').modal('hide')
        await on_logout(this.$apollo.provider.defaultClient)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
      }
    },
    show_change_password_modal () {
      $('#change-password-modal').modal('show')
    },
    show_deactivate_account_modal () {
      $('#deactivate-account-modal').modal('show')
    },
    show_add_english_info_modal (contact) {
      this.contact_to_add_english_info = contact
      $('#add-english-info-modal').on('hidden.bs.modal', () => {
        this.contact_to_add_english_info = null
        this.add_english_info_modal.name_eng = null
        this.add_english_info_modal.address_eng = null
        $('#add-english-info-modal').modal('dispose')
      })
      this.$nextTick( () => $('#add-english-info-modal').modal('show') )
    }
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth
    },
    user: {
      query: USER_DETAIL,
      variables () {
        return {
          jwt: get_jwt()
        }
      },
      update: data => data.get_backuser.result,
    }
  }
}
</script>