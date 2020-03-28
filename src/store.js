import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 1,
    nav: [
      {
        path: '/',
        name: 'about'
      },
      {
        path: '/tracksubmissions',
        name: 'trackSubmissions'
      },
      {
        path: '/submitsamples',
        name: 'submitSamples'
      },
    ],
    data: {
      org_chart: {
        left: {
          boss: {
            img: 'boss.png'
          },
          vets: {
            people: [
              {
                img: 'vet1.png'
              },
              {
                img: 'vet2.png'
              },
            ]
          }
        },
        middle: {
          people: [
            {
              img: 'virus.png'
            },
            {
              img: 'serum.png'
            },
            {
              img: 'bacteria.png'
            },
            {
              img: 'bio.png'
            },
            {
              img: 'blood1.png'
            },
            {
              img: 'blood2.png'
            },
            {
              img: 'blood3.png'
            },
          ]
        },
        right: {
          people: [
            {
              img: 'staff.png'
            },
            {
              img: 'service.png'
            },
            {
              img: 'lab.png'
            },
          ]
        }
      },
      downloads: [
        'hermatology.pdf',
        'bacteriology.pdf',
        'virology.pdf',
        'serology.pdf',
        'molecular.pdf'
      ]
    }
  },
  getters: {
    intro: state => {
      return state.data.intro_text
    },
    nav: state => {
      return state.nav
    },
    lang: state => {
      return state.lang
    },
    org_chart: state => {
      return state.data.org_chart
    },
    downloads: state => {
      return state.data.downloads
    }
  },
  mutations: {
    UPDATE_LANG: (state, payload) => {
      state.lang = payload
    }
  },
  actions: {
    change_lang: (context, lang) => {
      context.commit('UPDATE_LANG', lang)
    }
  }
})
