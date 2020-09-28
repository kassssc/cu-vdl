<template>
<div class="page page-md d-flex flex-column">
  <div class="p-2 content-height-min">
    <div class="row">
      <div class="col-12">
        <h3 class="mb-3">
          <i class="fas fa-address-card icon-lg mr-1"></i>
          ข้อมูล Account
        </h3>
      </div>
    </div>

    <div  v-if="!$apollo.loading"
          class="font-chatthai">
      <div class="border-b row w-100 py-3 mb-3">
        <div class="col-xl-2 col-12">
          <h4>ข้อมูลผู้ใช้</h4>
        </div>
        <div class="col-xl-10 col-12">
          <div class="form-row">
            <div class="form-group col-5">
              <label>ประเภท Account</label>
              <ColorTag
                class="d-block"
                size="lg"
                :label="userTypeLabel[user.account_type]"
                :color="userTypeCSS[user.account_type]" />
            </div>
            <div class="w-100"></div>
            <FormInput
              class="col-5"
              label="ชื่อ-นามสกุล"
              :value="`${user.title}${user.first_name} ${user.last_name}`"
              disabled />
            <div class="w-100"></div>
            <FileView
              v-if="!isAdmin"
              class="col-5"
              label="สำเนาบัตรประชาชน"
              file-name="somkuan_id.pdf"
              icon-class="fa-address-card" />
          </div>
        </div>
      </div>
    
      <div class="border-b row w-100 py-3 mb-3">
        <div class="col-xl-2 col-12">
          <h4>ข้อมูลการติดต่อ</h4>
        </div>
        <div class="col-xl-10 col-12">
          <div class="form-row">
            <FormInput
              class="col-5"
              label="อีเมล"
              disabled
              :value="user.email" />
            <div class="w-100"></div>
            <FormInput
              v-if="editingPhone"
              ref="phoneNumber"
              class="col-5"
              label="หมายเลขโทรศัพท์"
              :invalid="phoneError"
              @focus="onPhoneInputFocus($event)"
              @blur="formatPhone()"
              v-model="phoneInput" />
            <FormInput
              v-else
              class="col-5"
              disabled
              label="หมายเลขโทรศัพท์"
              :value="user.phone" />
            <div  v-if="!editingPhone"
                  class="form-group col-2 d-flex align-items-end">
              <button v-if="!editingPhone"
                      class="btn btn-block btn-primary"
                      @click="changePhoneNumber()">
                <i class="fas fa-wrench btn-inner-icon" />
                แก้ไข
              </button>
            </div>
            <template v-else>
              <div class="form-group col-2 d-flex align-items-end">
                <button class="btn btn-success btn-block"
                        @click="submitChangePhoneNumber()">
                  <i class="fas fa-check btn-inner-icon" />
                  บันทึก
                </button>
              </div>
              <div class="form-group col-1 d-flex align-items-end pl-0">
                <button class="btn btn-secondary"
                        @click="cancelChangePhoneNumber()">
                  <i class="fas fa-times btn-inner-icon mr-0" />
                </button>
              </div>
            </template>
            <div  v-if="phoneError && editingPhone"
                  class="form-group col-5">
              <div class="error-box">
                <h5 class="text-danger"><i class="fas fa-exclamation mr-2 icon-sm" />หมายเลขโทรศัพท์ ไม่ถูกรูปแบบ</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-b row w-100 py-3 mb-3">
        <div class="col-xl-2 col-12"></div>
        <div class="col-xl-10 col-12">
          <div class="form-row">
            <div class="form-group col-5">
              <button class="btn btn-block btn-primary"
                      @click="showChangePasswordModal()">
                <i class="fas fa-key btn-inner-icon" />
                เปลี่ยนรหัสผ่าน
              </button>
            </div>
            <div class="w-100 mb-2"></div>
            <div  v-if="!isAdmin"
                  class="form-group col-5">
              <button class="btn btn-block btn-danger"
                      @click="showDeactivateAccountModal()">
                <i class="fas fa-ban btn-inner-icon" />
                ระงับการใช้งาน Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div  v-if="!isAdmin"
            class="row w-100 py-3 mb-3">
        <div class="col-12 mb-3">
          <h3 class="font-cu">
            <i class="fas fa-sitemap icon-lg mr-1"></i>
            องค์กรที่เป็นตัวแทน
          </h3>
        </div>
        <div class="col-12 px-4">
          <table>
            <thead>
              <tr>
                <th> 
                  <h4>ชื่อองค์กร</h4>
                  <div class="shadow-th"></div>
                </th>
                <th> 
                  <h4>ประเภท</h4>
                  <div class="shadow-th"></div>
                </th>
                <th> 
                  <h4>ที่อยู่</h4>
                  <div class="shadow-th"></div>
                </th>
                <th>
                  <h5 class="text-right text-medium">ถอนตัวจากการเป็นตัวแทน</h5>
                  <div class="shadow-th"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="org of user.submitter_of"
                  :key="org.index">
                <td class="vertical-align-top">
                  <h4>{{ org.name }}</h4>
                </td>
                <td class="vertical-align-top">
                  <ColorTag
                    :label="orgTypeLabel[org.org_type]"
                    :color="orgTypeCSS[org.org_type]" />
                </td>
                <td class="pre-line squeeze-line small-font">
                  {{ org.address }}
                </td>
                <td class="text-right">
                  <button class="btn btn-sm btn-icon btn-icon-danger"
                          @click="showRemoveSubmissionPermissionModal(org)">
                    <i class="fa fa-user-slash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Modal  modal-id="changePasswordModal"
          x-close>
    <template #modal-header>
      <h3 class="text-primary">
        <i class="fas fa-key icon-lg mr-2" />เปลี่ยนรหัสผ่าน
      </h3>
    </template>
    <template #modal-body>
      <div class="form-row d-flex justify-content-center">
        <div class="col-9 mb-3">
          <h5>ท่านจะต้อง login ใหม่หากรหัสผ่านถูกเปลี่ยน</h5>
        </div>
        <FormInput
          class="col-9"
          label="รหัสผ่านเก่า"
          type="password"
          v-model="changePasswordModal.oldPass" />
        <div class="w-100"></div>
        <FormInput
          class="col-9"
          label="รหัสผ่านใหม่"
          type="password"
          v-model="changePasswordModal.newPass" />
        <div class="w-100"></div>
        <FormInput
          class="col-9"
          label="ยืนยันรหัสผ่านใหม่"
          type="password"
          v-model="changePasswordModal.confirmNewPass" />
      </div>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-100" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-primary ml-2 w-100"
                @click="submitChangePassword()">
          เปลี่ยนรหัสผ่าน
        </button>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="deactivateAccountModal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะระงับการใช้งาน Account
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">หากท่านต้องการกลับมาใช้ Account นี้ ท่านจะต้องติดต่อ หน่วยชันสูตรโรคสัตว์กลาง โดยตรงเพื่อนำ Account กลับมา</h4>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-danger ml-2 w-100"
                @click="submitDeactivateAccount()">
          ยืนยันว่าจะระงับการใช้งาน Account
        </button>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="removeSubmisssionPermissionModal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะถอนตัวจากการเป็นตัวแทนองค์กร
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">ท่านจะสูญเสียสิทธิในการส่งตัวอย่างในนามของ องค์กร:</h4>
      <h3 v-if="orgToRemove" class="my-2 text-center text-danger">{{ orgToRemove.name }}</h3>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-danger ml-2 w-100"
                @click="submitRemoveSubmissionPermission()">
          ยืนยันว่าจะถอนตัวจากการเป็นตัวแทน
        </button>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>
