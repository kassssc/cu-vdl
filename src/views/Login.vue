<template>
<div class="login-container d-flex flex-column justify-content-center align-items-center">
  <form class="login-form">
    <router-link to="/" tag="button" class="custom md mb-3 align-self-start">
      <i class="fas fa-chevron-left mr-1"></i> {{ $t(`general.back`) }}
    </router-link>
    <div class="login-logo" />
    <div class="form-group">
      <label class="form-label" for="exampleInputEmail1">
        {{ $t(`general.email`) }}
      </label>
      <input type="email"
             class="form-control"
             id="login-email" aria-describedby="emailHelp">
    </div>
    <div class="form-group">
      <label class="form-label" for="exampleInputPassword1">
        {{ $t(`general.password`) }}
      </label>
      <input type="password"
             class="form-control">
    </div>
    <div class="form-group">
      <checkbox v-model="loginForm.stayLoggedIn"
                :label="$t(`general.remember`)" />
    </div>
    <button type="submit"
            class="custom pink lg full-width"
            @click="login()">
      {{ $t(`general.login`) }}
    </button>
  </form>
</div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
}
.login-logo {
  width: 250px;
  height: 250px;
  margin-bottom: 2em;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url('../assets/logo.png');
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
    login () {
      this.$router.push('/')
    }
  }
}
</script>