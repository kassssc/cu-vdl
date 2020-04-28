import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import sampleSubmission from './samplesubmission'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    sampleSubmission: sampleSubmission
  },
  
  state: {
    types: {  
      requestTypes: [
        { id: 1,  name: 'คำขอแก้ไขการส่งตัวอย่าง' },
        { id: 2,  name: 'คำขอสมัครสมาชิก' },
        { id: 3,  name: 'คำขอเพิ่มตัวแทนส่งตัวอย่าง' },
        { id: 4,  name: 'คำขอเป็นตัวแทนองค์กร' },
        { id: 5,  name: 'คำขออื่นๆ' },
      ],
      requestStatuses: [
        { id: 1,  name: 'รอการตอบรับ'},
        { id: 2,  name: 'รับคำขอแล้ว'},
        { id: 3,  name: 'ปฏิเสธคำขอแล้ว'},
      ]
    },
    org: {
      id: 1,
      mainContactPerson: {
        id: 2,
        accountType: 1,
        org: 1,
        firstName: 'สมหมาย',
        lastName: 'สมสุทธิสกุล',
        email: 'mr.sommhai@gmail.com',
        phone: '088-888-8888',
        nationalId: null
      },
      submitters: [],
      name: 'ฟาร์มสมควร',
      phone: '087-654-3210',
      addr: {
        line1: '123 ทองหล่อ ซ.12 ถนนสุขุมวิท',
        line2: 'คลองตันเหนือ วัฒนา',
        city: 'กรุงเทพ',
        province: 'กรุงเทพ',
        zip: '10110'
      },
      documents: {
        ภพ44: null,
        registration: null
      }
    },
    data: {
      org_chart: {
        left: {
          boss: {
            img: 'https://i.ibb.co/KrcGxKJ/boss.jpg'
          },
          vets: {
            people: [
              {
                img: 'https://i.ibb.co/GM8S577/vet1.png'
              },
              {
                img: 'https://i.ibb.co/T0z5kjN/vet2.png'
              },
            ]
          }
        },
        middle: {
          people: [
            {
              img: 'https://i.ibb.co/QmkCcY2/virus.png'
            },
            {
              img: 'https://i.ibb.co/t3Z9Cmr/serum.png'
            },
            {
              img: 'https://i.ibb.co/RYGSCJk/bacteria.png'
            },
            {
              img: 'https://i.ibb.co/dWYtw3S/bio.png'
            },
            {
              img: 'https://i.ibb.co/VQJGGSZ/blood1.png'
            },
            {
              img: 'https://i.ibb.co/7vnjSKV/blood2.png'
            },
            {
              img: 'https://i.ibb.co/zR7DZGM/blood3.png'
            },
          ]
        },
        right: {
          people: [
            {
              img: 'https://i.ibb.co/n3yYwMj/staff.png'
            },
            {
              img: 'https://i.ibb.co/wYKrPzT/service.png'
            },
            {
              img: 'https://i.ibb.co/3ByBS3y/lab.png'
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
      ],
      servicesImg: [
        'https://i.ibb.co/jh444d8/01.png',
        'https://i.ibb.co/pRsWJYs/02.png',
        'https://i.ibb.co/TkMRLzT/03.png',
        'https://i.ibb.co/55CTcdM/04.png',
        'https://i.ibb.co/Xtp2SC7/05.png'
      ]
    },
    selectOptions: {
      orgs: [
        { id: 1,  name: 'ฟาร์มสมควร'},
        { id: 2,  name: 'ฟาร์มสมหมาย'},
        { id: 3,  name: 'ฟาร์มสมคิด'},
        { id: 4,  name: 'ฟาร์มสมชาย'}
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
    org_chart: state => {
      return state.data.org_chart
    },
    servicesImg: state => {
      return state.data.servicesImg
    },
    downloads: state => {
      return state.data.downloads
    },

    org: state => {
      return state.org
    },
    requestTypes: state => {
      return state.types.requestTypes
    },
    requestStatuses: state => {
      return state.types.requestStatuses
    },
    orgOptions: state => {
      return state.selectOptions.orgs
    }
  },

  mutations: {
  },
  actions: {
  }
})
