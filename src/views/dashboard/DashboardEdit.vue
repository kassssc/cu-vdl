<template>
<div class="p-4">
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-edit icon-lg mr-1"></i>
        แก้ไขข้อมูล Account
      </h3>
    </div>
  </div>

  <div class="font-chatthai">

    <div class="border-bottom-lighter row w-100 py-3 mb-3">
      <div class="col-xl-3 col-12">
        <h4>แก้ไขข้อมูลการติดต่อ</h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <FormInput
            class="col-6"
            label="หมายเลขโทรศัพท์"
            v-model="user.phone" />
          <div class="w-100"></div>
          <div class="form-group col-6">
            <button class="btn btn-primary btn-block mt-2">
              <i class="fas fa-phone btn-inner-icon" />
              เปลี่ยนข้อมูลการติดต่อ
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="border-bottom-lighter row w-100 py-3 mb-3">
      <div class="col-xl-3 col-12">
        <h4>เปลี่ยนรหัสผ่าน</h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <FormInput
            class="col-6"
            label="รหัสผ่านเก่า"
            type="password" />
          <div class="w-100"></div>
          <FormInput
            class="col-6"
            label="รหัสผ่านใหม่"
            type="password" />
          <div class="w-100"></div>
          <FormInput
            class="col-6"
            label="ยืนยันรหัสผ่านใหม่"
            type="password" />
          <div class="w-100"></div>
          <div class="form-group col-6">
            <button class="btn btn-primary btn-block mt-2">
              <i class="fas fa-key btn-inner-icon" />
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
        </div>
      </div>
    </div>

    <div  v-if="!userIsAdmin"
          class="border-bottom-lighter row w-100 py-3">
      <div class="col-xl-3 col-12">
        <h4>ระงับการใช้งาน Account</h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <div class="form-group col-6">
            <button class="btn btn-block btn-danger"
                    @click="showDeactivateAccountModal()">
              <i class="fas fa-user-slash btn-inner-icon" />
              ระงับการใช้งาน Account
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

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
                @click="deactivateAccount()">
          ยืนยันว่าจะระงับการใช้งาน Account
        </button>
      </div>
    </template>
  </Modal>
</div>
</template>

<style lang="scss" scoped>
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'

export default {
  name: 'dashboard-edit',
  computed: {
    ...mapGetters([
      'user',
      'org',
      'userIsAdmin'
    ])
  },
  methods: {
    ...mapActions(['logout']),
    deactivateAccount () {
      $('#deactivateAccountModal').modal('hide')
      // deactivate account
      // then logout
      // navigate to home
      this.logout()
      this.$router.push({ name: 'home' })
    },
    showDeactivateAccountModal () {
      $('#deactivateAccountModal').modal('show')
    }
  }
}
</script>