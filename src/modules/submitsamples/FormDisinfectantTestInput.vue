<template>
<div class="form-row subcontainer">
  <template v-if="isVirus || testCount < maxBacteria">
    <div class="col-12 d-flex justify-content-between mb-1">
      <h4 class="mr-3">{{ `เพิ่ม${isVirus? 'ไวรัส' : 'แบคทีเรีย'}เพื่อทดสอบ`}}</h4>
      <button v-if="isCP"
              class="btn btn-success"
              @click="useCP()">
        ใช้ Default CP Protocol
      </button>
    </div>
    <FormSelect
      v-if="isVirus"
      class="mb-0 col"
      label="name"
      form-label="เลือกไวรัส"
      placeholder="เลือก..."
      :clearable="false"
      :searchable="false"
      :options="disinfectantVirusList"
      :get-option-label="option => option.display_name"
      v-model="virus" />
    <FormInput
      v-else
      class="mb-0 col"
      label="ชื่อแบคทีเรีย"
      type="text"
      v-model.trim="bacteriaName" />
    <!-- <div class="col">
      <div class="form-group mb-0">
        <label>ระดับความเข้มข้น</label>
      </div>
      <FormInput
        v-for="(dilution, idx) of dilutions"
        :key="idx"
        class="mb-2"
        placeholder="undiluted, 1:200, 1:400, 20%"
        type="text"
        @focus="$event.target.select()"
        v-model="dilutions[idx]" />
      <button class="btn btn-block btn-sm btn-primary">
        เพิ่มระดับความเข้มข้น
      </button>
    </div>
    <div class="col">
      <div class="form-group mb-0">
        <label>ระยะสัมผัสเชื้อ</label>
      </div>
      <div  v-for="(contactTime, idx) of contactTimes"
            :key="idx"
            class="form-row">
        <FormInput
          class="col-8 mb-2"
          input-class="text-right"
          type="text"
          @focus="$event.target.select()"
          v-model="contactTimes[idx]" />
        <FormSelect
          class="col-4 pl-0 mb-2"
          label="name"
          placeholder="เลือก..."
          :clearable="false"
          :searchable="false"
          :options="contactTimeUnitOptions"
          v-model="virus" />
      </div>
      <button class="btn btn-block btn-sm btn-primary">
        เพิ่มระยะสัมผัสเชื้อ
      </button>        
    </div>
    <div class="col-12 mt-3">
      <button class="btn btn-block btn-success">
        เพิ่มรายการทดสอบ
      </button>
    </div> -->
    <div v-if="isCP" class="w-100 mb-3"></div>
    <div class="form-group col">
      <label>ระดับความเข้มข้น</label>
      <input type="text"
              class="form-control pr-4"
              placeholder="ex. undiluted, 1:200, 1:400, 20%"
              v-model="dilutions"
              @blur="onDilutionsBlur()"
              @keyup.enter="parseOutput()">
      <div class="hint">
        <i class="fas fa-question color-text-light"></i>
        <div class="hint-box">
          <h5>
            ให้ใส่รายการความเข้มข้นทุกระดับที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
            ยกตัวอย่างเช่น
          </h5>
          <h5 class="text-primary">
            undiluted, 1:200, 1:400, 20%
          </h5>
        <h5>
          ระบบจะกรองทุกอย่างที่ไม่ใช่
          <span class="text-primary">"undiluted"</span>
          หรือเลขในรูปแบบ
          <span class="text-primary">x:y</span>
          หรือ
          <span class="text-primary">z%</span>
          ออกโดยอัตโนมัติ
        </h5>
        </div>
      </div>
    </div>
    <div  v-if="isCP"
          class="form-group col">
      <label>ระยะหลังการเจือจาง (วัน)</label>
      <input  type="text"
              placeholder="ex. 3, 7, 10"
              class="form-control pr-4"
              v-model.lazy="dilutionTimes"
              @blur="onDilutionTimesBlur()"
              @keyup.enter="parseOutput()">
      <div class="hint">
        <i class="fas fa-question color-text-light"></i>
        <div class="hint-box">
          <h5>
            ให้ใส่รายการระยะเวลาเจือจางทุกระยะที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
            ยกตัวอย่างเช่น
          </h5>
          <h5 class="text-primary">
            3, 7, 10
          </h5>
          <h5>
            ระบบจะกรองทุกอย่างที่ไม่ใช่เลขออกโดยอัตโนมัติ
          </h5>
        </div>
      </div>
    </div>
    <div class="form-group col">
      <label>ระยะสัมผัสเชื้อ (นาที)</label>
      <input  type="text"
              class="form-control pr-4"
              placeholder="ex. 0.5, 5, 10"
              v-model.lazy="contactTimes"
              @blur="oncontactTimesBlur()"
              @keyup.enter="parseOutput()">
      <div class="hint">
        <i class="fas fa-question color-text-light"></i>
        <div class="hint-box">
          <h5>
            ให้ใส่รายการระยะเวลาสัมผัสเชื้อทุกเวลาที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
            ยกตัวอย่างเช่น
          </h5>
          <h5 class="text-primary">
            0.5, 5, 10
          </h5>
          <h5>
            ระบบจะกรองทุกอย่างที่ไม่ใช่เลขหรือเลขทศนิยมออกโดยอัตโนมัติ
          </h5>
        </div>
      </div>
    </div>
    <div class="form-group col-1 align-items-end d-flex">
      <button class="btn btn-primary btn-block"
              :disabled="isVirus && !validFormVirus() || isCP && !validFormBacteria()"
              @click="parseOutput()">
        เพิ่ม
      </button>
    </div>
    <div v-if="!isVirus" class="form-group col-12 d-flex mb-0">
      <h4 class="text-medium">
        (สามารถเพิ่มแบคทีเรียได้อีก
        <span class="text-primary mx-1">{{ maxBacteria - testCount }}</span>
        รายการ)
      </h4>
    </div>
  </template>
  <div v-else class="form-group col-12 mb-0">
    <h3 class="text-medium">ท่านได้เพิ่มรายการแบคทีเรียครบถึง 5 รายการแล้ว</h3>
  </div>