import $ from 'jquery'
import { getJWT, onLogout } from '@/vue-apollo'
import { USER_INDEX } from '@/graphql/local'
import {
  USER_DETAIL,
  USER_CHANGE_PHONE,
  USER_CHANGE_PASSWORD,
  USER_REMOVE_SELF_SUBMISSION_PERMISSION,
  USER_DEACTIVATE_ACCOUNT
} from '@/graphql/user'

export default {
  name: 'account-info-submitter',
  computed: {
    isAdmin () {
      return this.user.account_type === 101
    }
  },
  data () {
    return {
      phoneInput: '',
      phoneError: false,
      orgToRemove: null,
      changePasswordModal: {
        oldPass: '',
        newPass: '',
        confirmNewPass: ''
      },
      editingPhone: false,
      userTypeLabel: {
        101: 'แอดมิน',
        201: 'ผู้ส่งตัวอย่าง'
      },
      userTypeCSS: {
        101: 'pink',
        201: 'purple'
      },
      orgTypeCSS: {
        1: 'orange',
        2: 'red'
      },
      orgTypeLabel: {
        1: 'ฟาร์ม',
        2: 'บริษัทสัตวแพทย์'
      }
    }
  },
  methods: {
    changePhoneNumber () {
      this.editingPhone = true
      this.phoneInput = this.user.phone
      this.$nextTick( () => this.$refs.phoneNumber.$refs.inputbox.focus())
    },
    cancelChangePhoneNumber () {
      document.getSelection().removeAllRanges()
      this.editingPhone = false
      this.phoneError = false
    },
    onPhoneInputFocus (ev) {
      ev.target.select()
      this.phoneInput = this.phoneInput.replace(/-/g, '')
    },
    formatPhone () {
      let cleaned = ('' + this.phoneInput).replace(/\D/g, '')
      if (cleaned.length < 9 || cleaned.length > 10) {
        this.phoneError = true
      } else {
        this.phoneError = false
        let match
        if (cleaned.length === 10) {
          match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        } else if (cleaned.length === 9) {
          match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/)
        }
        this.phoneInput = match[1] + '-' + match[2] + '-' + match[3]
      }
    },
    async submitChangePhoneNumber () {
      this.formatPhone()
      if (this.phoneError) return
      try {
        let res = await this.$apollo.mutate({
          mutation: USER_CHANGE_PHONE,
          variables: {
            jwt: getJWT(),
            index: this.user.index,
            phone: this.phoneInput
          }
        })
        await this.$apollo.queries.user.refetch()
        this.$nextTick( () => this.cancelChangePhoneNumber() )
      } catch (err) {
        console.log(err)
      }
    },
    async submitChangePassword () {
      try {
        let res = await this.$apollo.mutate({
          mutation: USER_CHANGE_PASSWORD,
          variables: {
            jwt: getJWT(),
            oldPass: this.changePasswordModal.oldPass,
            newPass: this.changePasswordModal.newPass
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async submitDeactivateAccount () {
      try {
        let res = await this.$apollo.mutate({
          mutation: USER_DEACTIVATE_ACCOUNT,
          variables: {
            jwt: getJWT(),
            index: this.user.index,
            accountActive: false
          }
        })
        $('#deactivateAccountModal').modal('hide')
        await onLogout(this.$apollo.provider.defaultClient)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
      }
    },
    async submitRemoveSubmissionPermission () {
      try {
        let res = await this.$apollo.mutate({
          mutation: USER_REMOVE_SELF_SUBMISSION_PERMISSION,
          variables: {
            jwt: getJWT(),
            index: [this.orgToRemove.index]
          }
        })
        this.$apollo.queries.user.refetch()
        $('#removeSubmisssionPermissionModal').modal('hide')
        this.orgToRemove = null
      } catch (err) {
        console.log(err)
      }
    },
    showChangePasswordModal () {
      $('#changePasswordModal').modal('show')
    },
    showDeactivateAccountModal () {
      $('#deactivateAccountModal').modal('show')
    },
    showRemoveSubmissionPermissionModal (org) {
      this.orgToRemove = org
      $('#removeSubmisssionPermissionModal').modal('show')
    }
  },
  apollo: {
    userIndex: {
      query: USER_INDEX,
      update: data => data.auth.userIndex
    },
    user: {
      query: USER_DETAIL,
      variables () {
        return {
          jwt: getJWT(),
          index: this.userIndex
        }
      },
      update: data => data.get_backuser.result[0]
    }
  }
}
</script>