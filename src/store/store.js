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
      mainContactPerson: {
        id: 2,
        accountType: 1,
        org: 1,
        title: 'นาย',
        firstName: 'สมหมาย',
        lastName: 'สมสุทธิสกุล',
        email: 'mr.sommhai@gmail.com',
        phone: '088-888-8888',
        nationalId: null
      },
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
      ],
      submissionStatuses: [
        { id: 1,  key: 'S', name: 'ส่งแล้ว'},
        { id: 2,  key: 'R', name: 'ได้รับแล้ว'},
        { id: 3,  key: 'C', name: 'เสร็จสิ้น'},
        { id: 4,  key: 'X', name: 'ยกเลิก'},
      ],
      submissionInvoiceStatuses: [
        { id: 1,  key: 'N', name: 'ยังไม่ออก Invoice'},
        { id: 2,  key: 'I', name: 'ออก Invoice แล้ว'},
        { id: 3,  key: 'P', name: 'ชำระค่าบริการแล้ว'},        
      ]
    },
    requests: [
      {
        name: 'รอการตอบรับ',
        list: [
          {
            id: 1,
            requestNum: 'S000002',
            status: 1,
            statusLabel: 'รอการตอบรับ',
            type: 1,
            typeLabel: 'คำขอแก้ไขการส่งตัวอย่าง',
            createdDate: '04/05/2020',
            user: {
              name: 'สมควร สมสกุล',
              email: 'mr.somkuan@gmail.com',
              phone: '081-234-5678'
            },
            orgName: 'ฟาร์มสมควร',
            submissionNum: 'G22334455',
            details: ''
          },
          {
            id: 2,
            requestNum: 'S000001',
            status: 1,
            statusLabel: 'รอการตอบรับ',
            type: 1,
            typeLabel: 'คำขอแก้ไขการส่งตัวอย่าง',
            createdDate: '04/05/2020',
            user: {
              name: 'สมเดช สมวงศ์สกุล',
              email: 'mr.somdej@gmail.com',
              phone: '087-777-8888'
            },
            orgName: 'ฟาร์มสมควร',
            submissionNum: 'D12345678',
            details: ''
          },
          {
            id: 3,
            requestNum: 'M000003',
            status: 1,
            statusLabel: 'รอการตอบรับ',
            type: 2,
            typeLabel: 'คำขอสมัครสมาชิก',
            createdDate: '02/05/2020'
          },
          {
            id: 4,
            requestNum: 'A000001',
            status: 1,
            statusLabel: 'รอการตอบรับ',
            type: 3,
            typeLabel: 'คำขอเพิ่มตัวแทนส่งตัวอย่าง',
            createdDate: '01/05/2020'
          },
        ]
      },
      {
        name: 'เสร็จเรียบร้อย',
        list: [
          {
            id: 5,
            requestNum: 'X000001',
            status: 2,
            statusLabel: 'รับคำขอแล้ว',
            type: 5,
            typeLabel: 'คำขออื่นๆ',
            createdDate: '29/04/2020'
          },
          {
            id: 6,
            requestNum: 'M000002',
            status: 3,
            statusLabel: 'ปฏิเสธคำขอแล้ว',
            type: 2,
            typeLabel: 'คำขอสมัครสมาชิก',
            createdDate: '28/04/2020'
          },
          {
            id: 7,
            requestNum: 'F000001',
            status: 3,
            statusLabel: 'ปฏิเสธคำขอแล้ว',
            type: 4,
            typeLabel: 'คำขอเป็นตัวแทนองค์กร',
            createdDate: '25/04/2020'
          },
          {
            id: 8,
            requestNum: 'M000001',
            status: 2,
            statusLabel: 'รับคำขอแล้ว',
            type: 2,
            typeLabel: 'คำขอสมัครสมาชิก',
            createdDate: '05/04/2020'
          },
        ]
      }
    ]
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
    requestTypes: state => {
      return state.types.requestTypes
    },
    requestStatuses: state => {
      return state.types.requestStatuses
    },
    requests: state => {
      return state.requests
    },

    submissionStatuses: state => {
      return state.types.submissionStatuses
    },
    submissionInvoiceStatuses: state => {
      return state.types.submissionInvoiceStatuses
    },

    nameTitles: state => state.selectOptions.nameTitles
  },

  mutations: {
  },
  actions: {
  }
})
