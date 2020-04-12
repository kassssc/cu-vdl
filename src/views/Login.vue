<template>
<div class="fill-page d-flex flex-column justify-content-center align-items-center">
  <form class="login-form">
    <router-link to="/"
                 tag="button"
                 class="btn btn-transparent mb-3 align-self-start">
      <i class="fas fa-chevron-left mr-1" /> {{ $t(`general.back`) }}
    </router-link>
    <div class="login-logo" />
    <div class="form-row w-100">
      <div class="form-group col-12">
        <label>
          {{ $t(`general.email`) }}
        </label>
        <input type="email"
               class="form-control form-control-lg"
               v-model="loginForm.email">
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <label>
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
                  :label="$t(`general.remember`)" />
        <a class="btn btn-transparent btn-sm"
           role="button">
          {{ $t(`general.forgotPassword`) }}
        </a>
      </div>
    </div>
    <div class="form-row w-100">
      <div class="form-group col-12">
        <button type="submit"
                class="btn btn-primary btn-lg btn-block"
                @click="login()">
          {{ $t(`general.login`) }}
        </button>
      </div>
    </div>
  </form>
</div>
</template>

<style lang="scss" scoped>
.login-logo {
  width: 250px;
  height: 250px;
  margin-bottom: 2em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url('https://i.ibb.co/PWZBG5p/logo.png');
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