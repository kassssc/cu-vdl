<template>
<div class="form-row subcontainer">
  <div class="col-12">
    <h4 class="mb-1">เพิ่มรายการทดสอบ</h4>
  </div>
  <div  v-if="testType === 5"
        class="form-group col-4 mb-0">
    <label>
      เลือกไวรัส
    </label>
    <select class="form-control"
            v-model="virusName">
      <option v-for="test in tests"
              :key="test.id"
              :value="test.name">
        {{ test.name }}
      </option>
    </select>
  </div>
  <div  v-else-if="testType === 6"
        class="form-group col-6">
    <label>
      ชื่อแบคทีเรีย
    </label>
    <input  type="text"
            class="form-control"
            v-model.lazy.trim="bacteriaName">
  </div>
  
  <div v-if="testType === 6" class="col-6"></div>
  <div class="form-group col-4 mb-0">
    <label>ระดับความเข้มข้น</label>
    <input type="text"
           class="form-control pr-4"
           placeholder="ex. undiluted, 1:200, 1:400, 20%"
           v-model="dilutions"
           @blur="onDilutionsBlur()"
           @keyup.enter="parseOutput()">
    <div class="hint">
      <i class="fas fa-question color-text-light"></i>
      <div class="hint-container">
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
  <div class="form-group col-3 mb-0">
    <label>ระยะสัมผัสเชื้อ (นาที)</label>
    <input  type="text"
            class="form-control pr-4"
            placeholder="ex. 0.5, 5, 10"
            v-model.lazy="contactTimes"
            @blur="oncontactTimesBlur()"
            @keyup.enter="parseOutput()">
    <div class="hint">
      <i class="fas fa-question color-text-light"></i>
      <div class="hint-container">
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
  <div  v-if="testType === 6"
        class="form-group col-3 mb-0">
    <label>ระยะหลังการเจือจาง (วัน)</label>
    <input  type="text"
            placeholder="ex. 3, 7, 10"
            class="form-control pr-4"
            v-model.lazy="dilutionTimes"
            @blur="onDilutionTimesBlur()"
            @keyup.enter="parseOutput()">
    <div class="hint">
      <i class="fas fa-question color-text-light"></i>
      <div class="hint-container">
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
  <div class="form-group col mb-0 align-items-end d-flex">
    <button class="btn btn-primary btn-block"
            :disabled="testType === 5 && !validFormVirus() || testType === 6 && !validFormBacteria()"
            @click="parseOutput()">
      เพิ่ม
    </button>
  </div>
</div>
</template>

<style lang="scss" scoped>
.hint-container {
  width: 250px;
  bottom: 43px;
  right: 0px;
  transform-origin: 100% 100%;
}
</style>

<script>
import { uniq } from 'lodash'

export default {
  name: 'form-disinfectant-test-input',
  props: [
    'tests',
    'testType'
  ],
  watch: {
    testType () {
      this.virusName = ''
      this.bacteriaName = ''
      this.dilutions = ''
      this.contactTimes = ''
      this.dilutionTimes = ''
    }
  },
  data () {
    return {
      virusName: '',
      bacteriaName: '',
      dilutions: '',
      contactTimes: '',
      dilutionTimes: ''
    }
  },
  computed: {
    dilutionArr () {
      return this.process(this.dilutions.toLowerCase())
        .filter( s => /^([1-9]\d*:(0|[1-9]\d*)|([1-9][0-9]?|100)%|undiluted)$/.test(s) )
        // Matches x:y, z%, or undiluted, no 0s, no leading 0s
    },
    contactTimeArr () {
      return this.process(this.contactTimes)
        .filter( s => /^((0|[1-9]\d*)(\.\d*[1-9])?)$/.test(s) )
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
        .map( s => s.trim() )
        .filter( s => s )
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
      if (this.testType === 5) {
        this.parseOutputVirus()
      } else if (this.testType === 6) {
        this.parseOutputBacteria()
      }
    },

    parseOutputVirus () {
      if (!this.validFormVirus()) return

      const numTests = this.dilutionArr.length * this.contactTimeArr.length
      const price = this.tests.find( t => t.name === this.virusName).price
      const totalPrice = price * numTests

      const parsedOutput = {}
      parsedOutput[this.virusName] = {
        dilutions: this.dilutionArr,
        contactTimes: this.contactTimeArr,
        cellName: this.tests.find( t => t.name === this.virusName).cellName,
        price: price,
        totalPrice: totalPrice,
        numTests: numTests
      }
      this.virusName = ''
      this.$emit('add', parsedOutput)
    },

    parseOutputBacteria () {
      if (!this.validFormBacteria()) return

      const numTests = this.dilutionArr.length * this.contactTimeArr.length * this.dilutionTimeArr.length
      const price = 3000
      const totalPrice = price * numTests

      const parsedOutput = {}
      parsedOutput[this.bacteriaName] = {
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
        this.virusName &&
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
        this.dilutionTimes &&
        this.dilutionArr.length > 0 &&
        this.contactTimeArr.length > 0 &&
        this.dilutionTimeArr.length > 0
      )
    }
  }
}
</script>