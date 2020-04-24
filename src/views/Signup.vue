<template>
<div class="pt-5 d-flex flex-column align-items-center mb-4">
  <div class="signup-box d-flex flex-column align-items-start">
    <button class="btn btn-transparent"
            @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />
      {{ $t(`general.back`) }}
    </button>
    <div class="signup-logo mb-2 align-self-center" />
    <h1 class="text-primary mb-4 align-self-center">
      สมัครสมาชิก
    </h1>

    <div class="w-100 d-flex flex-column align-items-center font-chatthai">
      
      <div  v-if="!creatingEmployeeAccount && !creatingFreelanceAccount"
            class="questionaire-form d-flex flex-column align-items-center">
        <div class="form-row w-100">
          <div class="form-group col-12 mb-2">
            <h4 class="mb-2">
              ท่านต้องการสมัครสมาชิกประเภทไหน ?
            </h4>
            <form-inline-select
              btnClass="btn-lg"
              :options="isFreelanceOptions"
              @change="orgExist = null"
              v-model="isFreelance" />
          </div>
          <div class="form-group d-flex col-12 text-center text-medium">
            <div class="w-50 px-4">
              <h5>
                Account พนักงานประจำ จะผูกมัดกับองค์กรของท่าน และท่านจะมีสิทธิส่งตัวอย่างในนามขององค์กรของท่านเท่านั้น
              </h5>
            </div>
            <div class="w-50 px-4">
              <h5>
                Account Freelance จะไม่ผูกมัดกับองค์กรๆเดียว แต่ท่านสามารถส่งคำขอเป็นตัวแทนของหลายๆองค์กรได้ หากได้รับการอนุมัติ ท่านจะมีสิทธิส่งตัวอย่างในนามขององค์กรที่อนุมัติท่านแล้ว
              </h5>
            </div>
          </div>
        </div>

        <template v-if="isFreelance === false">
          <div class="form-row w-100 mb-4">
            <div class="form-group col-12">
              <h4 class="mb-2">
                องค์กรของท่านมี Account อยู่ในระบบนี้อยู่แล้วหรือไม่ ?
              </h4>
              <form-inline-select
                btnClass="btn-lg"
                :options="orgExistOptions"
                v-model="orgExist" />
            </div>
          </div>

          <div  v-if="orgExist === true"
                class="w-75">
            <h3 class="text-dark mb-2">
              โปรดติดต่อผู้รับผิดชอบในองค์กรของท่านที่มี Account ในระบบของจุฬาฯ อยู่แล้ว 
            </h3>
            <h3 class="text-primary">
              ผู้รับผิดชอบที่มี Account อยู่แล้วจะสามารถสร้าง Account ใหม่ให้ท่านได้ จากภายในระบบ
            </h3>
            <router-link  exact to="/"
                          tag="a"
                          class="btn btn-secondary btn-lg mt-3">
              <i class="fas fa-arrow-left btn-inner-icon"></i> กลับไปยังหน้าหลัก
            </router-link>
          </div>
          <div  v-else-if="orgExist === false"
                class="w-75">
            <h3 class="text-dark mb-2">
              ท่านกำลังจะสร้าง <span class="text-primary">Account พนักงานประจำ</span> เพื่อส่งตัวอย่างในนามขององค์กรที่ยังไม่ได้อยู่ในระบบของ จุฬาฯ
            </h3>
            <h3>
              หากได้รับการอนุมัติ <span class="text-primary">ท่านจะได้รับข้อมูลการล็อคอินผ่านทางอีเมล</span> และองค์กรของท่านจะถูกบันทึกอยู่ในระบบ หลังจากนั้น  ท่านสามารถใช้ Account เพื่อส่งตัวอย่างในนามขององค์กรได้
            </h3>
            <button class="btn btn-primary btn-lg mt-3"
                    @click="creatingEmployeeAccount = true">
              <i class="fas fa-arrow-right btn-inner-icon"></i> ไปยังแบบฟอร์มขอสมัครสมาชิก พนักงานประจำองค์กร
            </button>
          </div>
        </template>

        <div  v-if="isFreelance === true"
              class="w-75">
          <h3 class="text-dark mb-2">
            ท่านกำลังจะสร้าง <span class="text-primary">Account Freelance</span> เพื่อส่งตัวอย่างในนามขององค์กรมากกว่าหนึ่งองค์กร
          </h3>
          <h3 class="text-dark mb-2">
            ท่านจะต้องใส่ <span class="text-primary">รายชื่อองค์กร และข้อมูลผู้ติดต่อของแต่ละองค์กร</span> เพื่อให้ทาง จุฬาฯ ติดต่อและยืนยันว่าท่านเป็นตัวแทนขององค์กรนั้นๆจริง
          </h3>
          <h3 class="text-dark">
            หากได้รับการอนุมัติ <span class="text-primary">ท่านจะได้รับข้อมูลการล็อคอินผ่านทางอีเมล</span> และจะมีสิทธิส่งตัวอย่างในนามขององค์กรที่อนุมัติท่านแล้ว
          </h3>
          <button class="btn btn-primary btn-lg mt-3"
                  @click="creatingFreelanceAccount = true">
            <i class="fas fa-arrow-right btn-inner-icon"></i> ไปยังแบบฟอร์มขอสมัครสมาชิก Freelance
          </button>
        </div>
       

      </div>


      <div  v-if="creatingEmployeeAccount"
            class="info-form">

        <div class="row no-gutters mb-3">
          <div class="col-3"></div>
          <div class="col-9 mb-2 text-medium">
            <h4>
              ท่านกำลังสร้าง <span class="text-primary">Account พนักงานประจำ</span> เพื่อส่งตัวอย่างในนามขององค์กรที่ยังไม่ได้อยู่ในระบบของ จุฬาฯ
            </h4>
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>ข้อมูลของท่าน</h4>
          </div>
          <div class="col-9">
            <div class="form-row">
              <div class="form-group col-6 mb-2">
                <label>
                  ชื่อจริง <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.lazy="employeeSignupForm.userInfo.firstName">
              </div>
              <div class="form-group col-6 mb-2">
                <label>
                  นามสกุล <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="employeeSignupForm.userInfo.lastName">
              </div>
              <div class="form-group col-6">
                <label>
                  อีเมล <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="employeeSignupForm.userInfo.email">
              </div>
              <div class="form-group col-6">
                <label>
                  เบอร์โทรศัพท์ <i class="fas fa-star-of-life" />
                </label>
                <input  type="number"
                        class="form-control"
                        v-model.number="employeeSignupForm.userInfo.phone">
              </div>
              
            </div>    
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>ข้อมูลที่อยู่องค์กร</h4>
          </div>
          <div class="col-9">
            <div class="form-row">
              <div class="form-group col-12 mb-2">
                <label>
                  ชื่อองค์กร <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="employeeSignupForm.orgInfo.name">
              </div>
              <div class="form-group col-12 mb-2">
                <label>
                  เลขที่ ซอย ถนน <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="employeeSignupForm.orgInfo.addr1">
              </div>
              <div class="form-group col-12 mb-2">
                <label>
                  แขวง เขต / ตำบล อำเภอ
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="employeeSignupForm.orgInfo.addr2">
              </div>
              <div class="form-group col-4">
                <label>
                  เมือง <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="employeeSignupForm.orgInfo.city">
              </div>
              <div class="form-group col-4">
                <label>
                  จังหวัด <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="employeeSignupForm.orgInfo.province">
              </div>
              <div class="form-group col-4">
                <label>
                  รหัสไปรษณีย์ <i class="fas fa-star-of-life" />
                </label>
                <input  type="number"
                        class="form-control"
                        v-model.number="employeeSignupForm.orgInfo.zip">
              </div>
            </div>
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>อัพโหลดเอกสาร</h4>
          </div>
          <div class="col-9">
            <div class="form-row">
              <div class="form-group col-4">
                <label>
                  สำเนาบัตรประชาชน <i class="fas fa-star-of-life" />
                </label>
                <form-file-upload />
              </div>
              <div class="form-group col-4">
                <label>
                  ภ.พ.20 <i class="fas fa-star-of-life" />
                </label>
                <form-file-upload />
              </div>
              <div class="form-group col-4">
                <label>
                  ใบจดทะเบียนบริษัท <i class="fas fa-star-of-life" />
                </label>
                <form-file-upload />
              </div>
            </div>
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>อื่นๆ</h4>
          </div>
          <div class="form-group col-9">
            <label>
              หมายเหตุอื่นๆ
            </label>
            <textarea rows="3"
                      class="form-control"
                      v-model.number="employeeSignupForm.notes" />
          </div>
        </div>

        <div class="row no-gutters">
          <div class="col-3"></div>
          <div class="col-5">
            <button class="btn btn-primary btn-lg btn-block">
              <i class="fas fa-paper-plane btn-inner-icon"></i> ส่งแบบฟอร์มขอสมัครสมาชิก
            </button>
          </div>
          <div class="col-4 pl-3">
            <button class="btn btn-secondary btn-lg btn-block"
                @click="reset()">
              <i class="fas fa-undo-alt btn-inner-icon"></i> เริ่มต้นใหม่
            </button>
          </div>
        </div>
      </div>

      <div  v-else-if="creatingFreelanceAccount"
            class="info-form">
        <div class="row no-gutters mb-3">
          <div class="col-3"></div>
          <div class="col-9 mb-2 text-medium">
            <h4>
              ท่านกำลังสร้าง <span class="text-primary">Account Freelance</span> เพื่อส่งตัวอย่างในนามขององค์กรมากกว่าหนึ่งองค์กร
            </h4>
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>ข้อมูลของท่าน</h4>
          </div>
          <div class="col-9">
            <div class="form-row">
              <div class="form-group col-6 mb-2">
                <label>
                  ชื่อจริง <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.lazy="freelanceSignupForm.firstName">
              </div>
              <div class="form-group col-6 mb-2">
                <label>
                  นามสกุล <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="freelanceSignupForm.lastName">
              </div>
              <div class="form-group col-6">
                <label>
                  อีเมล <i class="fas fa-star-of-life" />
                </label>
                <input  type="text"
                        class="form-control"
                        v-model.number="freelanceSignupForm.email">
              </div>
              <div class="form-group col-6">
                <label>
                  เบอร์โทรศัพท์ <i class="fas fa-star-of-life" />
                </label>
                <input  type="number"
                        class="form-control"
                        v-model.number="freelanceSignupForm.phone">
              </div>
            </div>    
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>รายการองค์กร</h4>
          </div>
          <div class="col-9 subcontainer py-2 pl-3">
            <div id="orgs-container" class="pr-4 pl-2">
              <div  v-for="(org, idx) in freelanceSignupForm.orgs"
                    :key="idx"
                    :id="`org${idx+1}`"
                    class="form-row org-row position-relative">
                <button v-show="freelanceSignupForm.orgs.length > 1"
                        class="btn btn-x delete-org"
                    @click="freelanceSignupForm.orgs.splice(idx, 1)">
                  <i class="fas fa-times" />
                </button>
                <div class="form-group col-12 mb-2 mt-3">
                  <label class="mb-0">
                    ชื่อองค์กร #{{ idx+1 }}
                  </label>
                  <input  type="text"
                          class="form-control form-control-sm"
                          v-model.lazy="freelanceSignupForm.orgs[idx].orgName">
                </div>
                <div class="form-group col-6 mb-2">
                  <label class="mb-0">
                    ชื่อ-นามสกุล ผู้ติดต่อ
                  </label>
                  <input  type="text"
                          class="form-control form-control-sm"
                          v-model.lazy="freelanceSignupForm.orgs[idx].contactName">
                </div>
                <div class="form-group col-6 mb-3">
                  <label class="mb-0">
                    เบอร์โทรศัพท์ / อีเมล ผู้ติดต่อ
                  </label>
                  <input  type="text"
                          class="form-control form-control-sm"
                          v-model.number="freelanceSignupForm.orgs[idx].contactInfo">
                </div>
              </div>
            </div>
          </div>

          <div class="col-3"></div>
          <div class="col-3 px-4">
            <button class="btn btn-primary btn-sm btn-block my-3"
                    @click="addOrg()">
              เพิ่มองค์กร
            </button>
          </div>

        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>อื่นๆ</h4>
          </div>
          <div class="form-group col-9">
            <label>
              หมายเหตุอื่นๆ
            </label>
            <textarea rows="2"
                      class="form-control"
                      v-model.number="freelanceSignupForm.notes" />
          </div>
        </div>

        <div class="row no-gutters">
          <div class="col-3"></div>
          <div class="col-5">
            <button class="btn btn-primary btn-lg btn-block">
              <i class="fas fa-paper-plane btn-inner-icon"></i> ส่งแบบฟอร์มขอสมัครสมาชิก
            </button>
          </div>
          <div class="col-4 pl-3">
            <button class="btn btn-secondary btn-lg btn-block"
                    @click="reset()">
              <i class="fas fa-undo-alt btn-inner-icon"></i> เริ่มต้นใหม่
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.signup-logo {
  @include logo;
  width: 150px;
  height: 150px;
}

.org-row:not(:last-child) {
  border-bottom: 1px solid $accent;
}

.questionaire-form {
  width: 700px;
}
.info-form {
  width: 800px;
}
#orgs-container {
  max-height: 450px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, .5);
    box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
}
.btn.btn-x.delete-org {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>

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
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        notes: null,
        orgs: [
          {
            orgName: null,
            contactName: null,
            contactInfo: null,
          }
        ]
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
    submit () {

    },
    reset () {
      this.creatingEmployeeAccount = false
      this.creatingFreelanceAccount = false
      this.isFreelance = null
      this.orgExist = null
      this.employeeSignupForm = {
        userInfo: {
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
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        notes: null,
        orgs: [
          {
            orgName: null,
            contactName: null,
            contactInfo: null,
          }
        ]
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