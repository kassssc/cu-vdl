<template>
<div v-if="!$apollo.loading">
  <template>
    <div class="d-block d-lg-flex align-items-center mb-3">
      <h3 class="mr-3 d-block d-lg-inline-block mb-lg-0 mb-3">
        <i class="fas fa-user icon-lg"></i>
        {{ userFullName }}
      </h3>
      <ColorTag
        class="d-block d-lg-inline-block"
        size="lg"
        :label="userTypeLabel[user.account_type]"
        :color="userTypeCSS[user.account_type]" />
    </div>
  
    <div class="form-row font-chatthai pb-2 border-b">
      <FormInput
        class="col-12 col-lg-6"
        label="อีเมล"
        disabled
        :value="user.email" />
      <FormInput
        class="col-12 col-lg-6"
        label="หมายเลขโทรศัพท์"
        disabled
        :value="user.phone" />
      <FileView
        class="col-12 col-lg-6"
        label="สำเนาบัตรประชาชน"
        file-name="national_id.pdf"
        icon-class="fa-address-card" />
    </div>
  
    <template v-if="user.account_type !== 101">
      <div  v-if="user.submitter_of.length > 0"
            class="font-chatthai scroll-container my-2">
        <table>
          <thead>
            <tr>
              <th class="w-100 nowrap"> 
                องค์กรที่เป็นตัวแทน
                <div class="shadow-th" />
              </th>
              <th class="nowrap">
                ประเภท
                <div class="shadow-th" />
              </th>
              <th class="text-right nowrap">
                <div class="shadow-th" />
              </th>
            </tr>
          </thead>
          <tbody class="border-t">
            <tr v-for="org of user.submitter_of"
                :key="org.index">
              <router-link  :to="{ 
                              name: 'admin-orgs-list',
                              params: { id: org.index }
                            }"
                            tag="td"
                            class="nowrap clickable py-1">
                {{ org.name }}
              </router-link>
              <td class="py-1 nowrap">
                <ColorTag
                    :label="orgTypeLabel[org.org_type]"
                    :color="orgTypeCSS[org.org_type]" />
              </td>
              <td class="text-right py-1">
                <button class="btn btn-sm btn-icon btn-icon-danger"
                        @click="showRemoveSubmitterModal(org)">
                  <i class="fa fa-user-slash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="mt-3">
        <h4 class="font-chatthai text-medium">
          ยังไม่มีองค์กรที่เป็นตัวแทน<i class="far fa-frown ml-2 vertical-align-middle"></i>
        </h4>
      </div>
    
      <div class="form-row font-chatthai pt-4">
        <template v-if="user.account_active">
          <div class="form-group col-12 col-lg-6">
            <button class="btn btn-secondary btn-block"
                    @click="showUpdateSubmissionPermissionModal()">
              <i class="fas fa-user-plus btn-inner-icon"></i>
              ให้สิทธิในการเป็นตัวแทนองค์กร
            </button>
          </div>
          <div class="w-100"></div>
          <div class="form-group col-12 col-lg-6">
            <button class="btn btn-danger btn-block"
                    @click="showDeactivateAccountModal()">
              <i class="fas fa-ban btn-inner-icon"></i>
              ระงับการใช้งาน Account
            </button>
          </div>
        </template>
        <div v-else class="form-group col-12 col-lg-6">
          <button class="btn btn-success btn-block"
                  @click="showReactivateAccountModal()">
            <i class="fas fa-check btn-inner-icon"></i>
            นำ Account กลับมาใช้งาน
          </button>
        </div>
      </div>
    </template>
  </template>

  <Modal  modal-id="removeSubmitterModal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ยืนยันว่าถอนสิทธิในการเป็นตัวแทน
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">
        ท่านกำลังจะถอนสิทธิของ <span class="text-danger">{{ userFullName }}</span>
        จากการเป็นตัวแทนส่งตัวอย่างให้ <span v-if="orgToRemove" class="text-danger">{{ orgToRemove.name }}</span>
      </h4>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button"
                class="btn btn-danger ml-2 w-100"
                @click="submitRemoveSubmissionPermission()">
          ยืนยันว่าจะถอนสิทธิ
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
      <h4 class="my-2">
        <span class="text-danger">{{ userFullName }}</span>
        จะไม่สามารถ login เข้ามาในระบบ แต่ข้อมูลทั้งหมดจะยังคงอยู่
      </h4>
      <h4 class="my-2">ท่านสามารถนำ Account กลับมาใช้งานในภายหลังได้</h4>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button"
                class="btn btn-secondary w-50"
                data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-danger ml-2 w-100"
                @click="submitDeactivateAccount()">
          ยืนยันว่าจะระงับการใช้งาน Account
        </button>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="reactivateAccountModal"
          x-close>
    <template #modal-header>
      <h3 class="text-success">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะนำ Account กลับมาใช้งาน
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">
        <span class="text-success">{{ userFullName }}</span>
        จะสามารถ login เข้ามาในระบบ และทำการส่งตัวอย่างได้
      </h4>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button"
                class="btn btn-secondary w-50"
                data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-success ml-2 w-100"
                @click="submitReactivateAccount()">
          ยืนยันว่าจะนำ Account กลับมาใช้งาน
        </button>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="updateSubmissionPermissionModal"
          data-backdrop="static"
          x-close>
    <template #modal-header>
      <h3 class="text-primary">
        ให้สิทธิในการเป็นตัวแทนองค์กร
      </h3>
    </template>
    <template #modal-body>
      <div class="my-4">
        <h5 class="mb-3">
          เลือกองค์กรให้
          <span class="text-primary">{{ userFullName }}</span>
          เป็นตัวแทน
        </h5>
        <FormSelect
          label="name"
          placeholder="ค้นหาและเลือกได้หลายองค์กร..."
          :multiple="true"
          :close-on-select="false"
          :reduce="option => option.index"
          :get-option-label="option => option.name"
          :options="selectableOrgs"
          v-model="orgsToAdd" />
      </div>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button"
                class="btn btn-secondary w-50"
                data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button"
                class="btn btn-primary ml-2 w-100"
                :disabled="orgsToAdd.length < 1"
                @click="submitUpdateSubmissionPermission()">
          ยืนยันและบันทึก
        </button>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>
