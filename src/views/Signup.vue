<template>
<div class="pt-5 d-flex flex-column align-items-center mb-4">
  <div class="signup-box d-flex flex-column align-items-start">
    <button class="btn btn-transparent"
            @click="$router.go(-1)">
      <i class="fas fa-chevron-left mr-2" />
      กลับไป
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
            <FormInlineSelect
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
              <FormInlineSelect
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

        <div class="row no-gutters mb-4">
          <div class="col-3 pt-2">
            <h4>ข้อมูลของท่าน</h4>
          </div>
          <div class="col-9">
            <div class="form-row">
              <FormSelect
                class="col-2 mb-2 d-flex align-items-end"
                :clearable="false"
                :searchable="false"
                :options="nameTitles" />
              <FormInput
                class="col-4 mb-2"
                type="text"
                label="ชื่อจริง"
                required
                v-model="employeeSignupForm.userInfo.firstName" />
              <FormInput
                class="col-6 mb-2"
                type="text"
                label="นามสกุล"
                required
                v-model="employeeSignupForm.userInfo.lastName" />
              <FormInput
                class="col-6 mb-2"
                type="text"
                label="อีเมล"
                required
                v-model="employeeSignupForm.userInfo.email" />
              <FormInput
                class="col-6 mb-2"
                type="number"
                label="หมายเลขโทรศัพท์"
                required
                v-model="employeeSignupForm.userInfo.phone" />
            </div>    
          </div>
        </div>

        <div class="row no-gutters mb-4">
          <div class="col-3 pt-2">
            <h4>ข้อมูลที่อยู่องค์กร</h4>
          </div>
          <div class="col-9">
            <div class="form-row">
              <FormInput
                class="col-12 mb-2"
                type="text"
                label="ชื่อองค์กร"
                required
                v-model="employeeSignupForm.userInfo.name" />
              <FormInput
                class="col-12 mb-2"
                type="text"
                label="เลขที่ ซอย ถนน"
                required
                v-model="employeeSignupForm.userInfo.addr1" />
              <FormInput
                class="col-12 mb-2"
                type="text"
                label="แขวง เขต / ตำบล อำเภอ"
                required
                v-model="employeeSignupForm.userInfo.addr2" />
              <FormInput
                class="col-4 mb-2"
                type="text"
                label="เมือง"
                required
                v-model="employeeSignupForm.userInfo.city" />
              <FormInput
                class="col-4 mb-2"
                type="text"
                label="จังหวัด"
                required
                v-model="employeeSignupForm.userInfo.province" />
              <FormInput
                class="col-4 mb-2"
                type="number"
                label="รหัสไปรษณีย์"
                required
                v-model="employeeSignupForm.userInfo.zip" />
            </div>
          </div>
        </div>

        <div class="row no-gutters mb-4">
          <div class="col-3 pt-2">
            <h4>อัพโหลดเอกสาร</h4>
          </div>
          <div class="col-9">
            <div class="form-row">
              <FormFileUpload
                class="col-4"
                label="สำเนาบัตรประชาชน"
                required />
              <FormFileUpload
                class="col-4"
                label="ภ.พ.20"
                required />
              <FormFileUpload
                class="col-4"
                label="ใบจดทะเบียนบริษัท"
                required />
            </div>
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>หมายเหตุอื่นๆ</h4>
          </div>
          <FormTextarea
            class="col-9"
            rows="3"
            v-model="employeeSignupForm.notes" />
        </div>

        <div class="row no-gutters">
          <div class="col-3"></div>
          <div class="col-5">
            <button class="btn btn-primary btn-lg btn-block">
              <i class="fas fa-paper-plane btn-inner-icon" /> ส่งแบบฟอร์มขอสมัครสมาชิก
            </button>
          </div>
          <div class="col-4 pl-3">
            <button class="btn btn-secondary btn-lg btn-block"
                    @click="reset()">
              <i class="fas fa-undo-alt btn-inner-icon" /> เริ่มต้นใหม่
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
              <FormSelect
                class="col-2 mb-2 d-flex align-items-end"
                :clearable="false"
                :searchable="false"
                :options="nameTitles" />
              <FormInput
                class="col-4 mb-2"
                type="text"
                label="ชื่อจริง"
                required
                v-model="freelanceSignupForm.userInfo.firstName" />
              <FormInput
                class="col-6 mb-2"
                type="text"
                label="นามสกุล"
                required
                v-model="freelanceSignupForm.userInfo.lastName" />
              <FormInput
                class="col-6 mb-2"
                type="text"
                label="อีเมล"
                required
                v-model="freelanceSignupForm.userInfo.email" />
              <FormInput
                class="col-6 mb-2"
                type="number"
                label="หมายเลขโทรศัพท์"
                required
                v-model="freelanceSignupForm.userInfo.phone" />
            </div>    
          </div>
        </div>

        <div class="row no-gutters mb-2">
          <div class="col-3 pt-2">
            <h4>รายการองค์กร</h4>
          </div>
          <div class="col-9 subcontainer scroll-fade py-2 pl-3">
            <div id="orgs-container" class="scroll-container pr-4 pl-2">
              <div  v-for="(org, idx) in freelanceSignupForm.orgs"
                    :key="idx"
                    :id="`org${idx+1}`"
                    class="form-row org-row position-relative">
                <button v-show="freelanceSignupForm.orgs.length > 1"
                        class="btn btn-x delete-org"
                    @click="freelanceSignupForm.orgs.splice(idx, 1)">
                  <i class="fas fa-times" />
                </button>
                <FormInput
                  class="col-12 mb-2 mt-3"
                  :label="`ชื่อองค์กร #${idx+1}`"
                  type="text"
                  input-class="form-control-sm"
                  v-model="freelanceSignupForm.orgs[idx].orgName" />
                <FormInput
                  class="col-6 mb-3"
                  label="ชื่อ-นามสกุล ผู้ติดต่อ"
                  type="text"
                  input-class="form-control-sm"
                  v-model="freelanceSignupForm.orgs[idx].contactName" />
                <FormInput
                  class="col-6 mb-3"
                  label="เบอร์โทรศัพท์ / อีเมล ผู้ติดต่อ"
                  type="number"
                  input-class="form-control-sm"
                  v-model="freelanceSignupForm.orgs[idx].contactInfo" />
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
            <h4>หมายเหตุอื่นๆ</h4>
          </div>
          <FormTextarea
            class="col-9"
            rows="3"
            type="text"
            v-model="freelanceSignupForm.notes" />
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
  width: 850px;
}
#orgs-container {
  max-height: 450px;
}
.btn.btn-x.delete-org {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'signup',
  computed: {
    ...mapGetters(['nameTitles'])
  },
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
        userInfo: {
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
    submit () {

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