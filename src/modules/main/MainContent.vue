<template>
<div>
  <Titlebar @logout="show_logout_modal()" />
  <transition name="fade">
    <router-view />
  </transition>
  
  <Modal  modal-id="logout-modal"
          modal-dialog-class="modal-sm modal-dialog-centered">
    <template #modal-header>
      <h3>ยืนยันว่าจะ Logout</h3>
    </template>
    <template #modal-body>
      <div class="form-row">
        <div class="form-group col-6 mb-0">
          <button type="button"
                  class="btn btn-secondary btn-block"
                  data-dismiss="modal">
            กลับไป
          </button>
        </div>
        <div class="form-group col-6 mb-0">
          <button type="button" class="btn btn-danger btn-block"
                  @click="logout_and_go_to_home()">
            <i class="fas fa-sign-out-alt btn-inner-icon"></i>Logout
          </button>
        </div>
      </div>
    </template>
  </Modal>

</div>
</template>

<script>
import $ from 'jquery'

import Titlebar from './Titlebar'
import { on_logout } from '@/vue-apollo'

export default {
  name: 'main-content',
  components: {
    Titlebar,
  },
  methods: {
    async logout_and_go_to_home () {
      await on_logout(this.$apollo.provider.defaultClient)
      if (this.$route.name !== 'home') {
        this.$router.push('/')
      }
    },
    show_logout_modal () {
      $('#logout-modal').modal('show')
    }
  }
}
</script>