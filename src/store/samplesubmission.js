const state = {
  reportTypes: [
    { id: 1,  name: 'การตรวจทั่วไป' },
    { id: 2,  name: 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ' }
  ],
  submissionTypeData: {
    1: { label: 'การตรวจทั่วไป',           color: 'teal' },
    2: { label: 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ', color: 'blue' }
  },
  generalTests: [
    {
      id: 1,
      name: 'ไวรัสวิทยา',
      testInfo: [
        { id: 0,  group: 1,  name: 'CSFV',   price: 250,  max: 20, constraint: '(≤ 20 ต.ย.)' },
        { id: 1,  group: 1,  name: 'CSFV',   price: 220,  min: 21, constraint: '(> 20 ต.ย.)' },
        { id: 2,  group: 1,  name: 'PRRSV',  price: 250,  max: 20, constraint: '(≤ 20 ต.ย.)' },
        { id: 3,  group: 1,  name: 'PRRSV',  price: 220,  min: 21, constraint: '(> 20 ต.ย.)' },
        { id: 4,  group: 1,  name: 'ADV',    price: 160,  max: 20, constraint: '(≤ 20 ต.ย.)' },
        { id: 5,  group: 1,  name: 'ADV',    price: 130,  min: 21, constraint: '(> 20 ต.ย.)' },

        { id: 6,  group: 2,  name: 'CSFV',      price: 2000 },
        { id: 7,  group: 2,  name: 'ADV',       price: 2000 },
        { id: 8,  group: 2,  name: 'PRRSV',     price: 2000 },
        { id: 9,  group: 2,  name: 'HP-PRRSV',  price: 2000 },

        { id: 10, group: 3,  name: 'CSFV',      price: 4000 },
        { id: 11, group: 3,  name: 'ADV',       price: 4000 },
        { id: 12, group: 3,  name: 'PRRSV',     price: 4000 },
        { id: 13, group: 3,  name: 'HP-PRRSV',  price: 4000 },
      ],
      testGroups: [
        { id: 1,  name: 'Serum Neutralization' },
        { id: 2,  name: 'Virus Isolation'      },
        { id: 3,  name: 'Vaccine Titration'    },
      ]
    },
    {
      id: 2,
      name: 'ซีรั่มวิทยา',
      testInfo: [
        { id: 14,  group: 4, name: 'Mycoplasma Gallisepticum (MG) (S)',  price: 45  },
        { id: 15,  group: 4, name: 'Mycoplasma Gallisepticum (MG) (B)',  price: 55  },
        { id: 16,  group: 4, name: 'Mycoplasma Synoviae (MS)',           price: 40  },
        { id: 17,  group: 4, name: 'Infectious Bural Disease (IBD)',     price: 50  },
        { id: 18,  group: 4, name: 'Avian Reovirus',                     price: 50  },
        { id: 19,  group: 4, name: 'Infectious Bronchitis Virus (IBV)',  price: 50  },
        { id: 20,  group: 4, name: 'Chicken Anemia Virus (CAV)',         price: 120 },

        { id: 21,  group: 5, name: 'PRRSV',                              price: 250, max: 20, constraint: '(≤ 20 ต.ย.)' },
        { id: 22,  group: 5, name: 'PRRSV',                              price: 230, min: 21, constraint: '(> 20 ต.ย.)' },
        { id: 23,  group: 5, name: 'Aujeszky\'s Disease',                price: 120, max: 20, constraint: '(≤ 20 ต.ย.)' },
        { id: 24,  group: 5, name: 'Aujeszky\'s Disease',                price: 100, min: 21, constraint: '(> 20 ต.ย.)' },
        { id: 25,  group: 5, name: 'Mycoplasma Hyopneumoniae',           price: 180, max: 20, constraint: '(≤ 20 ต.ย.)' },
        { id: 26,  group: 5, name: 'Mycoplasma Hyopneumoniae',           price: 150, min: 21, constraint: '(> 20 ต.ย.)' },
        { id: 27,  group: 5, name: 'Porcine Circovirus Type 2 (PCV2)',   price: 200 },

        { id: 28,  group: 6, name: 'Newcastle Disease',                  price: 30  },
        
        { id: 29,  group: 7, name: 'Mycoplasma Gallisepticum (MG)',      price: 45  },
        { id: 30,  group: 7, name: 'Mycoplasma Synoviae (MS)',           price: 50  },
        { id: 31,  group: 7, name: 'Brucellosis',                        price: 30, max: 20, constraint: '(≤ 20 ต.ย.)' },
        { id: 32,  group: 7, name: 'Brucellosis',                        price: 20, min: 21, constraint: '(> 20 ต.ย.)' },
      ],
      testGroups: [
        { id: 4,  name: 'ELISA ไก่'  },
        { id: 5,  name: 'ELISA สุกร' },
        { id: 6,  name: 'HI'        },
        { id: 7,  name: 'RPT'       },
      ]
    },
    {
      id: 3,
      name: 'อนูชีววิทยา',
      testInfo: [
        { id: 33,  group: 8,   name: 'Classical Swine Fever Virus (CSFV)',             price: 1000 },
        { id: 34,  group: 8,   name: 'Leptospira spp. (Pathegenic strains)',           price: 1000 },
        { id: 35,  group: 8,   name: 'Mycoplasma Hyopneumoniae',                       price: 1000 },
        { id: 36,  group: 8,   name: 'Porcine Circovirus type 2 (PCV2)',               price: 1000 },
        { id: 37,  group: 8,   name: 'Porcine Parvovirus (PPV)',                       price: 1000 },
        { id: 38,  group: 8,   name: 'HP-PRRSV',                                       price: 1000 },
        { id: 39,  group: 8,   name: 'PRRSV',                                          price: 1000 },
        { id: 40,  group: 8,   name: 'Swine Influenzavirus (SI)',                      price: 1000 },
        { id: 41,  group: 8,   name: 'Multiplex_RT PCR (PEDV/TGEV/Group A Rotavirus)', price: 1500 },
        { id: 42,  group: 8,   name: 'Porcine Epidemic Diarrhea Virus (PED)',          price: 1000 },
        { id: 43,  group: 8,   name: 'Transmissible Gastroenteritis (TGE)',            price: 1000 },
        { id: 44,  group: 8,   name: 'Group A Rotavirus',                              price: 1000 },
        { id: 45,  group: 8,   name: 'Multiplex_PCR (B.hyodysenteriae / L.intracellularis / Salmonella spp.)', price: 1500 },
        { id: 46,  group: 8,   name: 'Brachyspira Hyodysenteriae',                     price: 1000 },
        { id: 47,  group: 8,   name: 'Lawsonia Intracellularis',                       price: 1000 },
        { id: 48,  group: 8,   name: 'Salmonella spp.',                                price: 1000 },

        { id: 49,  group: 9,   name: 'Avian Influenza Virus (AI)',                     price: 1000 },
        { id: 50,  group: 9,   name: 'Newcastle Disease Virus (ND)',                   price: 1000 },

        { id: 51,  group: 10,  name: 'Feline Infecticus Peritonitis Virus (FIP)',      price: 1000 },
        { id: 52,  group: 10,  name: 'Leptospira spp. (Pathogenic Strains)',           price: 1000 },
      ],
      testGroups: [
        { id: 8,  name: 'สุกร'    },
        { id: 9,  name: 'สัตว์ปีก'  },
        { id: 10, name: 'สัตว์เล็ก' }
      ]
    },
    {
      id: 4,
      name: 'แบคทีเรีย',
      testInfo: [
        { id: 53, group: 12,   name: 'Bacterial Identification + Sensitivity Test (Conventional)',       price: 300 },
        { id: 54, group: 12,   name: 'Bacterial Identification + Sensitivity Test (VITEK 2)',            price: 800 },
        { id: 55, group: 11,   name: 'Bacterial Identification (Conventional)',                          price: 200 },
        { id: 56, group: 11,   name: 'Bacterial Identification (VITEK 2)',                               price: 400 },
        { id: 57, group: 12,   name: 'Bacterial Identification + Salmonella spp. + Sensitivity Test',    price: 500 },
        { id: 58, group: 12,   name: 'Bacterial Identification + Haemophillus spp. + Sensitivity Test',  price: 500 },
        { id: 59, group: 11,   name: 'Salmonella spp.',                                                  price: 300 },
        { id: 60, group: 11,   name: 'Haemophillus spp.',                                                price: 300 },
        { id: 61, group: 11,   name: 'Total Count',                                                      price: 300 },
        { id: 62, group: 11,   name: 'Coliform Count',                                                   price: 350 },
        { id: 63, group: 11,   name: 'E. Coli Count',                                                    price: 400 },
        { id: 64, group: 11,   name: 'Fungal Identification',                                            price: 300 },
      ],
      testGroups: [
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
    }
  ],
  disinfectantTests: [
    {
      id: 5,
      name: 'ไวรัส',
      testInfo: [
        { id: 66, name: 'ADV [SK6]',             cellName: '[SK6]',     price: 3000   },
        { id: 65, name: 'CSFV [SK6]',            cellName: '[SK6]',     price: 3000   },
        { id: 67, name: 'PRRSV (US) [MARC145]',  cellName: '[MARC145]', price: 3000   },
        { id: 68, name: 'PRRSV (EU) [MARC145]',  cellName: '[MARC145]', price: 3000   },
        { id: 69, name: 'HP-PRRSV [MARC145]',    cellName: '[MARC145]', price: 3000   },
        { id: 70, name: 'SIV (H1N1) [MDCK]',     cellName: '[MDCK]',    price: 3000   },
        { id: 71, name: 'H5N1 [EGG]',            cellName: '[EGG]',     price: 10000  },
        { id: 72, name: 'NDV [EGG]',             cellName: '[EGG]',     price: 3000   },
        { id: 73, name: 'PCV2 [PK15]',           cellName: '[PK15]',    price: 3000   },
      ]
    },
    {
      id: 6,
      name: 'แบคทีเรีย'
    }
  ],
  mockSubmission: {
    id: 123456,
    type: 1,
    submitterId: 1,
    submitterName: 'นายสมควร สมสกุล',
    submitDate: '05/05/2020',
    orgId: 1,
    notifications: {
      email: false,
      phone: true
    },
    sampleInfo: {
      sampleTakenDate: '01/05/2020',
      sampleType: 'เลือด',
      animalType: 'กระต่าย',
      animalSpecies: null,
      animalAge: '2 เดือน',
      animalCount: 125,
      illness: null,
      vaccinations: null,
    },
    reportLang: null,
    batches: [
      {
        testType: 1,
        sampleCount: 6,
        totalPrice: 25500,
        tests: {
          0: true,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: true,
          8: false,
          9: true,
          10: false,
          11: false,
          12: true,
          13: false
        },
        samples: [
          {
            sampleId: 'A1',
            extraInfo: null
          },
          {
            sampleId: 'A2',
            extraInfo: 'สัตว์มีไข้'
          },
          {
            sampleId: 'A3',
            extraInfo: null
          },
          {
            sampleId: 'A4',
            extraInfo: 'สีเลือดมีความผิดปกติ'
          },
          {
            sampleId: 'A5',
            extraInfo: null
          },
          {
            sampleId: 'A6',
            extraInfo: null
          }
        ],
        customTests: [],
        sensitivityTests: null
      }
    ]
  }
}

const getters = {
  reportTypes: state => {
    return state.reportTypes
  },
  submissionTypeData: state => {
    return state.submissionTypeData
  },
  generalTests: state => {
    return state.generalTests
  },
  disinfectantTests: state => {
    return state.disinfectantTests
  },
  disinfectantTestCategory: state => category => {
    return state.disinfectantTests.find( t => t.id === category).testInfo
  },
  sensitivityTestIds: state => () => {
    return state.generalTests
      .find( t => t.id === 4 ).testInfo
      .filter( t => t.group === 12)
      .map( t => t.id)
  },
  mockSubmission: state => {
    return state.mockSubmission
  }
}

export default {
  state,
  getters
}