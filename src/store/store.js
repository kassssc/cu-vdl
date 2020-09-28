import Vue from 'vue'
import Vuex from 'vuex'

import sampleSubmission from './samplesubmission'

Vue.use(Vuex)

const modules = {
  sampleSubmission
}

const state = {
  org: {
    id: 1,
    submitters: [],
    name: 'ฟาร์มสมควร',
    phone: '087-654-3210',
    addr: '123 ทองหล่อ ซ.12 ถนนสุขุมวิท\nแขวงคลองตันเหนือ เขตวัฒนา\nกรุงเทพฯ 10110',
    documents: {
      ภพ20: null,
      registration: null
    }
  },
  selectOptions: {
    orgs: [
      { id: 1,  name: 'ฟาร์มสมควร'},
      { id: 2,  name: 'ฟาร์มสมหมาย'},
      { id: 3,  name: 'ฟาร์มสมคิด'},
      { id: 4,  name: 'ฟาร์มสมชาย'},
      { id: 5,  name: 'ฟาร์มสมเดช'},
      { id: 6,  name: 'ฟาร์มสมเกียรติ'},
      { id: 7,  name: 'ฟาร์มสมรัช'}
    ],
    nameTitles: [
      'นาย',
      'นาง',
      'น.ส.',
      'น.สพ.',
      'สพ.ญ.',
    ]
  },
  types: {
    submissionStatuses: [
      { id: 1, label: 'ส่งแล้ว',},
      { id: 2, label: 'กำลังดำเนินการ'},
      { id: 3, label: 'เสร็จสิ้น'},
      { id: 4, label: 'ยกเลิก'},
    ],
    submissionStatusData: {
      1: { label: 'ส่งแล้ว',        color: 'grey'},
      2: { label: 'กำลังดำเนินการ', color: 'orange'},
      3: { label: 'เสร็จสิ้น',       color: 'green'},
      4: { label: 'ยกเลิก',        color: 'red'},
    },
    submissionInvoiceStatuses: [
      { id: 1, label: 'ยังไม่ออก Invoice'},
      { id: 2, label: 'ออก Invoice แล้ว'},
      { id: 3, label: 'ชำระค่าบริการแล้ว'},        
    ],
    submissionInvoiceStatusData: {
      1: { label: 'ยังไม่ออก Invoice', color: 'grey' },
      2: { label: 'ออก Invoice แล้ว', color: 'orange' },
      3: { label: 'ชำระค่าบริการแล้ว',  color: 'green' }
    }
  },
}

const getters = {
  org: state => {
    return state.org
  },
  orgOptions: state => {
    return state.selectOptions.orgs
  },

  submissionStatuses: state => {
    return state.types.submissionStatuses
  },
  submissionStatusData: state => {
    return state.types.submissionStatusData
  },
  submissionInvoiceStatuses: state => {
    return state.types.submissionInvoiceStatuses
  },
  submissionInvoiceStatusData: state => {
    return state.types.submissionInvoiceStatusData
  },
  nameTitles: state => {
    return state.selectOptions.nameTitles
  }
}

export default new Vuex.Store({
  modules,
  state,
  getters
})
