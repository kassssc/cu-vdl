<template>
<div class="d-flex flex-column justify-content-center align-items-center fill-height">
  <div class="login-form">
    <div class="d-flex w-100 justify-content-center">
      <div class="login-logo" />
    </div>
    <div class="form-row mb-3">
      <FormInput
        class="col-12"
        input-class="form-control-lg"
        type="password"
        label="ตั้งรหัสผ่านใหม่"
        :invalid="!passwords_match && !!error"
        autocomplete="chrome-off"
        v-model="password"
        @keyup.enter="on_login()" />
      <FormInput
        class="col-12"
        input-class="form-control-lg"
        type="password"
        label="ยืนยีนรหัสผ่าน"
        :invalid="!passwords_match && !!error"
        autocomplete="chrome-off"
        v-model="confirm_password"
        @keyup.enter="on_login()" />
    </div>
    <div class="form-row">
      <div class="form-group col-12">
        <button class="btn btn-primary btn-lg btn-block loading"
                :disabled="submitting"
                @click="submit_reset_password">
          <template v-if="submitting">
            <LoadingAnimation />
          </template>
          <template v-else>
            <i class="fas fa-lock btn-inner-icon"></i> ตั้งรหัสผ่านใหม่
          </template>
        </button>
        <ErrorBox v-if="error" :msg="error" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { RESET_PASSWORD } from '@/graphql/login'

export default {
  name: 'reset-password',
  computed: {
    passwords_match () {
      return this.password === this.confirm_password
    },
    form_filled () {
      return !!this.password && !!this.confirm_password
    }
  },
  data () {
    return {
      loading: false,
      error: null,
      submitting: null,
      password: null,
      confirm_password: null
    }
  },
  methods: {
    async submit_reset_password () {
      if (!this.form_filled) {
        this.error = 'กรุณาใส่รหัสผ่าน'
        return
      }
      if (!this.passwords_match) {
        this.error = 'รหัสผ่านไม่ตรงกัน'
        return
      }
      this.submitting = true
      try {
        const res = await this.$apollo.mutate({
          mutation: RESET_PASSWORD,
          variables: {
            token: this.$route.params.token,
            new_pass: this.password
          }
        })
        console.log(res)
        this.$router.push({
          name: 'login'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-logo {
  @include logo;
  width: 200px;
  height: 200px;
  margin-bottom: 2em;
}
.login-form {
  width: 400px;
}
</style>