import Vue from 'vue'
import App from '@/App'
import router from '@/router'

Vue.config.productionTip = false

import 'bootstrap'  // Bootstrap js
import 'vue-select/dist/vue-select.css' // vSelect styles

import VueScrollactive from 'vue-scrollactive'
import VueScrollTo from 'vue-scrollto'
import { apolloProvider } from './vue-apollo'

Vue.use(VueScrollTo)
Vue.use(VueScrollactive)

const FormCheckbox = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormCheckbox'
)
const FormInput = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormInput'
)
const FormSuggestInput = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormSuggestInput'
)
const FormSelect = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormSelect'
)
const FormTextarea = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormTextarea'
)
const FormInlineSelect = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormInlineSelect'
)
const FormFileUpload = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormFileUpload'
)
const FormPhoneInput = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormPhoneInput'
)
const FormAddressInput = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormAddressInput'
)
const FormContactNameInput = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormContactNameInput'
)
const FormDateInput = () => import(/* webpackChunkName: "group-form" */
  '@/util/FormDateInput'
)
const FileView = () => import(/* webpackChunkName: "group-form" */
  '@/util/FileView'
)
const SearchInput = () => import(/* webpackChunkName: "group-form" */
  '@/util/SearchInput'
)
const DownloadSlip = () => import(/* webpackChunkName: "group-form" */
  '@/util/DownloadSlip'
)
const Modal = () => import(/* webpackChunkName: "group-util" */
  '@/util/Modal'
)
const ColorTag = () => import(/* webpackChunkName: "group-util" */
  '@/util/ColorTag'
)
const LoadingAnimation = () => import(/* webpackChunkName: "group-util" */
  '@/util/LoadingAnimation'
)
const ErrorBox = () => import(/* webpackChunkName: "group-util" */
  '@/util/ErrorBox'
)

Vue.component('checkbox', FormCheckbox)
Vue.component('FormInput', FormInput)
Vue.component('FormSuggestInput', FormSuggestInput)
Vue.component('FormSelect', FormSelect)
Vue.component('FormTextarea', FormTextarea)
Vue.component('FormInlineSelect', FormInlineSelect)
Vue.component('FormFileUpload', FormFileUpload)
Vue.component('FormDateInput', FormDateInput)
Vue.component('FormAddressInput', FormAddressInput)
Vue.component('FormContactNameInput', FormContactNameInput)
Vue.component('FormPhoneInput', FormPhoneInput)
Vue.component('FileView', FileView)
Vue.component('SearchInput', SearchInput)
Vue.component('DownloadSlip', DownloadSlip)
Vue.component('Modal', Modal)
Vue.component('ColorTag', ColorTag)
Vue.component('LoadingAnimation', LoadingAnimation)
Vue.component('ErrorBox', ErrorBox)

Vue.directive('focus-on-create', {
  inserted: el => el.focus()
})

Vue.mixin({
  methods: {
    to_display_price: raw => `${raw.toLocaleString()}฿`,
    to_display_date: raw => new Date(parseInt(raw)).toLocaleDateString('en-GB'),
    to_display_datetime: raw => new Date(parseInt(raw)).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' }),
    to_date_object: raw => new Date(parseInt(raw))
  }
})

new Vue({
  router,
  apollo: {
    // apollo config
  },
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