import $ from 'jquery'
import { includes } from 'lodash'
import { getJWT } from '@/vue-apollo'
import { ORGS_LIST } from '@/graphql/org'
import {
  USER_DETAIL,
  USER_UPDATE_SUBMISSION_PERMISSION,
  USER_DEACTIVATE_ACCOUNT
} from '@/graphql/user'

export default {
  name: 'admin-user-info',
  computed: {
    userFullName () {
      return `${this.user.title}${this.user.first_name} ${this.user.last_name}`
    },
    submitterOfIndices () {
      return this.user.submitter_of.map(org => org.index)
    },
    selectableOrgs () {
      return this.orgs.filter(org => !includes(this.submitterOfIndices, org.index))
    }
  },
  data () {
    return {
      orgsToAdd: [],
      orgToRemove: null,
      userTypeCSS: {
        201: 'purple',
        101: 'pink'
      },
      userTypeLabel: {
        201: 'ผู้ส่งตัวอย่าง',
        101: 'แอดมิน'
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
    showDeactivateAccountModal () {
      $('#deactivateAccountModal').modal('show')
    },
    async submitDeactivateAccount () {
      try {
        let res = this.$apollo.mutate({
          mutation: USER_DEACTIVATE_ACCOUNT,
          variables: {
            jwt: getJWT(),
            index: this.user.index,
            accountActive: false
          }
        })
        await this.$apollo.queries.user.refetch()
        $('#deactivateAccountModal').modal('hide')
        this.$emit('deactivate-account')
      } catch (err) {
        console.log(err)
      }
    },
    showReactivateAccountModal () {
      $('#reactivateAccountModal').modal('show')
    },
    async submitReactivateAccount () {
      try {
        let res = this.$apollo.mutate({
          mutation: USER_DEACTIVATE_ACCOUNT,
          variables: {
            jwt: getJWT(),
            index: this.user.index,
            accountActive: true
          }
        })
        await this.$apollo.queries.user.refetch()
        $('#reactivateAccountModal').modal('hide')
        this.$emit('reactivate-account')
      } catch (err) {
        console.log(err)
      }
    },
    async submitUpdateSubmissionPermission () {
      try {
        let res = this.$apollo.mutate({
          mutation: USER_UPDATE_SUBMISSION_PERMISSION,
          variables: {  
            jwt: getJWT(),
            index: this.user.index,
            submitterOf: [...this.orgsToAdd, ...this.submitterOfIndices]
          }
        })
        $('#updateSubmissionPermissionModal').modal('hide')
        this.orgsToAdd = []
        await this.$apollo.queries.user.refetch()
      } catch (err) {
        console.log(err)
      }
    },
    async submitRemoveSubmissionPermission () {
      try {
        const submitterOf = this.submitterOfIndices.filter(
          index => index !== this.orgToRemove.index
        )
        let res = this.$apollo.mutate({
          mutation: USER_UPDATE_SUBMISSION_PERMISSION,
          variables: {
            jwt: getJWT(),
            index: this.user.index,
            submitterOf
          }
        })
        $('#removeSubmitterModal').modal('hide')
        this.orgToRemove = null
        await this.$apollo.queries.user.refetch()
      } catch (err) {
        console.log(err)
      }
    },
    showRemoveSubmitterModal (org) {
      this.orgToRemove = org
      $('#removeSubmitterModal').modal('show')
    },
    showUpdateSubmissionPermissionModal () {
      this.orgsToAdd = []
      $('#updateSubmissionPermissionModal').modal('show')
    }
  },
  apollo: {
    user: {
      query: USER_DETAIL,
      variables () {
        return {
          jwt: getJWT(),
          index: [parseInt(this.$route.params.id)]
        }
      },
      update: data => data.get_backuser.result[0]
    },
    orgs: {
      query: ORGS_LIST,
      variables () {
        return {
          jwt: getJWT(),
          searchQuery: '',
          orgType: null
        }
      },
      update: data => data.search_org.result
    },
  }
}
</script>