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
    data: {
      orgChart: {
        left: {
          boss: {
            title: 'หัวหน้าหน่วยชันสูตรโรคสัตว์กลาง',
            name: 'ผศ.น.สพ.ดร.สว่าง  เกษแดงสกลวุฒิ',
            img: 'https://i.ibb.co/KrcGxKJ/boss.jpg'
          },
          vets: {
            title: 'สัตวแพทย์',
            people: [
              {
                name: 'น.สพ.รชฎ ตันติเลิศเจริญ',
                img: 'https://i.ibb.co/GM8S577/vet1.png'
              },
              {
                name: 'สพ.ญ.นภวัลย์ บรรพพงศ์',
                img: 'https://i.ibb.co/T0z5kjN/vet2.png'
              },
            ]
          }
        },
        middle: {
          title: 'เจ้าหน้าที่บริการวิทยาศาสตร์',
          top: [
            {
              title: 'งานไวรัสวิทยา',
              name: 'นางพอจิต ชูใจ',
              img: 'https://i.ibb.co/QmkCcY2/virus.png'
            },
            {
              title: 'งานซีรั่มวิทยา',
              name: 'นางผุสดี มาคุ้ม',
              img: 'https://i.ibb.co/t3Z9Cmr/serum.png'
            }
          ],
          middle: [
            {
              title: 'งานแบคทีเรีย',
              name: 'นายพงษ์ไทย บุญคำ',
              img: 'https://i.ibb.co/RYGSCJk/bacteria.png'
            },
            {
              title: 'งานอณูชีววิทยา',
              name: 'นางสาวนันทิยา เอี่ยมประภาศ',
              img: 'https://i.ibb.co/dWYtw3S/bio.png'
            },
          ],
          bottom: [
            {
              title: 'งานโลหิตวิทยา',
              name: 'นางเกษร เอี่ยมละออ',
              img: 'https://i.ibb.co/VQJGGSZ/blood1.png'
            },
            {
              title: 'งานโลหิตวิทยา',
              name: 'นางวันเพ็ญ อดุลยานุภาพ',
              img: 'https://i.ibb.co/7vnjSKV/blood2.png'
            },
            {
              title: 'งานโลหิตวิทยา',
              name: 'นายกฤษณ์ หัสเขตร์',
              img: 'https://i.ibb.co/zR7DZGM/blood3.png'
            },
          ]
        },
        right: {
          people: [
            {
              title: 'เจ้าหน้าที่สำนักงาน (ธุรการ)',
              name: 'นางสาวธันยาภัทร์ พัฒน์สินศิริ',
              img: 'https://i.ibb.co/n3yYwMj/staff.png'
            },
            {
              title: 'พนักงานบริการทั่วไป',
              name: 'นางสาวศศิกานต์ สินโทต้อม',
              img: 'https://i.ibb.co/wYKrPzT/service.png'
            },
            {
              title: 'พนักงานห้องทดลอง',
              name: 'นางสาวจีรภรณ์ สุขชูศรี',
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
        { id: 1,  key: 'S', label: 'ส่งแล้ว',},
        { id: 2,  key: 'R', label: 'ได้รับแล้ว'},
        { id: 3,  key: 'C', label: 'เสร็จสิ้น'},
        { id: 4,  key: 'X', label: 'ยกเลิก'},
      ],
      submissionStatusData: {
        1: { label: 'ส่งแล้ว',    color: 'grey'},
        2: { label: 'ได้รับแล้ว',  color: 'orange'},
        3: { label: 'เสร็จสิ้น',   color: 'green'},
        4: { label: 'ยกเลิก',    color: 'red'},
      },
      submissionInvoiceStatuses: [
        { id: 1,  key: 'N', label: 'ยังไม่ออก Invoice'},
        { id: 2,  key: 'I', label: 'ออก Invoice แล้ว'},
        { id: 3,  key: 'P', label: 'ชำระค่าบริการแล้ว'},        
      ],
      submissionInvoiceStatusData: {
        1: { label: 'ยังไม่ออก Invoice', color: 'grey' },
        2: { label: 'ออก Invoice แล้ว', color: 'orange' },
        3: { label: 'ชำระค่าบริการแล้ว',  color: 'green' }
      }
    },
  },
  getters: {
    orgChart: state => {
      return state.data.orgChart
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

    nameTitles: state => state.selectOptions.nameTitles
  },

  mutations: {
  },
  actions: {
  }
})
