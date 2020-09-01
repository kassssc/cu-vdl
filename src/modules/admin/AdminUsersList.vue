<template>
<div class="row flex-1">
  <div class="col-5 sub-nav-content content-height d-flex flex-column">
    <h3 class="mb-3">
      <i class="fas fa-users icon-lg mr-1"></i>
      รายการ User Account
    </h3>
    <SearchInput class="mb-3" />
    <div class="d-flex mb-3">
      <button class="filter-btn btn btn-sm primary w-100"
              :class="{'active': activeFilter === 0}"
              @click="activeFilter = 0">
        <i  v-if="activeFilter === 0"
            class="fas fa-check btn-inner-icon" />
        ทั้งหมด
      </button>
      <button v-for="filter of userTypeFilters"
              :key="filter.id"
              class="filter-btn btn btn-sm w-100 ml-3"
              :class="[
                userTypeCSS[filter.id],
                {'active': activeFilter === filter.id}
              ]"
              @click="activeFilter = filter.id">
        <i  v-if="activeFilter === filter.id"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="userTypeCSS[filter.id]" />
        {{ filter.name }}
      </button>
    </div>

    <div class="scroll-container">
      <div class="fade-gradient-top"></div>
      <ul class="item-list font-chatthai">
        <li v-for="(user, idx) of usersMock"
            :key="idx"
            class="clickable"
            :class="{'active': selectedUser === user}"
            @click="selectedUser = user">
          <div class="row no-gutters">
            <div class="col-8 d-flex align-items-center">
              <h4>{{ `${user.title}${user.firstName} ${user.lastName}` }}</h4>
            </div>
            <div class="col-4">
              <div v-if="user.accountType === 1" class="light-tag purple">
                <div class="small-square purple mr-1"></div>
                พนักงานประจำ
              </div>
              <div v-else class="light-tag pink">
                <div class="small-square pink mr-1"></div>
                Freelance
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="fade-gradient-bottom"></div>
    </div>
  </div>

  <div class="col-7 sub-nav-content content-height d-flex flex-column">
    <h2 class="mb-4">
      <i class="fas fa-user icon-lg mr-1"></i>
      {{ selectedUserFullName }}
    </h2>

    <div class="form-row font-chatthai">
      <div class="form-group col-8">
        <div v-if="selectedUser.accountType === 1" class="light-tag purple lg d-block">
          <div class="small-square purple mr-1"></div>
          พนักงานประจำ
        </div>
        <div v-else class="light-tag pink lg d-block">
          <div class="small-square pink mr-1"></div>
          Freelance
        </div>
      </div>
    </div>

    <div class="form-row font-chatthai pb-3 border-b">
      <FormInput
        class="col-8"
        label="อีเมล"
        disabled
        :value="selectedUser.email" />
      <FormInput
        class="col-8"
        label="หมายเลขโทรศัพท์"
        disabled
        :value="selectedUser.phone" />
      <FileView
        class="col-8"
        label="สำเนาบัตรประชาชน"
        file-name="national_id.pdf"
        icon-class="fa-address-card" />
    </div>

    <div  v-if="selectedUser.accountType === 1"
          class="form-row font-chatthai py-3">
      <div class="form-group col-8">
        <h4 class="text-medium mb-1">องค์กรประจำ</h4>
        <router-link  :to="{ name: 'admin-orgs-list' }"
                      tag="button"
                      class="btn btn-lg btn-secondary btn-block hover-appear-wrapper">
          <div class="d-flex justify-content-between align-items-center">
            {{ org.name }}
            <h5 class="hover-appear text-dark">
              ดูข้อมูลองค์กร
              <i class="fas fa-arrow-right icon-sm ml-1"></i>
            </h5>
          </div>
        </router-link>
      </div>
    </div>

    <div  v-else
          class="font-chatthai scroll-container my-3">
      <table>
        <thead>
          <tr>
            <th class="w-100"> 
              <h3>องค์กรที่เป็นตัวแทน</h3>
              <div class="shadow-th" />
            </th>
            <th class="text-right nowrap">
              <h5 class="text-medium">
                ถอนสิทธิในการเป็นตัวแทน
              </h5>
              <div class="shadow-th" />
            </th>
          </tr>
        </thead>
        <tbody class="border-t">
          <tr v-for="org of orgOptions"
              :key="org.id">
            <router-link  :to="{ name: 'admin-orgs-list' }"
                          tag="td"
                          class="text-right nowrap hover-appear-wrapper clickable">
              <div class="d-flex justify-content-between align-items-center">
                {{ org.name }}
                <h5 class="hover-appear">
                  ดูข้อมูลองค์กร
                  <i class="fas fa-arrow-right icon-sm ml-1"></i>
                </h5>
              </div>
            </router-link>
            <td class="text-right">
              <button class="btn btn-sm btn-icon btn-icon-danger"
                      @click="showRemoveSubmitterModal()">
                <i class="fa fa-user-slash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="form-row font-chatthai pt-4 border-t">
      <div  v-if="selectedUser.accountType === 2"
            class="form-group col-8">
        <button class="btn btn-primary btn-block"
                @click="showFreelanceAddOrgModal()">
          <i class="fas fa-user-plus btn-inner-icon"></i>
          ให้สิทธิในการเป็นตัวแทนองค์กร
        </button>
      </div>
      <div class="form-group col-8">
        <button class="btn btn-danger btn-block"
                @click="showDeactivateAccountModal()">
          <i class="fas fa-user-slash btn-inner-icon"></i>
          ระงับการใช้งาน Account
        </button>
      </div>
    </div>
  </div>

  <Modal  modal-id="removeSubmitterModal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ยืนยันว่าถอนสิทธิในการเป็นตัวแทน
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">
        ท่านกำลังจะถอนสิทธิของ <span class="text-danger">{{ selectedUserFullName }}</span>
        จากการเป็นตัวแทนส่งตัวอย่างให้ <span class="text-danger">{{ org.name }}</span>
      </h4>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-danger ml-2 w-100"
                @click="removeSubmitter(selectedUser.id, org.id)">
          ยืนยันว่าจะถอนสิทธิ
        </button>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="adminDeactivateAccountModal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะระงับการใช้งาน Account
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">
        <span class="text-danger">{{ selectedUserFullName }}</span>
        จะไม่สามารถ login เข้ามาในระบบ แต่ข้อมูลทั้งหมดจะยังคงอยู่
      </h4>
      <h4 class="my-2">ท่านสามารถนำ Account กลับมาใช้งานในภายหลังได้</h4>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-danger ml-2 w-100"
                @click="deactivateAccount(selectedUser.id)">
          ยืนยันว่าจะระงับการใช้งาน Account
        </button>
      </div>
    </template>
  </Modal>

  <Modal  modal-id="freelanceAddOrgModal"
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
          <span class="text-primary">{{ selectedUserFullName }}</span>
          เป็นตัวแทน
        </h5>
        <FormSelect
          label="name"
          placeholder="ค้นหาและเลือกได้หลายองค์กร..."
          :multiple="true"
          :close-on-select="false"
          :reduce="option => option.id"
          :options="orgOptions"
          v-model="orgsToAdd" />
      </div>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-primary ml-2 w-100"
                @click="freelanceAddOrg(selectedUser.id)">
          ยืนยันและบันทึก
        </button>
      </div>
    </template>
  </Modal>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'admin-users-list',
  computed: {
    ...mapGetters([
      'org',
      'orgOptions',
      'usersMock'
    ]),
    selectedUserFullName () {
      return this.selectedUser? `${this.selectedUser.title}${this.selectedUser.firstName} ${this.selectedUser.lastName}` : ''
    }
  },
  mounted () {
    this.selectedUser = this.usersMock[0]
  },
  data () {
    return {
      selectedUser: {},
      activeFilter: 0,
      userTypeFilters: [
        { id: 1, name: 'พนักงานประจำ'},
        { id: 2, name: 'Freelance'}
      ],
      userTypeCSS: {
        1: 'purple',
        2: 'pink'
      },
      list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      orgsToAdd: []
    }
  },
  methods: {
    showDeactivateAccountModal () {
      $('#adminDeactivateAccountModal').modal('show')
    },
    deactivateAccount (accountId) {
      $('#adminDeactivateAccountModal').modal('hide')
    },
    showRemoveSubmitterModal () {
      $('#removeSubmitterModal').modal('show')
    },
    removeSubmitter (accountId, orgId) {
      $('#removeSubmitterModal').modal('hide')
    },
    showFreelanceAddOrgModal () {
      this.orgsToAdd = []
      $('#freelanceAddOrgModal').modal('show')
    },
    freelanceAddOrg (accountId) {
      $('#freelanceAddOrgModal').modal('hide')
    }
  }
}
</script>