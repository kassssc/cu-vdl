import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
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
            { id: 0,  category: 1,  name: 'CSFV\t(≤ 20 ต.ย.)',   price: 250 },
            { id: 1,  category: 1,  name: 'CSFV\t(> 20 ต.ย.)',   price: 220 },
            { id: 2,  category: 1,  name: 'PRRSV\t(≤ 20 ต.ย.)',  price: 250 },
            { id: 3,  category: 1,  name: 'PRRSV\t(> 20 ต.ย.)',  price: 220 },
            { id: 4,  category: 1,  name: 'ADV\t(≤ 20 ต.ย.)',    price: 160 },
            { id: 5,  category: 1,  name: 'ADV\t(> 20 ต.ย.)',    price: 130 },

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
            { id: 14,  category: 4, name: 'Mycoplasma Gallisepticum (MG) (S)',     price: 45  },
            { id: 15,  category: 4, name: 'Mycoplasma Gallisepticum (MG) (B)',     price: 55  },
            { id: 16,  category: 4, name: 'Mycoplasma Synoviae (MS)',              price: 40  },
            { id: 17,  category: 4, name: 'Infectious Bural Disease (IBD)',        price: 50  },
            { id: 18,  category: 4, name: 'Avian Reovirus',                        price: 50  },
            { id: 19,  category: 4, name: 'Infectious Bronchitis Virus (IBV)',     price: 50  },
            { id: 20,  category: 4, name: 'Chicken Anemia Virus (CAV)',            price: 120 },

            { id: 21,  category: 5, name: 'PRRSV\t(≤ 20 ต.ย.)',                    price: 250 },
            { id: 22,  category: 5, name: 'PRRSV\t(> 20 ต.ย.)',                    price: 230 },
            { id: 23,  category: 5, name: 'Aujeszky\'s Disease\t(≤ 20 ต.ย.)',      price: 120 },
            { id: 24,  category: 5, name: 'Aujeszky\'s Disease\t(> 20 ต.ย.)',      price: 100 },
            { id: 25,  category: 5, name: 'Mycoplasma Hyopneumoniae\t(≤ 20 ต.ย.)', price: 180 },
            { id: 26,  category: 5, name: 'Mycoplasma Hyopneumoniae\t(> 20 ต.ย.)', price: 150 },
            { id: 27,  category: 5, name: 'Porcine Circovirus Type 2 (PCV2)',      price: 200 },

            { id: 28,  category: 6, name: 'Newcastle Disease',                     price: 30  },
            
            { id: 29,  category: 7, name: 'Mycoplasma Gallisepticum (MG)',         price: 45  },
            { id: 30,  category: 7, name: 'Mycoplasma Synoviae (MS)',              price: 50  },
            { id: 31,  category: 7, name: 'Brucellosis\t(≤ 20 ต.ย.)',              price: 30  },
            { id: 32,  category: 7, name: 'Brucellosis\t(> 20 ต.ย.)',              price: 20  },
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
            { id: 53, category: 12,   name: 'Bacterial Identification + Sensivitity Test (Conventional)',       price: 300 },
            { id: 54, category: 12,   name: 'Bacterial Identification + Sensivitity Test (VITEK 2)',            price: 800 },
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
          name: 'ทดสอบต่อไวรัส',
          reportType: 2,
          testInfo: [
            { id: 65, name: 'CSFV (SK6)',            price: 3000 },
            { id: 66, name: 'ADV',                   price: 3000 },
            { id: 67, name: 'PRRSV (US) (MARC145)',  price: 3000 },
            { id: 68, name: 'PRRSV (EU) (MARC145)',  price: 3000 },
            { id: 69, name: 'HP-PRRSV (MARC145)',    price: 3000 },
            { id: 70, name: 'SIV (H1N1) (MDCK)',     price: 3000 },
            { id: 71, name: 'H5N1',                  price: 3000 },
            { id: 72, name: 'NDV',                   price: 3000 },
            { id: 73, name: 'PCV2 (PK15)',           price: 3000 },
          ]
        },
        {
          id: 6,
          name: 'ทดสอบต่อแบคทีเรีย',
          reportType: 2,
          testInfo: [

          ]
        }
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
    downloads: state => {
      return state.data.downloads
    },
    loggedIn: state => {
      return state.loggedIn
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
    }
  },
  mutations: {
    LOG_IN_OUT: (state, payload) => {
      state.loggedIn = payload
    }
  },
  actions: {
    change_lang: (context, lang) => {
      context.commit('UPDATE_LANG', lang)
    },
    loginout: (context, loggedInState) => {
      context.commit('LOG_IN_OUT', loggedInState)
    }
  }
})
