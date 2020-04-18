import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'

import VueScrollactive from 'vue-scrollactive'
import VueScrollTo from 'vue-scrollto'
import Datepicker from 'vuejs-datepicker'

import Checkbox from '@/util/Checkbox.vue'
import FormInlineSelect from '@/util/FormInlineSelect.vue'

Vue.config.productionTip = false

import 'bootstrap'  // Bootstrap js

Vue.use(VueScrollactive)
Vue.use(VueScrollTo)

Vue.component('checkbox', Checkbox)
Vue.component('datepicker', Datepicker)
Vue.component('form-inline-select', FormInlineSelect)

/* Vue.mixin({
  methods: {
    gen_URL: function (url) {
      return 'url(' + require('./assets/' + url) + ')'
    },
  }
})
 */
Vue.directive('focus-on-create', {
  inserted: el => el.focus()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
