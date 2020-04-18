<template>
<div class="fill-page d-flex flex-column justify-content-center align-items-center">
  <form class="login-form">
    <a  class="btn btn-transparent mb-3 align-self-start"
        @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />{{ $t(`general.back`) }}
    </a>
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
        <a class="btn btn-transparent btn-sm color-text-light"
           role="button">
          {{ $t(`general.forgotPassword`) }}
        </a>
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <a class="btn btn-primary btn-lg btn-block"
           @click="login()">
          {{ $t(`general.login`) }}
        </a>
      </div>
    </div>
  </form>
</div>
</template>

<style lang="scss" scoped>
.login-logo {
  @include logo;
  width: 250px;
  height: 250px;
  margin-bottom: 2em;
  transition: all 100ms ease-in-out;
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