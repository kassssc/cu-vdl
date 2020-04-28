const auth = {
  state: {
    loggedIn: true,
    user: {
      id: 1,
      accountType: 0, // 0: CU employee, 1: employee submitter, 2: freelance
      org: 1,
      customerList: [],
      firstName: 'สมควร',
      lastName: 'สมสกุล',
      email: 'mr.somkuan@gmail.com',
      phone: '081-234-5678',
      nationalId: null
    },
    accountTypes: {
      0: 'Admin จุฬาฯ',
      1: 'ผู้ส่งตัวอย่าง พนักงานประจำ',
      2: 'ผู้ส่งตัวอย่าง Freelance'
    },
    DEV_mocks: {
      users: {
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
    },
  },

  getters: {
    loggedIn: state => {
      return state.loggedIn
    },
    user: state => {
      return state.user
    },
    userIsCU: state => {
      return state.user.accountType === 0
    },
    userIsEmployee: state => {
      return state.user.accountType === 1
    },
    userIsFreelance: state => {
      return state.user.accountType === 2
    },
    accountTypes: state => {
      return state.accountTypes
    }
  },

  mutations: {
    LOGOUT: state => {
      state.user = { accountType: -1 }
      state.loggedIn = false
    },
    LOGIN_USER: (state, payload) => {
      state.user = state.DEV_mocks.users[payload]
      state.loggedIn = true
    }
  },

  actions: {
    loginAsType: (context, accType) => {
      context.commit('LOGIN_USER', accType)
    },
    logout: context => {
      context.commit('LOGOUT')
    }
  }
}

export default auth