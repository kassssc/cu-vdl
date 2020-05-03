import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store/store'
//import i18n from '@/lang'

import VueScrollactive from 'vue-scrollactive'
import VueScrollTo from 'vue-scrollto'

import FormCheckbox from '@/util/FormCheckbox'
import FormInput from '@/util/FormInput'
import FormSuggestInput from '@/util/FormSuggestInput'
import FormSelect from '@/util/FormSelect'
import FormTextarea from '@/util/FormTextarea'
import FormInlineSelect from '@/util/FormInlineSelect'
import FormFileUpload from '@/util/FormFileUpload'
import FormDateInput from '@/util/FormDateInput'
import FileView from '@/util/FileView'

Vue.config.productionTip = false

import 'bootstrap'  // Bootstrap js
import 'vue-select/dist/vue-select.css' // vSelect styles

Vue.use(VueScrollTo)
Vue.use(VueScrollactive)

Vue.component('checkbox', FormCheckbox)
Vue.component('FormInput', FormInput)
Vue.component('FormSuggestInput', FormSuggestInput)
Vue.component('FormSelect', FormSelect)
Vue.component('FormTextarea', FormTextarea)
Vue.component('FormInlineSelect', FormInlineSelect)
Vue.component('FormFileUpload', FormFileUpload)
Vue.component('FormDateInput', FormDateInput)
Vue.component('FileView', FileView)

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
  //i18n,
  render: h => h(App)
}).$mount('#app')
