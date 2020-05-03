import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {},
  th: {}
}

const i18n = new VueI18n({
  locale: 'th',
  fallbackLocale: 'th',
  messages: messages
})

export default i18n