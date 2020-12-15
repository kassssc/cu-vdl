<template>
<div class="d-flex flex-column justify-content-center align-items-center fill-height">
  <div class="login-form">
    <button class="btn btn-transparent mb-3"
            @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />กลับไป
    </button>
    <div class="d-flex w-100 justify-content-center">
      <div class="login-logo" />
    </div>
    <div class="form-row">
      <FormInput
        class="col-12"
        input-class="form-control-lg"
        type="text"
        label="อีเมล"
        v-model="login_form.email"
        @keyup.enter="on_login()" />
      <FormInput
        class="col-12"
        input-class="form-control-lg"
        type="password"
        label="รหัสผ่าน"
        v-model="login_form.password"
        @keyup.enter="on_login()" />
    </div>
    <div class="form-row">
      <div class="form-group col-12 d-flex justify-content-end">
        <!-- <checkbox v-model="login_form.stay_logged_in"
                  class="mt-1"
                  label="จำไว้ในระบบ" /> -->
        <button class="btn btn-transparent btn-sm text-muted"
                @click="forgot_password()">
          ลืมรหัสผ่าน
        </button>
      </div>
    </div>
    <div v-if="error" class="form-row">
      <div class="form-group col-12">
        <ErrorBox msg="รหัสผ่าน หรือ อีเมล ไม่ถูกต้อง" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-12">
        <button class="btn btn-primary btn-lg btn-block loading"
                :disabled="loading"
                @click="on_login()">
          <template v-if="loading">
            <LoadingAnimation />
          </template>
          <template v-else>
            <i class="fas fa-sign-in-alt btn-inner-icon"></i> เข้าสู่ระบบ
          </template>
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

  <Modal  modal-id="forgot-password-modal"
          x-close>
    <template #modal-header>
      <h4 class="text-primary">
        <i class="fas fa-question mr-1" />
        ลืมรหัสผ่าน
      </h4>
    </template>
    <template #modal-body>
      <h5 class="text-dark mb-3">
        กรุณากรอกข้อมูลเพื่อยืนยันตัวตน หากข้อมูลถูกต้อง ท่านจะได้รับลิ้งค์เปลี่ยนรหัสผ่านทางอีเมล
      </h5>
      <div class="form-row">
        <FormInput
          class="col-12"
          type="text"
          label="อีเมลที่ใช้ login"
          v-model="forgot_pass_email" />
      </div>
      <div class="form-row mt-3">
        <div class="form-group col-4 mb-0">
          <button type="button"
                  class="btn btn-secondary btn-block"
                  data-dismiss="modal">
            ยกเลิก
          </button>
        </div>
        <div class="form-group col-8 mb-0">
          <button type="button" class="btn btn-primary btn-block"
                  @click="submit_forgot_password()">
            <i class="fa fa-envelope btn-inner-icon"></i>ส่งลิ้งค์เปลี่ยนรหัสผ่านทางอีเมล
          </button>
        </div>
      </div>
    </template>
  </Modal>
  
</div>
</template>

<script>
import $ from 'jquery'
import { get_last_route } from '@/router'
import { on_login } from '@/vue-apollo'
import { LOGIN, FORGOT_PASSWORD } from '@/graphql/login'

export default {
  name: 'login',
  data () {
    return {
      loading: false,
      error: false,
      login_form: {
        email: null,
        password: null,
        stay_logged_in: true
      },
      forgot_pass_email: null
    }
  },
  methods: {
    async on_login () {
      const { email, password } = this.login_form
      if (!email || !password) {
        this.error = true
        return
      }
      try {
        this.loading = true
        const res = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            email,
            password
          }
        })
        if (res.data.login.status) {
          const jwt = res.data.login.result.jwt
          await on_login(
            this.$apollo.provider.defaultClient,
            jwt,
            this.login_form.stay_logged_in
          )
          const last_route_path = get_last_route()
          if (last_route_path) {
            this.$router.push(last_route_path)
          } else {
            this.$router.push({ name: 'submissions-list' })
          }

        } else {
          this.error = true
          this.loading = false
          this.login_form.email = null
          this.login_form.password = null
        }
      } catch (err) {
        this.error = true
        this.loading = false
        console.log(err)
      }
    },
    forgot_password () {
      $('#add-english-info-modal').on('hidden.bs.modal', () => {
        this.forgot_pass_email = null
      })
      $('#forgot-password-modal').modal('show')
    },
    async submit_forgot_password () {
      if (!this.forgot_pass_email) {
        return
      }
      try {
        const res = await this.$apollo.mutate({
          mutation: FORGOT_PASSWORD,
          variables: {
            email: this.forgot_pass_email
          }
        })
        $('#forgot-password-modal').modal('hide')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-logo {
  @include logo;
  width: 250px;
  height: 250px;
  margin-bottom: 2em;
}
.login-form {
  width: 400px;
}
</style>