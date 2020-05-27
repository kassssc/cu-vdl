<template>
<div class="d-flex flex-column justify-content-center align-items-center fill-height">
  <div class="login-form">
    <button class="btn btn-transparent mb-3 align-self-start"
            @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />กลับไป
    </button>
    <div class="login-logo" />
    <div class="form-row w-100">
      <FormInput
        class="col-12"
        input-class="form-control-lg"
        type="text"
        label="อีเมล"
        v-model="loginForm.email"/>
      <FormInput
        class="col-12"
        input-class="form-control-lg"
        type="password"
        label="รหัสผ่าน"
        v-model="loginForm.password"/>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12 d-flex justify-content-between">
        <checkbox v-model="loginForm.stayLoggedIn"
                  class="mt-1"
                  label="จำไว้ในระบบ" />
        <button class="btn btn-transparent btn-sm text-muted"
                @click="forgotPassword()">
          ลืมรหัสผ่าน
        </button>
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <button class="btn btn-primary btn-lg btn-block"
                @click="login()">
          <i class="fas fa-sign-in-alt btn-inner-icon"></i> เข้าสู่ระบบ
        </button>
      </div>
      <div class="form-group col-12">
        <router-link  :to="{name: 'signup'}"
                      tag="a"
                      class="btn btn-secondary btn-lg btn-block">
          <i class="fas fa-user-plus btn-inner-icon"></i> ขอสมัครสมาชิก
        </router-link>
      </div>
    </div>
  </div>

  <Modal  modal-id="forgotPasswordModal"
          x-close>
    <template #modal-header>
      <h3 class="text-primary">
        <i class="fas fa-question icon-md mr-1" />
        ลืมรหัสผ่าน
      </h3>
    </template>
    <template #modal-body>
      <div class="form-row d-flex justify-content-center">
        <div class="col-10">
          <h4 class="text-medium mb-3">
            กรุณากรอกข้อมูลเพื่อยืนยันตัวตน หากข้อมูลถูกต้อง ท่านจะได้รับลิ้งค์เปลี่ยนรหัสผ่านทางอีเมล
          </h4>
        </div>
        <FormInput
          class="col-9"
          input-class="form-control-lg"
          type="text"
          label="อีเมลที่ใช้ login" />
        <FormInput
          class="col-9"
          input-class="form-control-lg"
          type="text"
          label="ชื่อจริง" />
        <FormInput
          class="col-9"
          input-class="form-control-lg"
          type="text"
          label="นามสกุล" />
      </div>
    </template>
    <template #modal-footer>
      <div class="w-100 d-flex flex-nowrap">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-primary ml-2 w-100"
                @click="submitForgotPasswordForm()">
          ส่งลิ้งค์เปลี่ยนรหัสผ่านทางอีเมล
        </button>
      </div>
    </template>
  </Modal>

  <div class="d-flex flex-column position-absolute __dev-panel">
    <h3 class="mb-3">DEV TOOLS</h3>
    <button class="btn btn-dark btn-block"
            @click="loginAs(0)">
      Login as VDL Admin
    </button>
    <button class="btn btn-dark btn-block"
            @click="loginAs(1)">
      Login as Employee Submitter
    </button>
    <button class="btn btn-dark btn-block"
            @click="loginAs(2)">
      Login as Freelance Submitter
    </button>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import $ from 'jquery'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        email: '',
        password: '',
        stayLoggedIn: true
      }
    }
  },
  methods: {
    ...mapActions([
      'loginAsType'
    ]),
    login () {
      this.loginAsType(1)
      this.$router.push({ name: 'submissionslist' })
    },
    loginAs (accType) {
      this.loginAsType(accType)
      this.$router.push({ name: 'submissionslist' })
    },
    forgotPassword () {
      $('#forgotPasswordModal').modal('show')
    },
    submitForgotPasswordForm () {
      $('#forgotPasswordModal').modal('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
.__dev-panel {
  right: 20px;
  margin: auto;
  width: 400px;
}
.login-logo {
  @include logo;
  width: 250px;
  height: 250px;
  margin-bottom: 2em;
}
.login-form {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>