<template>
<div class="pt-5 d-flex flex-column align-items-center mb-4">
  <div class="signup-box d-flex flex-column align-items-start">
    <button class="btn btn-transparent"
            @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />กลับไป
    </button>
    <div class="signup-logo mb-4 align-self-center" />
    <h1 class="mb-4 align-self-center">
      ขั้นตอนการสมัครสมาชิก
    </h1>

    <div class="w-100 d-flex flex-column align-items-center">
      <div class="questionaire-form">
        <ol>
          <li>ส่งข้อมูลดังนี้ทางอีเมลมาที่ <span class="text-primary email-box">cuvdl.thailand@gmail.com</span></li>
          <ul>
            <li>ชื่อ-นามสกุล หรือ ชื่อ ฟาร์ม/องค์กร ที่ท่านเป็นตัวแทน</li>
            <h6 class="text-muted my-2 mr-5">หากท่านต้องการให้ออก Report ผลการทดสอบเป็นภาษาอังกฤษ กรุณาให้ข้อมูลภาษาอังกฤษมาด้วย</h6>
            <li>อีเมล (ใช้ในการ login และแจ้งเตือน)</li>
            <li>เบอร์โทรศัพท์ติดต่อ</li>
          </ul>
          <li>เมื่อทางเราสร้าง Account ให้แล้ว ท่านจะได้รับลิ้งค์ทางอีเมลเพื่อเปิดการใช้งาน Account</li>
          <h6 class="text-muted my-2 mr-5">กรุณาเช็ค Spam, Junk, Trash ในอีเมลในกรณีที่ไม่เห็นอีเมลใน Inbox</h6>
          <li>เมื่อท่านเข้าไปที่ลิ้งค์ ระบบจะให้ท่านตั้งรหัสผ่านให้ Account ของท่าน</li>
          <li>หลังจากท่านตั้งรหัสผ่านแล้ว ท่านจะสามารถ Login เข้าสู่ระบบและทำการส่งตัวอย่างได้ทันที</li>
        </ol>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      creatingEmployeeAccount: false,
      creatingFreelanceAccount: false,
      isFreelance: null,
      orgExist: null,
      employeeSignupForm: {
        userInfo: {
          title: null,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
        },
        orgInfo: {
          name: null,
          addr1: null,
          addr2: null,
          city: null,
          province: null,
          zip: null
        },
        notes: null
      },
      freelanceSignupForm: {
        userInfo: {
          title: null,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
        },
        orgs: [
          {
            orgName: null,
            contactName: null,
            contactInfo: null,
          }
        ],
        notes: null,
      },
      isFreelanceOptions: [
        { id: false, name: 'พนักงานประจำองค์กร' },
        { id: true, name: 'ผู้ส่งตัวอย่าง Freelance' }
      ],
      orgExistOptions: [
        { id: true, name: 'มี Account อยู่แล้ว' },
        { id: false, name: 'ยังไม่มี Account' }
      ]
    }
  },
  methods: {
    submitEmployeeForm () {

    },
    submitFreelanceForm () {

    },
    reset () {
      this.creatingEmployeeAccount = false
      this.creatingFreelanceAccount = false
      this.isFreelance = null
      this.orgExist = null
      this.employeeSignupForm = {
        userInfo: {
          title: null,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
        },
        orgInfo: {
          name: null,
          addr1: null,
          addr2: null,
          city: null,
          province: null,
          zip: null
        },
        notes: null
      }
      this.freelanceSignupForm = {
        userInfo: {
          title: null,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
        },
        orgs: [
          {
            orgName: null,
            contactName: null,
            contactInfo: null,
          }
        ],
        notes: null,
      }
    },
    addOrg () {
      this.freelanceSignupForm.orgs.push({
        orgName: null,
        contactName: null,
        contactInfo: null,
      })
      this.$nextTick( () => {
        this.$scrollTo(
          `#org${this.freelanceSignupForm.orgs.length}`,
          500,
          { container: '#orgs-container' }
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-logo {
  @include logo;
  width: 150px;
  height: 150px;
}
.org-row:not(:last-child) {
  border-bottom: 1px solid $accent;
}
.email-box {
  border-radius: $border-radius;
  background: $accent-light;
  padding: .25em .7em;
  margin-left: .5em;
}
.questionaire-form {
  width: 600px;
}
ol {
  font-weight: bold;
  font-size: 1.5rem;
  li {
    &::marker {
      color: $primary;
      font-size: 1.3em;
    }
    margin: .5em 0;
  }
}
ul {
  list-style-type: circle;
  padding-left: 3em;
  margin: 1em 0;
  font-weight: bold;
  font-size: 1.3rem;
}
</style>