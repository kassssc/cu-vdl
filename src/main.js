import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import Checkbox from '@/util/Checkbox.vue'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.mixin({
  methods: {
    gen_URL: function (url) {
      return 'url(' + require('./assets/' + url) + ')'
    },
  }
})

Vue.directive('click-outside', {
  bind () {
    this.event = event => this.vm.$emit(this.expression, event)
    this.el.addEventListener('click', this.stopProp)
    document.body.addEventListener('click', this.event)
  },   
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },
  
  stopProp(event) { event.stopPropagation() }
})

Vue.component('checkbox', Checkbox)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
