import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store/store'
import i18n from '@/lang'

import VueScrollactive from 'vue-scrollactive'
import VueScrollTo from 'vue-scrollto'
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'

import Checkbox from '@/util/Checkbox'
import FormInlineSelect from '@/util/FormInlineSelect'
import FormFileUpload from '@/util/FormFileUpload'

Vue.config.productionTip = false

import 'bootstrap'  // Bootstrap js

Vue.use(VueScrollTo)
Vue.use(VueScrollactive)

Vue.component('form-select-input', Multiselect)

Vue.component('checkbox', Checkbox)
Vue.component('datepicker', Datepicker)
Vue.component('form-inline-select', FormInlineSelect)
Vue.component('form-file-upload', FormFileUpload)

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
