<template>
<div v-if="!$apollo.loading">
  <template>
    <div class="d-block d-md-flex align-items-center mb-3">
      <h3 class="mr-3 d-block d-md-inline-block mb-md-0 mb-3">
        <i class="fas fa-user icon-lg"></i>
        {{ user.default_contact.name }}
      </h3>
      <ColorTag
        class="d-block d-lg-inline-block"
        size="lg"
        :label="user_type_label[user.account_type]"
        :color="user_type_CSS[user.account_type]" />
    </div>
  
    <div class="form-row font-chatthai pb-4 border-b">
      <FormInput
        class="col-12 col-md-6 col-lg-5"
        label="อีเมล"
        disabled
        :value="user.email" />
      <div v-if="user.account_type === 101" class="w-100"></div>
      <FormInput
        class="col-12 col-md-6 col-lg-5"
        label="หมายเลขโทรศัพท์"
        disabled
        :value="user.phone" />
      <div class="w-100"></div>    
    </div>

    <template v-if="user.account_type !== 101">
      <div class="d-block d-md-flex align-items-center mt-4 mb-3">
        <h4 class="mr-3 d-block d-md-inline-block mb-md-0 mb-3">
          <i class="fas fa-id-card mr-3"></i>Contact ประจำ Account
        </h4>
        <ColorTag
          class="d-block d-lg-inline-block"
          size="lg"
          :label="user.default_contact.contact_type"
          :color="contact_type_colors[user.default_contact.contact_type]" />
      </div>
      <div class="form-row font-chatthai pb-4 border-b">
        <div class="col-12 col-md-6 col-lg-5">
          <div class="form-row mb-4 mb-md-0">
            <FormInput
              class="col-12"
              label="ชื่อ"
              disabled
              :value="user.default_contact.name" />
            <FormTextarea
              class="col-12"
              rows="3"
              label="ที่อยู่"
              disabled
              :value="user.default_contact.address" />
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-5">
          <div class="form-row">
            <FormInput
              class="col-12"
              label="ชื่อ (ภาษาอังกฤษ)"
              disabled
              :value="user.default_contact.name_eng" />
            <FormTextarea
              class="col-12"
              rows="3"
              label="ที่อยู่ (ภาษาอังกฤษ)"
              disabled
              :value="user.default_contact.address_eng" />            
          </div>
        </div>
        <div class="form-group col-12 col-md-6 col-lg-5 mt-3">
          <router-link  :to="{
                          name: 'admin-contacts-list',
                          params: { id: user.default_contact.index }
                        }"
                        tag="button"
                        class="btn btn-secondary btn-block font-cu">
            <i class="fas fa-arrow-right btn-inner-icon"></i> ไปดูข้อมูล Contact
          </router-link>
        </div>
      </div>
    </template>
  
    <template v-if="user.account_type !== 101">
      <h4 class="mt-4 mb-3">
        <i class="fas fa-address-book mr-3"></i>
        รายชื่อ Contact ของ {{ user.default_contact.name }}
      </h4>
      <div class="font-chatthai">
        <table class="small-font">
          <thead>
            <tr>
              <th>ประเภท</th>
              <th>ชื่อ</th>
              <th>ที่อยู่</th>
              <th class="d-none d-md-table-cell">ชื่อ (ภาษาอังกฤษ)</th>
              <th class="d-none d-md-table-cell">ที่อยู่ (ภาษาอังกฤษ)</th>
            </tr>
          </thead>
          <tbody class="border-t">
            <router-link  v-for="contact of user.contact_list"
                          :key="contact.index"
                          :to="{ 
                              name: 'admin-contacts-list',
                              params: { id: contact.index }
                          }"
                          tag="tr"
                          class="nowrap clickable">
              <td class="py-1">
                <ColorTag
                  :label="contact.contact_type"
                  :color="contact_type_colors[contact.contact_type]" />
              </td>
              <td class="py-1">
                {{ contact.name }}
              </td>
              <td class="py-1 pre-line squeeze-line small-font">
                {{ contact.address }}
              </td>
              <td class="py-1 d-none d-md-table-cell">
                {{ contact.name_eng }}
              </td>
              <td class="py-1 pre-line squeeze-line small-font d-none d-md-table-cell">
                {{ contact.address_eng }}
              </td>
            </router-link>
          </tbody>
        </table>
      </div>
      <div v-if="user.contact_list.length < 1" class="p-4 border-b text-center">
        <h5 class="text-muted">
          <i class="far fa-frown mr-2"></i>ไม่มี Contact ที่จะแสดง
        </h5>
      </div>
    
      <div class="form-row border-b py-4 mt-4">
        <template v-if="user.account_active">
          <div class="w-100"></div>
          <div class="form-group col-12 col-md-6 col-lg-5 mb-0">
            <button class="btn btn-danger btn-block"
                    @click="show_deactivate_account_modal()">
              <i class="fas fa-ban btn-inner-icon"></i>
              ระงับการใช้งาน Account
            </button>
          </div>
        </template>
        <div v-else class="form-group col-12 col-md-6 col-lg-5 mb-0">
          <button class="btn btn-success btn-block"
                  @click="show_reactivate_account_modal()">
            <i class="fas fa-check btn-inner-icon"></i>
            นำ Account กลับมาใช้งาน
          </button>
        </div>
      </div>
    </template>
  </template>

  <Modal  modal-id="deactivate-account-modal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะระงับการใช้งาน Account
      </h3>
    </template>
    <template #modal-body>
      <h4 class="mb-2">
        <span class="text-danger">{{ user.default_contact.name }}</span>
        จะไม่สามารถ login เข้ามาในระบบ แต่ข้อมูลทั้งหมดจะยังคงอยู่
      </h4>
      <h4>ท่านสามารถนำ Account กลับมาใช้งานในภายหลังได้</h4>
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
                  class="btn btn-danger btn-block"
                  @click="submit_deactivate_account()">
            ยืนยันว่าจะระงับการใช้งาน Account
          </button>
        </div>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="reactivate-account-modal"
          x-close>
    <template #modal-header>
      <h3 class="text-success">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะนำ Account กลับมาใช้งาน
      </h3>
    </template>
    <template #modal-body>
      <h4>
        <span class="text-success">{{ user.default_contact.name }}</span>
        จะสามารถ login เข้ามาในระบบ และทำการส่งตัวอย่างได้
      </h4>
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
                  class="btn btn-success btn-block"
                  @click="submit_reactivate_account()">
            ยืนยันว่าจะนำ Account กลับมาใช้งาน
          </button>
        </div>
      </div>
    </template>
  </Modal>

