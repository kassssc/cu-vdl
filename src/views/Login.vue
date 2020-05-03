<template>
<div class="fill-page d-flex flex-column justify-content-center align-items-center">
  <div class="login-form">
    <button class="btn btn-transparent mb-3 align-self-start"
            @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />กลับไป
    </button>
    <div class="login-logo" />
    <div class="form-row w-100">
      <div class="form-group col-12">
        <label class="mb-2">
          อีเมล
        </label>
        <input type="email"
               class="form-control form-control-lg"
               v-model="loginForm.email">
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <label class="mb-2">
          รหัสผ่าน
        </label>
        <input type="password"
               class="form-control form-control-lg"
               v-model="loginForm.password">
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12 d-flex justify-content-between">
        <checkbox v-model="loginForm.stayLoggedIn"
                  class="mt-1"
                  label="จำไว้ในระบบ" />
        <button class="btn btn-transparent btn-sm text-muted"
                role="button">
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
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <router-link  :to="{name: 'signup'}"
                      tag="a"
                      class="btn btn-secondary btn-lg btn-block">
          <i class="fas fa-user-plus btn-inner-icon"></i> สมัครสมาชิก
        </router-link>
      </div>
    </div>
  </div>

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

<style lang="scss" scoped>
.__dev-panel {
  bottom: 20px;
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

<script>
import { mapActions } from 'vuex'

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
    }
  }
}
</script>