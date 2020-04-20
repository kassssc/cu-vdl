<template>
<div class="fill-page d-flex flex-column justify-content-center align-items-center">
  <div class="login-form">
    <button class="btn btn-transparent mb-3 align-self-start"
            @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />{{ $t(`general.back`) }}
    </button>
    <div class="login-logo" />
    <div class="form-row w-100">
      <div class="form-group col-12">
        <label class="mb-2">
          {{ $t(`general.email`) }}
        </label>
        <input type="email"
               class="form-control form-control-lg"
               v-model="loginForm.email">
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <label class="mb-2">
          {{ $t(`general.password`) }}
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
                  :label="$t(`general.remember`)" />
        <button class="btn btn-transparent btn-sm color-text-light"
                role="button">
          {{ $t(`general.forgotPassword`) }}
        </button>
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <button class="btn btn-primary btn-lg btn-block"
                @click="login()">
          <i class="fas fa-sign-in-alt btn-inner-icon"></i> {{ $t(`general.login`) }}
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
</div>
</template>

<style lang="scss" scoped>
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
      'loginout'
    ]),
    login () {
      this.loginout(true)
      this.$router.push({name: 'submissionslist'})
    }
  }
}
</script>