</div>
</template>

<script>
import $ from 'jquery'
import { includes } from 'lodash'
import {
  USER_DETAIL,
  USER_UPDATE_SUBMISSION_PERMISSION,
  USER_DEACTIVATE_ACCOUNT
} from '@/graphql/user'

export default {
  name: 'admin-user-info',
  data () {
    return {
      user_type_CSS: {
        201: 'purple',
        101: 'pink'
      },
      user_type_label: {
        201: 'ผู้ส่งตัวอย่าง',
        101: 'แอดมิน'
      },
      contact_type_colors: {
        'บุคคล': 'orange',
        'องค์กร': 'red'
      }
    }
  },
  methods: {
    show_deactivate_account_modal () {
      $('#deactivate-account-modal').modal('show')
    },
    async submit_deactivate_account () {
      try {
        let res = this.$apollo.mutate({
          mutation: USER_DEACTIVATE_ACCOUNT,
          variables: {
            user_index: this.user.index,
            account_active: false
          }
        })
        await this.$apollo.queries.user.refetch()
        $('#deactivate-account-modal').modal('hide')
        this.$emit('deactivate-account')
      } catch (err) {
        console.log(err)
      }
    },
    show_reactivate_account_modal () {
      $('#reactivate-account-modal').modal('show')
    },
    async submit_reactivate_account () {
      try {
        let res = this.$apollo.mutate({
          mutation: USER_DEACTIVATE_ACCOUNT,
          variables: {
            user_index: this.user.index,
            account_active: true
          }
        })
        await this.$apollo.queries.user.refetch()
        $('#reactivate-account-modal').modal('hide')
        this.$emit('reactivate-account')
      } catch (err) {
        console.log(err)
      }
    }
  },
  apollo: {
    user: {
      query: USER_DETAIL,
      variables () {
        return {
          index: parseInt(this.$route.params.id)
        }
      },
      update: data => data.get_backuser.result
    }
  }
}
</script>