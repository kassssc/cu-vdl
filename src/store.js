import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    DEV_usermocks: {
      0: {
        id: 0,
        accountType: 0,
        org: 0,
        customerList: [],
        firstName: 'สมฤทธิ์',
        lastName: 'สมอิทฤทธิ์',
        email: 'mr.somrit@gmail.com',
        phone: '089-898-9898',
        nationalId: null
      },
      1: {
        id: 1,
        accountType: 1,
        org: 1,
        customerList: [],
        firstName: 'สมควร',
        lastName: 'สมสกุล',
        email: 'mr.somkuan@gmail.com',
        phone: '081-234-5678',
        nationalId: null
      },
      2: {
        id: 2,
        accountType: 2,
        org: null,
        customerList: [],
        firstName: 'สมเดช',
        lastName: 'สมวงศ์สกุล',
        email: 'mr.somdej@gmail.com',
        phone: '087-777-8888',
        nationalId: null
      }
    },
    types: {
      accountTypes: {
        0: 'Admin จุฬาฯ',
        1: 'ผู้ส่งตัวอย่าง พนักงานประจำ',
        2: 'ผู้ส่งตัวอย่าง Freelance'
      },
      requestTypes: [
        { id: 1, key: 'S', name: 'คำขอแก้ไขการส่งตัวอย่าง' },
        { id: 2, key: 'M', name: 'คำขอสมัครสมาชิก' },
        { id: 3, key: 'A', name: 'คำขอเพิ่มตัวแทนส่งตัวอย่าง' },
        { id: 4, key: 'O', name: 'คำขอเป็นตัวแทนองค์กร' },
        { id: 5, key: 'X', name: 'คำขออื่นๆ' },
      ],
      requestStatuses: [
        { id: 1, name: 'รอการตอบรับ'},
        { id: 2, name: 'รับคำขอ'},
        { id: 3, name: 'ปฏิเสธคำขอ'},
      ]
    },
    auth: {
      loggedIn: true,
      accountType: 1, // 0: CU employee, 1: employee submitter, 2: freelance
    },
    user: {
      id: 1,
      accountType: 1,
      org: 1,
      customerList: [],
      firstName: 'สมควร',
      lastName: 'สมสกุล',
      email: 'mr.somkuan@gmail.com',
      phone: '081-234-5678',
      nationalId: null
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
    submission: {
      reportTypes: [
        { id: 1,  name: 'การตรวจทั่วไป' },
        { id: 2,  name: 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ' }
      ],
      tests: [
        {
          id: 1,
          name: 'ไวรัสวิทยา',
          reportType: 1,
          testInfo: [
            { id: 0,  category: 1,  name: 'CSFV',   price: 250,  max: 20, constraint: '(≤ 20 ต.ย.)' },
            { id: 1,  category: 1,  name: 'CSFV',   price: 220,  min: 21, constraint: '(> 20 ต.ย.)' },
            { id: 2,  category: 1,  name: 'PRRSV',  price: 250,  max: 20, constraint: '(≤ 20 ต.ย.)' },
            { id: 3,  category: 1,  name: 'PRRSV',  price: 220,  min: 21, constraint: '(> 20 ต.ย.)' },
            { id: 4,  category: 1,  name: 'ADV',    price: 160,  max: 20, constraint: '(≤ 20 ต.ย.)' },
            { id: 5,  category: 1,  name: 'ADV',    price: 130,  min: 21, constraint: '(> 20 ต.ย.)' },

            { id: 6,  category: 2,  name: 'CSFV',                price: 2000 },
            { id: 7,  category: 2,  name: 'ADV',                 price: 2000 },
            { id: 8,  category: 2,  name: 'PRRSV',               price: 2000 },
            { id: 9,  category: 2,  name: 'HP-PRRSV',            price: 2000 },

            { id: 10, category: 3,  name: 'CSFV',                price: 4000 },
            { id: 11, category: 3,  name: 'ADV',                 price: 4000 },
            { id: 12, category: 3,  name: 'PRRSV',               price: 4000 },
            { id: 13, category: 3,  name: 'HP-PRRSV',            price: 4000 },
          ],
          testCategories: [
            { id: 1,  name: 'Serum Neutralization' },
            { id: 2,  name: 'Virus Isolation'      },
            { id: 3,  name: 'Vaccine Titration'    },
          ]
        },
        {
          id: 2,
          name: 'ซีรั่มวิทยา',
          reportType: 1,
          testInfo: [
            { id: 14,  category: 4, name: 'Mycoplasma Gallisepticum (MG) (S)',  price: 45  },
            { id: 15,  category: 4, name: 'Mycoplasma Gallisepticum (MG) (B)',  price: 55  },
            { id: 16,  category: 4, name: 'Mycoplasma Synoviae (MS)',           price: 40  },
            { id: 17,  category: 4, name: 'Infectious Bural Disease (IBD)',     price: 50  },
            { id: 18,  category: 4, name: 'Avian Reovirus',                     price: 50  },
            { id: 19,  category: 4, name: 'Infectious Bronchitis Virus (IBV)',  price: 50  },
            { id: 20,  category: 4, name: 'Chicken Anemia Virus (CAV)',         price: 120 },

            { id: 21,  category: 5, name: 'PRRSV',                              price: 250, max: 20, constraint: '(≤ 20 ต.ย.)' },
            { id: 22,  category: 5, name: 'PRRSV',                              price: 230, min: 21, constraint: '(> 20 ต.ย.)' },
            { id: 23,  category: 5, name: 'Aujeszky\'s Disease',                price: 120, max: 20, constraint: '(≤ 20 ต.ย.)' },
            { id: 24,  category: 5, name: 'Aujeszky\'s Disease',                price: 100, min: 21, constraint: '(> 20 ต.ย.)' },
            { id: 25,  category: 5, name: 'Mycoplasma Hyopneumoniae',           price: 180, max: 20, constraint: '(≤ 20 ต.ย.)' },
            { id: 26,  category: 5, name: 'Mycoplasma Hyopneumoniae',           price: 150, min: 21, constraint: '(> 20 ต.ย.)' },
            { id: 27,  category: 5, name: 'Porcine Circovirus Type 2 (PCV2)',   price: 200 },

            { id: 28,  category: 6, name: 'Newcastle Disease',                  price: 30  },
            
            { id: 29,  category: 7, name: 'Mycoplasma Gallisepticum (MG)',      price: 45  },
            { id: 30,  category: 7, name: 'Mycoplasma Synoviae (MS)',           price: 50  },
            { id: 31,  category: 7, name: 'Brucellosis',                        price: 30, max: 20, constraint: '(≤ 20 ต.ย.)' },
            { id: 32,  category: 7, name: 'Brucellosis',                        price: 20, min: 21, constraint: '(> 20 ต.ย.)' },
          ],
          testCategories: [
            { id: 4,  name: 'ELISA ไก่'  },
            { id: 5,  name: 'ELISA สุกร' },
            { id: 6,  name: 'HI'        },
            { id: 7,  name: 'RPT'       },
          ]
        },
        {
          id: 3,
          name: 'อนูชีววิทยา',
          reportType: 1,
          testInfo: [
            { id: 33,  category: 8,   name: 'Classical Swine Fever Virus (CSFV)',             price: 1000 },
            { id: 34,  category: 8,   name: 'Leptospira spp. (Pathegenic strains)',           price: 1000 },
            { id: 35,  category: 8,   name: 'Mycoplasma Hyopneumoniae',                       price: 1000 },
            { id: 36,  category: 8,   name: 'Porcine Circovirus type 2 (PCV2)',               price: 1000 },
            { id: 37,  category: 8,   name: 'Porcine Parvovirus (PPV)',                       price: 1000 },
            { id: 38,  category: 8,   name: 'HP-PRRSV',                                       price: 1000 },
            { id: 39,  category: 8,   name: 'PRRSV',                                          price: 1000 },
            { id: 40,  category: 8,   name: 'Swine Influenzavirus (SI)',                      price: 1000 },
            { id: 41,  category: 8,   name: 'Multiplex_RT PCR (PEDV/TGEV/Group A Rotavirus)', price: 1500 },
            { id: 42,  category: 8,   name: 'Porcine Epidemic Diarrhea Virus (PED)',          price: 1000 },
            { id: 43,  category: 8,   name: 'Transmissible Gastroenteritis (TGE)',            price: 1000 },
            { id: 44,  category: 8,   name: 'Group A Rotavirus',                              price: 1000 },
            { id: 45,  category: 8,   name: 'Multiplex_PCR (B.hyodysenteriae / L.intracellularis / Salmonella spp.)', price: 1500 },
            { id: 46,  category: 8,   name: 'Brachyspira Hyodysenteriae',                     price: 1000 },
            { id: 47,  category: 8,   name: 'Lawsonia Intracellularis',                       price: 1000 },
            { id: 48,  category: 8,   name: 'Salmonella spp.',                                price: 1000 },

            { id: 49,  category: 9,   name: 'Avian Influenza Virus (AI)',                     price: 1000 },
            { id: 50,  category: 9,   name: 'Newcastle Disease Virus (ND)',                   price: 1000 },

            { id: 51,  category: 10,  name: 'Feline Infecticus Peritonitis Virus (FIP)',      price: 1000 },
            { id: 52,  category: 10,  name: 'Leptospira spp. (Pathogenic Strains)',           price: 1000 },
          ],
          testCategories: [
            { id: 8,  name: 'สุกร'    },
            { id: 9,  name: 'สัตว์ปีก'  },
            { id: 10, name: 'สัตว์เล็ก' }
          ]
        },
        {
          id: 4,
          name: 'แบคทีเรีย',
          reportType: 1,
          testInfo: [
            { id: 53, category: 12,   name: 'Bacterial Identification + Sensitivity Test (Conventional)',       price: 300 },
            { id: 54, category: 12,   name: 'Bacterial Identification + Sensitivity Test (VITEK 2)',            price: 800 },
            { id: 55, category: 11,   name: 'Bacterial Identification (Conventional)',                          price: 200 },
            { id: 56, category: 11,   name: 'Bacterial Identification (VITEK 2)',                               price: 400 },
            { id: 57, category: 12,   name: 'Bacterial Identification + Salmonella spp. + Sensitivity Test',    price: 500 },
            { id: 58, category: 12,   name: 'Bacterial Identification + Haemophillus spp. + Sensitivity Test',  price: 500 },
            { id: 59, category: 11,   name: 'Salmonella spp.',                                                  price: 300 },
            { id: 60, category: 11,   name: 'Haemophillus spp.',                                                price: 300 },
            { id: 61, category: 11,   name: 'Total Count',                                                      price: 300 },
            { id: 62, category: 11,   name: 'Coliform Count',                                                   price: 350 },
            { id: 63, category: 11,   name: 'E. Coli Count',                                                    price: 400 },
            { id: 64, category: 11,   name: 'Fungal Identification',                                            price: 300 },
          ],
          testCategories: [
            { id: 11, name: 'งานแบคทีเรีย' },
            { id: 12, name: 'งานที่รวมการทดสอบความไวต่อยาต้าน'},
          ],
          sensitivityTestOptions: [
            {
              name: 'Aminoglycosides Aminocyclitals',
              items: [
                'Gentamycin',
                'Amikacin',
                'Apramycin',
                'Neomycin',
                'Spectinomycin',
                'Streptomycin'
              ]
            },
            {
              name: 'Polymyxins',
              items: [
                'Polymyxin B',
                'Colistin'
              ]
            },
            {
              name: 'Penicilins',
              items: [
                'Penicillin G',
                'Oxacillin',
                'Ampicillin',
                'Amoxycillin',
                'Amoxycillin + Clavulanic Acid',
                'Cloxacillin'
              ]
            },
            {
              name: 'Tetracyclins',
              items: [
                'Tetracycline',
                'Doxycycline',
                'Oxytetracycline'
              ]
            },
            {
              name: 'Cephalosporins',
              items: [
                'Cephalotin',
                'Cephalexin',
                'Cephazolin',
                'Cefotaxime',
                'Ceftazidime',
                'Cetriaxone',
                'Cefquinome'
              ]
            },
            {
              name: 'Carbapenems',
              items: [
                'Imipenem',
                'Meropenem'
              ]
            },
            {
              name: 'Fluroquinolones',
              items: [
                'Oxolinic Acid',
                'Enrofloxacin',
                'Ciprofloxacin',
                'Norfloxacin'
              ]
            },
            {
              name: 'Macrolides',
              items: [
                'Erythromycin',
                'Tylosin'
              ]
            },
            {
              name: 'Lincosarnides',
              items: [
                'Clindamycin',
                'Lincomycin'
              ]
            },
            {
              name: 'Miscellaneous',
              items: [
                'Bacitracin',
                'Chloramphenicol',
                'Furazolidone',
                'Metronidazone',
                'Mupirocin',
                'Nitrofurantoin',
                'Sulfameth + Trimethoprim'
              ]
            },
          ]
        },
        {
          id: 5,
          name: 'ไวรัส',
          reportType: 2,
          testInfo: [
            { id: 66, name: 'ADV [SK6]',             cellName: '[SK6]',     price: 3000 },
            { id: 65, name: 'CSFV [SK6]',            cellName: '[SK6]',     price: 3000 },
            { id: 67, name: 'PRRSV (US) [MARC145]',  cellName: '[MARC145]', price: 3000 },
            { id: 68, name: 'PRRSV (EU) [MARC145]',  cellName: '[MARC145]', price: 3000 },
            { id: 69, name: 'HP-PRRSV [MARC145]',    cellName: '[MARC145]', price: 3000 },
            { id: 70, name: 'SIV (H1N1) [MDCK]',     cellName: '[MDCK]',    price: 3000 },
            { id: 71, name: 'H5N1 [EGG]',            cellName: '[EGG]',     price: 10000 },
            { id: 72, name: 'NDV [EGG]',             cellName: '[EGG]',     price: 3000 },
            { id: 73, name: 'PCV2 [PK15]',           cellName: '[PK15]',    price: 3000 },
          ]
        },
        {
          id: 6,
          name: 'แบคทีเรีย',
          reportType: 2,
          testInfo: [

          ]
        }
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
    loggedIn: state => {
      return state.auth.loggedIn
    },
    reportTypes: state => {
      return state.submission.reportTypes
    },
    tests: state => reportTypeId => {
      return state.submission.tests.filter( t => t.reportType === reportTypeId )
    },
    testType: state => testTypeId => {
      return state.submission.tests.find( t => t.id === testTypeId )
    },
    testCategory: state => (testTypeId, categoryId) => {
      return state.submission.tests
        .find( t => t.id === testTypeId ).testInfo
        .filter( t => t.category === categoryId)
    },
    sensitivityTestIds: state => () => {
      return state.submission.tests
        .find( t => t.id === 4 ).testInfo
        .filter( t => t.category === 12)
        .map( t => t.id)
    },

    user: state => {
      return state.user
    },
    org: state => {
      return state.org
    },

    userIsCU: state => {
      return state.auth.accountType === 0
    },
    userIsEmployee: state => {
      return state.auth.accountType === 1
    },
    userIsFreelance: state => {
      return state.auth.accountType === 2
    },

    accountTypes: state => {
      return state.types.accountTypes
    },
    requestTypes: state => {
      return state.types.requestTypes
    },
    requestStatuses: state => {
      return state.types.requestStatuses
    }
  },
  mutations: {
    LOG_IN_OUT: (state, payload) => {
      state.auth.loggedIn = payload
    },
    ACC_TYPE: (state, payload) => {
      state.auth.accountType = payload
    },
    USER: (state, payload) => {
      state.user = state.DEV_usermocks[payload]
    }
  },
  actions: {
    loginout: (context, loggedInState) => {
      context.commit('LOG_IN_OUT', loggedInState)
      context.commit('ACC_TYPE', null)
    },
    loginAsType: (context, accType) => {
      context.commit('LOG_IN_OUT', true)
      context.commit('ACC_TYPE', accType)
      context.commit('USER', accType)
    }
  }
})