</div>
</template>

<script>
import uniq from 'lodash/uniq'
import { DISINFECTANT_TEST_METHODS } from '@/graphql/tests'

export default {
  name: 'form-disinfectant-test-input',
  props: {
    testType: {
      type: String,
      required: true
    },
    testCount: {
      type: Number,
      default: 0
    }
  },
  watch: {
    testType () {
      this.virus = ''
      this.bacteriaName = ''
      this.dilutions = ''
      this.contactTimes = ''
      this.dilutionTimes = ''
    }
  },
  data () {
    return {
      virus: '',
      bacteriaName: '',
      dilutions: '',
      contactTimes: '',
      dilutionTimes: '',
      maxBacteria: 5,
      // dilutions: ['', '', ''],
      // contactTimes: [''],
      // contactTimeUnits: [''],
      // dilutionTimes: [''],
      // contactTimeUnitOptions: [
      //   'วินาที', 'นาที', 'ชั่วโมง'
      // ]
    }
  },
  computed: {
    isVirus () {
      return this.testType === 'ไวรัส'
    },
    isCP () {
      return this.testType === 'CP'
    },
    dilutionArr () {
      return this.process(this.dilutions.toLowerCase())
        .filter( s => /^([1-9]\d*:(0|[1-9]\d*)|([1-9][0-9]?|100)%|undiluted)$/.test(s) )
        // Matches x:y, z%, or undiluted, no 0s, no leading 0s
    },
    contactTimeArr () {
      return this.process(this.contactTimes)
        .filter( s => /^((0|[1-9]\d*)(\.\d*[1-9])?)$/.test(s) )
        //.filter( s => /^((0|[1-9]\d*)(\.\d*[1-9])?(วินาที|นาที))$/.test(s) )
        // Matches x, x.y, no leading and trailing 0s
    },
    dilutionTimeArr () {
      return this.process(this.dilutionTimes)
        .filter( s => /^[1-9]\d*$/.test(s) )
        // Matches x, no leading 0s
    }
  },
  methods: {
    process (str) {
      return uniq(str
        .split(',')
        .map(s => s.trim())
        .filter(s => s)
      )
    },

    onDilutionsBlur () {
      this.dilutions = this.dilutionArr.join(', ')
    },
    oncontactTimesBlur () {
      this.contactTimes = this.contactTimeArr.join(', ')
    },
    onDilutionTimesBlur () {
      this.dilutionTimes = this.dilutionTimeArr.join(', ')
    },

    parseOutput () {
      if (this.testType === 'ไวรัส') {
        this.parseOutputVirus()
      } else if (this.testType === 'แบคทีเรีย') {
        this.parseOutputBacteria()
      } else if (this.testType === 'CP') {
        this.parseOutputCP()
      }
    },

    parseOutputVirus () {
      if (!this.validFormVirus()) return

      const numTests = this.dilutionArr.length * this.contactTimeArr.length
      const price = this.virus.price
      const totalPrice = price * numTests

      const parsedOutput = {}
      parsedOutput[this.virus.test_key] = {
        displayName: this.virus.display_name,
        dilutions: this.dilutionArr,
        contactTimes: this.contactTimeArr,
        cellName: this.virus.cell_name,
        price: price,
        totalPrice: totalPrice,
        numTests: numTests
      }
      this.virus = null
      this.$emit('add', parsedOutput)
    },
    parseOutputBacteria () {
      if (!this.validFormBacteria()) return

      const numTests = this.dilutionArr.length * this.contactTimeArr.length
      const price = 3000
      const totalPrice = price * numTests

      const parsedOutput = {}
      parsedOutput[this.bacteriaName] = {
        displayName: this.bacteriaName,
        dilutions: this.dilutionArr,
        contactTimes: this.contactTimeArr,
        price: price,
        totalPrice: totalPrice,
        numTests: numTests
      }
      this.$emit('add', parsedOutput)
      this.bacteriaName = ''
    },
    parseOutputCP () {
      if (!this.validFormCP()) return

      const numTests = this.dilutionArr.length * this.contactTimeArr.length * this.dilutionTimeArr.length
      const price = 3000
      const totalPrice = price * numTests

      const parsedOutput = {}
      parsedOutput[this.bacteriaName] = {
        displayName: this.bacteriaName,
        dilutions: this.dilutionArr,
        contactTimes: this.contactTimeArr,
        dilutionTimes: this.dilutionTimeArr,
        price: price,
        totalPrice: totalPrice,
        numTests: numTests
      }
      this.$emit('add', parsedOutput)
      this.bacteriaName = ''
    },

    validFormVirus () {
      return (
        this.virus &&
        this.dilutions &&
        this.contactTimes &&
        this.dilutionArr.length > 0 &&
        this.contactTimeArr.length > 0
      )
    },
    validFormBacteria () {
      return (
        this.bacteriaName &&
        this.dilutions &&
        this.contactTimes &&
        this.dilutionArr.length > 0 &&
        this.contactTimeArr.length > 0
      )
    },
    validFormCP () {
      return (
        this.bacteriaName &&
        this.dilutions &&
        this.contactTimes &&
        this.dilutionTimes &&
        this.dilutionArr.length > 0 &&
        this.contactTimeArr.length > 0 &&
        this.dilutionTimeArr.length > 0
      )
    },
    useCP () {
      this.dilutions = '1:200, 1:400'
      this.dilutionTimes = '1, 2, 7'
      this.contactTimes = '0.5, 2, 60'
      this.bacteriaName = 'E.Coli'
      this.parseOutput()
      this.bacteriaName = 'Salmonella'
      this.parseOutput()
      this.dilutions = ''
      this.dilutionTimes = ''
      this.contactTimes = ''
    }
  },
  apollo: {
    disinfectantVirusList: {
      query: DISINFECTANT_TEST_METHODS,
      update: data => data.test_method_disinfectant_virus_get.result,
      skip () {
        return !this.isVirus
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hint-box {
  width: 250px;
  bottom: 43px;
  right: 0px;
  transform-origin: 100% 100%;
}
</style>